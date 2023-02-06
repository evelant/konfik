import { VscodeTasksKonfik } from '@konfik-plugin/vscode'

export const vscodeTasks = VscodeTasksKonfik({
  version: '2.0.0',
  tasks: [
    {
      label: 'dev',
      dependsOn: ['dev:bundle-cli', 'dev:ts'],
      problemMatcher: [],
    },
    {
      label: 'dev:bundle-cli',
      type: 'shell',
      command: 'pnpm dev:bundle-cli',
      isBackground: true,
      presentation: {
        focus: false,
        panel: 'shared',
        group: 'dev',
        showReuseMessage: true,
        clear: false,
      },
    },
    {
      label: 'dev:ts',
      type: 'shell',
      command: 'pnpm dev:ts',
      problemMatcher: ['$tsc-watch'],
      isBackground: true,
      presentation: {
        focus: false,
        panel: 'shared',
        group: 'dev',
        showReuseMessage: true,
        clear: false,
      },
    },
    {
      label: 'lint',
      type: 'shell',
      command: 'pnpm lint:eslint:check',
      problemMatcher: '$eslint-stylish',
      presentation: {
        focus: false,
        panel: 'shared',
        group: 'dev',
        showReuseMessage: true,
        clear: true,
      },
    },
  ] as const,
})

/*
TODO:
- settings.json
- tasks.json
- *.code-snippets
*/
