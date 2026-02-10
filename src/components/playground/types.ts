export type OutputEntry = {
  id: string
  type:
    | 'log'
    | 'info'
    | 'warn'
    | 'error'
    | 'table'
    | 'group'
    | 'count'
    | 'time'
    | 'trace'
    | 'assert'
  text: string
  depth: number
}

export type OutputFilters = {
  log: boolean
  info: boolean
  warn: boolean
  error: boolean
}

export type OutputFilterKey = keyof OutputFilters
