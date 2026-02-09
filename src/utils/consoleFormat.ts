function formatOutputValue(value: unknown) {
  if (typeof value === 'string') {
    return value
  }

  if (value instanceof Error) {
    return value.stack || value.message || String(value)
  }

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function formatWithPlaceholders(format: string, args: unknown[]) {
  let result = ''
  let lastIndex = 0
  let usedArgs = 0
  const pattern = /%[sdifoOc%]/g

  format.replace(pattern, (match, offset) => {
    result += format.slice(lastIndex, offset)
    lastIndex = offset + match.length

    if (match === '%%') {
      result += '%'
      return ''
    }

    const value = args[usedArgs]
    usedArgs += 1

    switch (match) {
      case '%s':
        result += String(value)
        break
      case '%d':
      case '%i':
        result += String(Number(value))
        break
      case '%f':
        result += String(Number(value))
        break
      case '%o':
      case '%O':
        result += formatOutputValue(value)
        break
      case '%c':
        result += ''
        break
      default:
        result += match
        break
    }

    return ''
  })

  result += format.slice(lastIndex)
  return { text: result, usedArgs }
}

export function formatOutputArgs(args: unknown[]) {
  if (!args.length) {
    return ''
  }

  if (typeof args[0] === 'string') {
    const { text, usedArgs } = formatWithPlaceholders(args[0], args.slice(1))
    const remaining = args.slice(1 + usedArgs)
    const trailing = remaining
      .map((value) => formatOutputValue(value))
      .join(' ')
    return trailing ? `${text} ${trailing}`.trim() : text
  }

  return args.map((value) => formatOutputValue(value)).join(' ')
}

export function formatTraceStack(rawStack: string) {
  const lines = rawStack
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(
      (line) =>
        !line.startsWith('Error') &&
        !line.includes('Object.trace') &&
        !line.includes('self.onmessage'),
    )
    .map((line) =>
      line
        .replace(/\s*\(eval at self\.onmessage[^)]*\)/g, '')
        .replace(/\s*\(blob:[^)]*\)/g, ''),
    )

  return lines.join('\n')
}

function normalizeTableCell(value: unknown) {
  const text = formatOutputValue(value)
  return text.replace(/\s+/g, ' ').trim()
}

export function buildTableOutput(data: unknown) {
  if (Array.isArray(data)) {
    if (!data.length) {
      return '[]'
    }

    const allKeys = new Set<string>()
    const isObjectRows = data.every(
      (row) => row && typeof row === 'object' && !Array.isArray(row),
    )

    if (isObjectRows) {
      data.forEach((row) => {
        Object.keys(row as Record<string, unknown>).forEach((key) => {
          allKeys.add(key)
        })
      })

      const columns = ['(index)', ...Array.from(allKeys)]
      const rows = data.map((row, index) => {
        const record = row as Record<string, unknown>
        return [
          String(index),
          ...columns.slice(1).map((key) => normalizeTableCell(record[key])),
        ]
      })

      return formatAsciiTable(columns, rows)
    }

    const columns = ['(index)', 'value']
    const rows = data.map((row, index) => [
      String(index),
      normalizeTableCell(row),
    ])
    return formatAsciiTable(columns, rows)
  }

  if (data && typeof data === 'object') {
    const entries = Object.entries(data as Record<string, unknown>)
    if (!entries.length) {
      return '{}'
    }

    const columns = ['(index)', 'value']
    const rows = entries.map(([key, value]) => [key, normalizeTableCell(value)])
    return formatAsciiTable(columns, rows)
  }

  return normalizeTableCell(data)
}

function formatAsciiTable(columns: string[], rows: string[][]) {
  const widths = columns.map((column, index) => {
    const rowWidths = rows.map((row) => (row[index] || '').length)
    return Math.max(column.length, ...rowWidths)
  })

  const formatRow = (cells: string[]) =>
    cells.map((cell, index) => cell.padEnd(widths[index])).join(' | ')

  const header = formatRow(columns)
  const separator = widths.map((width) => '-'.repeat(width)).join('-|-')
  const body = rows.map((row) => formatRow(row)).join('\n')

  return [header, separator, body].filter(Boolean).join('\n')
}
