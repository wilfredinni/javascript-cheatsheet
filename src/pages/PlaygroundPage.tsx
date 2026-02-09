import { useEffect, useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import BaseTitle from '../components/ui/BaseTitle'
import Prose from '../components/Prose'
import Seo from '../components/Seo'
import { useTheme } from '../context/theme'
import { usePrerenderReady } from '../hooks/usePrerenderReady'
import {
  buildTableOutput,
  formatOutputArgs,
  formatTraceStack,
} from '../utils/consoleFormat'
import { createRunnerWorker, getNodeOnlyReason } from '../utils/codeRunner'

const STORAGE_KEY = 'js-playground-code'
const DEFAULT_SNIPPET = `// Welcome to the JavaScript playground.
// Tip: console.table() works great for arrays of objects.

const groceries = [
  { item: 'matcha', price: 8 },
  { item: 'oats', price: 5 },
  { item: 'berries', price: 7 },
]

const total = groceries.reduce((sum, entry) => sum + entry.price, 0)

console.table(groceries)
console.log('Total:', total)
`

const SAMPLE_SNIPPETS = [
  {
    id: 'timers',
    label: 'Timing + groups',
    code: `console.group('Launch sequence')
console.time('prep')

const stages = ['boot', 'calibrate', 'ignite']
console.log('Stages:', stages.join(' -> '))

console.timeEnd('prep')
console.groupEnd()
`,
  },
  {
    id: 'arrays',
    label: 'Array transforms',
    code: `const scores = [72, 88, 91, 65, 99]

const curved = scores.map((score) => Math.min(100, score + 5))
const passing = curved.filter((score) => score >= 80)

console.log('Curved:', curved)
console.log('Passing:', passing)
`,
  },
  {
    id: 'objects',
    label: 'Objects + tables',
    code: `const crew = [
  { name: 'Sam', role: 'Pilot' },
  { name: 'Aiko', role: 'Engineer' },
  { name: 'Jun', role: 'Navigator' },
]

const roster = crew.reduce((summary, member) => {
  summary[member.role] = member.name
  return summary
}, {})

console.table(crew)
console.log(roster)
`,
  },
]

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

export default function PlaygroundPage() {
  const theme = useTheme()
  const [code, setCode] = useState(DEFAULT_SNIPPET)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<OutputEntry[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [selectedSample, setSelectedSample] = useState('')
  const workerRef = useRef<Worker | null>(null)
  const groupDepthRef = useRef(0)

  usePrerenderReady(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setCode(stored)
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem(STORAGE_KEY, code)
  }, [code, isHydrated])

  useEffect(() => {
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const nodeOnlyReason = useMemo(() => getNodeOnlyReason(code), [code])
  const runDisabled = Boolean(nodeOnlyReason) || isRunning

  const resetOutput = () => {
    groupDepthRef.current = 0
    setOutput([])
  }

  const appendOutput = (type: OutputEntry['type'], text: string) => {
    const depth = groupDepthRef.current
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setOutput((entries) => [...entries, { id, type, text, depth }])
  }

  const handleRun = () => {
    if (runDisabled) return

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

  const handleReset = () => {
    setSelectedSample('')
    setCode(DEFAULT_SNIPPET)
    resetOutput()
  }

  const handleSampleChange = (value: string) => {
    setSelectedSample(value)
    const snippet = SAMPLE_SNIPPETS.find((entry) => entry.id === value)
    if (snippet) {
      setCode(snippet.code)
      resetOutput()
    }
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
    <article className="space-y-10">
      <Seo
        title="JavaScript Playground"
        description="Write and execute JavaScript snippets instantly in your browser."
      />

      <Prose>
        <BaseTitle
          title="JavaScript Playground"
          description="Write and execute JavaScript snippets instantly in your browser."
        >
          Playground
        </BaseTitle>
        <p>
          Experiment with snippets, run them in a safe Web Worker, and review
          the output instantly. This sandbox does not allow DOM access and
          blocks Node-only APIs.
        </p>
      </Prose>

      <section className="not-prose rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              JavaScript Runner
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Runs in a Web Worker with a custom console formatter.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Samples
            </label>
            <select
              className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 transition hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-500"
              value={selectedSample}
              onChange={(event) => handleSampleChange(event.target.value)}
            >
              <option value="">Choose</option>
              {SAMPLE_SNIPPETS.map((sample) => (
                <option key={sample.id} value={sample.id}>
                  {sample.label}
                </option>
              ))}
            </select>
            <button
              className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:text-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
              type="button"
              onClick={handleRun}
              disabled={runDisabled}
              title={nodeOnlyReason ? `Disabled: ${nodeOnlyReason}` : undefined}
            >
              {isRunning ? 'Running...' : 'Run'}
            </button>
            <button
              className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
        {nodeOnlyReason ? (
          <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-200">
            Node-only example detected: {nodeOnlyReason}
          </p>
        ) : null}

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-950/95 shadow-sm dark:border-zinc-800">
            <div className="border-b border-zinc-800/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Editor
            </div>
            <Editor
              height="420px"
              language="javascript"
              theme={theme.isDark ? 'vs-dark' : 'vs'}
              value={code}
              onChange={(value) => setCode(value ?? '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false,
                fontFamily:
                  'ui-monospace, SFMono-Regular, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
              }}
            />
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="flex items-center justify-between border-b border-zinc-200/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <span>Output</span>
              <span className="text-[10px] font-medium text-zinc-400">
                {output.length} line{output.length === 1 ? '' : 's'}
              </span>
            </div>
            <div className="h-[420px] overflow-auto px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-200">
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
                  Run a snippet to see console output.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
