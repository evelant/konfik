import axios from 'axios'
import * as fs from 'fs/promises'
import * as https from 'https'
import * as json2Ts from 'json-schema-to-typescript'
import * as path from 'path'

const WorkflowTemplatePropertiesSchemaUri = 'https://json.schemastore.org/github-workflow-template-properties.json'
const WorkflowSchemaUri = 'https://json.schemastore.org/github-workflow.json'
const ActionSchemaUri = 'https://json.schemastore.org/github-action.json'

const entries = Object.entries({
  WorkflowTemplateProperties: WorkflowTemplatePropertiesSchemaUri,
  Workflow: WorkflowSchemaUri,
  Action: ActionSchemaUri,
})

async function main(): Promise<void> {
  const imports: string[] = []
  const currentDir = path.dirname(new URL(import.meta.url).pathname)

  await Promise.all(
    entries.map(async ([name, uri]) => {
      const result = (await axios.get(uri)).data

      const serialized = await json2Ts.compile(result, name, {
        bannerComment: '/**\n * THIS FILE WAS GENERATED. BE WARY OF EDITING BY HAND.\n */',
      })

      fs.writeFile(path.resolve(currentDir, `${name}.ts`), serialized, 'utf-8') // Freaky leaky
      imports.push(`export * as ${name} from "./${name}";`)
    }),
  )

  await fs.writeFile(path.resolve(currentDir, 'index.ts'), imports.join('\n'), 'utf-8')
}

main()
