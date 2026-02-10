export interface NavigationItem {
  name: string
  path: string
  updated?: boolean
  internal?: boolean
}

export const navbarNavigation: NavigationItem[] = []

export const mainNavigation: NavigationItem[] = [
  {
    name: 'Getting started',
    path: '/',
  },
  {
    name: 'Playground',
    path: '/playground',
  },
  {
    name: 'Contributing',
    path: '/contributing',
  },
  {
    name: 'Changelog',
    path: '/changelog',
  },
]

export const cheatsheetNavigation: NavigationItem[] = [
  {
    name: 'Basics',
    path: '/cheatsheet/basics',
    updated: false,
  },
  {
    name: 'Control Flow',
    path: '/cheatsheet/control-flow',
    updated: false,
  },
  {
    name: 'Functions',
    path: '/cheatsheet/functions',
    updated: false,
  },
  {
    name: 'Arrays',
    path: '/cheatsheet/arrays',
    updated: false,
  },
  {
    name: 'Array Methods',
    path: '/cheatsheet/array-methods',
    updated: false,
  },
  {
    name: 'Objects',
    path: '/cheatsheet/objects',
    updated: false,
  },
  {
    name: 'Map',
    path: '/cheatsheet/map',
    updated: false,
  },
  {
    name: 'Sets',
    path: '/cheatsheet/sets',
    updated: false,
  },
  {
    name: 'String Manipulation',
    path: '/cheatsheet/manipulating-strings',
    updated: false,
  },
  {
    name: 'String Formatting',
    path: '/cheatsheet/string-formatting',
    updated: false,
  },
  {
    name: 'Regular Expressions',
    path: '/cheatsheet/regular-expressions',
    updated: false,
  },
  {
    name: 'Files and Directories',
    path: '/cheatsheet/directory-files',
    updated: false,
  },
  {
    name: 'Error Handling',
    path: '/cheatsheet/error-handling',
    updated: false,
  },
  {
    name: 'Debugging',
    path: '/cheatsheet/debugging',
    updated: false,
  },
]
