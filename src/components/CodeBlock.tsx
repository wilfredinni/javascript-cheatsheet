import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  buildTableOutput,
  formatOutputArgs,
  formatTraceStack,
} from '../utils/consoleFormat'
import { createRunnerWorker, getNodeOnlyReason } from '../utils/codeRunner'

type CodeBlockProps = {
  code: string
  language?: string
  preClassName?: string
  codeClassName?: string
  children: ReactNode
  runnable?: boolean
}

type OutputEntry = {
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

const javascriptLanguages = new Set(['javascript', 'js'])

async function writeToClipboard(text: string) {
  if (!text) {
    return false
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  const success = document.execCommand('copy')
  document.body.removeChild(textarea)
  return success
}

export default function CodeBlock({
  code,
  language,
  preClassName,
  codeClassName,
  children,
  runnable,
}: CodeBlockProps) {
  const [label, setLabel] = useState('Copy')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<OutputEntry[]>([])
  const workerRef = useRef<Worker | null>(null)
  const groupDepthRef = useRef(0)
  const hasLanguageClass = Boolean(
    language ||
    preClassName?.includes('language-') ||
    codeClassName?.includes('language-'),
  )
  const preClasses = [
    'm-0',
    '!bg-transparent',
    '!shadow-none',
    '!ring-0',
    hasLanguageClass ? null : 'px-4 py-3',
    preClassName,
  ]
    .filter(Boolean)
    .join(' ')
  const languageLabel = language ? language.toUpperCase() : 'Code'
  const isRunnable = Boolean(
    runnable && javascriptLanguages.has((language || '').toLowerCase()),
  )
  const nodeOnlyReason = isRunnable ? getNodeOnlyReason(code) : null
  const runDisabled = !isRunnable || Boolean(nodeOnlyReason) || isRunning

  useEffect(() => {
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const handleCopy = async () => {
    try {
      const copied = await writeToClipboard(code)
      if (copied) {
        setLabel('Copied')
        window.setTimeout(() => setLabel('Copy'), 1600)
      }
    } catch {
      // Ignore clipboard failures.
    }
  }

  const appendOutput = (type: OutputEntry['type'], text: string) => {
    const depth = groupDepthRef.current
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setOutput((entries) => [...entries, { id, type, text, depth }])
  }

  const resetOutput = () => {
    groupDepthRef.current = 0
    setOutput([])
  }

  const handleRun = () => {
    if (runDisabled) {
      return
    }

    resetOutput()
    setIsRunning(true)
    workerRef.current?.terminate()
    const worker = createRunnerWorker()
    workerRef.current = worker

    worker.onmessage = (event) => {
      const { type, payload } = event.data || {}

      switch (type) {
        case 'clear':
          resetOutput()
          break
        case 'group': {
          const label = payload?.[0] ? String(payload[0]) : 'Group'
          appendOutput('group', label)
          groupDepthRef.current += 1
          break
        }
        case 'groupEnd':
          groupDepthRef.current = Math.max(0, groupDepthRef.current - 1)
          break
        case 'count': {
          const label = payload?.[0] ?? 'default'
          const countValue = payload?.[1] ?? 0
          appendOutput('count', `${label}: ${countValue}`)
          break
        }
        case 'time': {
          const label = payload?.[0] ?? 'default'
          const duration = Number(payload?.[1] ?? 0)
          appendOutput('time', `${label}: ${duration.toFixed(2)}ms`)
          break
        }
        case 'trace': {
          const args = Array.isArray(payload?.[0]) ? payload[0] : []
          const stack = payload?.[1] ? String(payload[1]) : ''
          const cleanedStack = stack ? formatTraceStack(stack) : ''
          const header = args.length
            ? `Trace: ${formatOutputArgs(args)}`
            : 'Trace'
          appendOutput(
            'trace',
            cleanedStack ? `${header}\n${cleanedStack}` : header,
          )
          break
        }
        case 'assert':
          appendOutput('assert', formatOutputArgs(payload || []))
          break
        case 'table':
          if (payload?.length === 1) {
            appendOutput('table', buildTableOutput(payload[0]))
          } else {
            appendOutput('table', formatOutputArgs(payload || []))
          }
          break
        case 'warn':
        case 'info':
        case 'log':
        case 'error':
          appendOutput(type, formatOutputArgs(payload || []))
          break
        case 'done':
          setIsRunning(false)
          workerRef.current?.terminate()
          workerRef.current = null
          break
        default:
          break
      }
    }

    worker.onerror = (event) => {
      appendOutput('error', event.message || 'Worker error')
      setIsRunning(false)
      workerRef.current?.terminate()
      workerRef.current = null
    }

    worker.postMessage({ code })
  }

  const outputTypeClass = (type: OutputEntry['type']) => {
    switch (type) {
      case 'warn':
        return 'text-amber-600'
      case 'error':
      case 'assert':
        return 'text-rose-600'
      case 'table':
        return 'text-emerald-600'
      case 'trace':
        return 'text-sky-600'
      case 'count':
      case 'time':
        return 'text-indigo-600'
      case 'group':
        return 'text-zinc-700'
      case 'info':
      case 'log':
      default:
        return 'text-zinc-600'
    }
  }

  return (
    <div
      className="not-prose flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:ring-zinc-100/5"
      data-language={language || undefined}
    >
      <div className="flex items-center justify-between border-b border-zinc-200/70 bg-zinc-50/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-900/60 dark:text-zinc-400">
        <span>{languageLabel}</span>
        <div className="flex items-center gap-2">
          {isRunnable ? (
            <button
              className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-semibold text-zinc-600 transition hover:border-sky-300 hover:text-sky-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-sky-400/60 dark:hover:text-sky-400"
              type="button"
              onClick={handleRun}
              disabled={runDisabled}
              aria-label="Run code"
              title={nodeOnlyReason ? `Disabled: ${nodeOnlyReason}` : undefined}
            >
              {isRunning ? 'Running...' : 'Run'}
            </button>
          ) : null}
          <button
            className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-semibold text-zinc-600 transition hover:border-amber-300 hover:text-amber-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-amber-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-amber-400/60 dark:hover:text-amber-400"
            type="button"
            onClick={handleCopy}
            aria-label="Copy code"
          >
            {label}
          </button>
        </div>
      </div>
      <div className="flex-1 bg-zinc-900/95 text-sm dark:bg-zinc-900">
        <pre className={`bg-transparent ${preClasses}`}>
          <code className={codeClassName}>{children}</code>
        </pre>
      </div>
      {isRunnable ? (
        <div className="border-t border-zinc-200/70 bg-zinc-50/80 dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <div className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            <span>Output</span>
            {nodeOnlyReason ? (
              <span className="normal-case text-[11px] font-medium text-amber-600 dark:text-amber-400">
                Node-only example: {nodeOnlyReason}
              </span>
            ) : null}
          </div>
          <div className="max-h-56 overflow-auto px-3 py-2 font-mono text-xs text-zinc-700 dark:text-zinc-200">
            {output.length ? (
              output.map((entry) => (
                <div
                  key={entry.id}
                  className={`whitespace-pre-wrap ${outputTypeClass(entry.type)}`}
                  style={{ paddingLeft: entry.depth * 12 }}
                >
                  {entry.text}
                </div>
              ))
            ) : (
              <div className="text-zinc-400 dark:text-zinc-500">
                No output yet.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
