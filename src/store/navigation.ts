import { acceptHMRUpdate, defineStore } from 'pinia'

export interface NavigationItem {
  name: string
  path: string
  updated?: boolean
  internal?: boolean
}

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    navbarNavigation: [] as NavigationItem[],
    mainNavigation: [
      {
        name: 'Getting started',
        path: '/',
      },
      {
        name: 'Contributing',
        path: '/contributing',
      },
      {
        name: 'Changelog',
        path: '/changelog',
      },
    ] as NavigationItem[],
    cheatsheetNavigation: [
      {
        name: 'Basics',
        path: '/cheatsheet/basics',
        updated: false,
      },
      {
        name: 'Control flow',
        path: '/cheatsheet/control-flow',
        updated: false,
      },
      {
        name: 'Functions',
        path: '/cheatsheet/functions',
        updated: false,
      },

      {
        name: 'List and Tuples',
        path: '/cheatsheet/lists-and-tuples',
        updated: false,
      },
      {
        name: 'Dictionaries',
        path: '/cheatsheet/dictionaries',
        updated: false,
      },
      {
        name: 'Sets',
        path: '/cheatsheet/sets',
        updated: false,
      },
      {
        name: 'Comprehensions',
        path: '/cheatsheet/comprehensions',
        updated: false,
      },
      {
        name: 'Manipulating strings',
        path: '/cheatsheet/manipulating-strings',
        updated: false,
      },
      {
        name: 'String formatting',
        path: '/cheatsheet/string-formatting',
        updated: false,
      },
      {
        name: 'Regular expressions',
        path: '/cheatsheet/regular-expressions',
        updated: false,
      },
      {
        name: 'Files and directory paths',
        path: '/cheatsheet/file-directory-path',
        updated: false,
      },
      {
        name: 'Reading and writing files',
        path: '/cheatsheet/reading-and-writing-files',
        updated: false,
      },
      {
        name: 'Json and Yaml',
        path: '/cheatsheet/json-yaml',
        updated: false,
      },
      {
        name: 'Exception handling',
        path: '/cheatsheet/exception-handling',
        updated: false,
      },
      {
        name: 'Debugging',
        path: '/cheatsheet/debugging',
        updated: false,
      },
      {
        name: 'Args and Kwargs',
        path: '/cheatsheet/args-and-kwargs',
        updated: false,
      },
      {
        name: 'Decorators',
        path: '/cheatsheet/decorators',
        updated: false,
      },
      {
        name: 'Context manager',
        path: '/cheatsheet/context-manager',
        updated: false,
      },
      {
        name: 'OOP',
        path: '/cheatsheet/oop-basics',
        updated: false,
      },
      {
        name: 'Dataclasses',
        path: '/cheatsheet/dataclasses',
        updated: false,
      },
      {
        name: 'setup.py',
        path: '/cheatsheet/setup-py',
        updated: false,
      },
      {
        name: 'Main: top level script',
        path: '/cheatsheet/main',
        updated: false,
      },
      {
        name: 'Virtual environments',
        path: '/cheatsheet/virtual-environments',
        updated: false,
      },
    ] as NavigationItem[],
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavigationStore, import.meta.hot))
}