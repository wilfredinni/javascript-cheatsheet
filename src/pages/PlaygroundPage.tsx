import { useEffect, useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
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
const DEFAULT_SNIPPET = `console.log('Hello from the playground!')
`

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
  const [shareLabel, setShareLabel] = useState('Share')
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [activePane, setActivePane] = useState<'editor' | 'output'>('editor')
  const [splitPercent, setSplitPercent] = useState(55)
  const [lastRunAt, setLastRunAt] = useState<number | null>(null)
  const [lastRunDuration, setLastRunDuration] = useState<number | null>(null)
  const [outputFilters, setOutputFilters] = useState({
    log: true,
    info: true,
    warn: true,
    error: true,
  })
  const workerRef = useRef<Worker | null>(null)
  const groupDepthRef = useRef(0)
  const runStartRef = useRef<number | null>(null)
  const splitContainerRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef(false)
  const editorRef = useRef<
    import('monaco-editor').editor.IStandaloneCodeEditor | null
  >(null)

  usePrerenderReady(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paramCode = params.get('code')

    if (paramCode) {
      setCode(paramCode)
      setIsHydrated(true)
      return
    }

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setCode(stored)
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem(STORAGE_KEY, code)
    setSavedAt(Date.now())
  }, [code, isHydrated])

  useEffect(() => {
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  useEffect(() => {
    if (!isDraggingRef.current) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      const container = splitContainerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const next = ((event.clientX - rect.left) / rect.width) * 100
      const clamped = Math.min(75, Math.max(25, next))
      setSplitPercent(clamped)
    }

    const handlePointerUp = () => {
      isDraggingRef.current = false
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [splitPercent])

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
    runStartRef.current = performance.now()
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
          if (runStartRef.current !== null) {
            setLastRunDuration(performance.now() - runStartRef.current)
          }
          setLastRunAt(Date.now())
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
      if (runStartRef.current !== null) {
        setLastRunDuration(performance.now() - runStartRef.current)
      }
      setLastRunAt(Date.now())
      workerRef.current?.terminate()
      workerRef.current = null
    }

    worker.postMessage({ code })
  }

  const handleReset = () => {
    setCode(DEFAULT_SNIPPET)
    resetOutput()
  }

  const handleFormat = () => {
    const action = editorRef.current?.getAction('editor.action.formatDocument')
    action?.run()
  }

  const handleShare = async () => {
    const url = new URL(window.location.href)
    url.searchParams.set('code', code)

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'JavaScript Playground',
          url: url.toString(),
        })
        return
      } catch {
        // Ignore share failures.
      }
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url.toString())
        setShareLabel('Copied')
        window.setTimeout(() => setShareLabel('Share'), 1600)
      }
    } catch {
      // Ignore clipboard failures.
    }
  }

  const handleFilterToggle = (key: keyof typeof outputFilters) => {
    setOutputFilters((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  const outputTypeClass = (type: OutputEntry['type']) => {
    switch (type) {
      case 'warn':
        return 'text-amber-600 dark:text-amber-300'
      case 'error':
      case 'assert':
        return 'text-rose-600 dark:text-rose-300'
      case 'table':
        return 'text-emerald-600 dark:text-emerald-300'
      case 'trace':
        return 'text-sky-600 dark:text-sky-300'
      case 'count':
      case 'time':
        return 'text-indigo-600 dark:text-indigo-300'
      case 'group':
        return 'text-zinc-700 dark:text-zinc-200'
      case 'info':
      case 'log':
      default:
        return 'text-zinc-600 dark:text-zinc-200'
    }
  }

  const handleEditorBeforeMount = (monaco: typeof import('monaco-editor')) => {
    monaco.editor.defineTheme('playground-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
      },
    })
    monaco.editor.defineTheme('playground-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#18181b',
      },
    })
  }

  const handleEditorMount = (
    editor: import('monaco-editor').editor.IStandaloneCodeEditor,
  ) => {
    editorRef.current = editor
  }

  const filteredOutput = output.filter((entry) => {
    if (entry.type in outputFilters) {
      return outputFilters[entry.type as keyof typeof outputFilters]
    }
    return true
  })

  const lastRunLabel = lastRunAt
    ? new Date(lastRunAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : null
  const lastRunDurationLabel =
    lastRunDuration !== null ? `${lastRunDuration.toFixed(0)}ms` : null
  const savedLabel = savedAt
    ? new Date(savedAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  return (
    <article className="min-h-[calc(100vh-3.6rem)] w-full bg-white dark:bg-zinc-900">
      <Seo
        title="JavaScript Playground"
        description="Write and execute JavaScript snippets instantly in your browser."
      />

      <section className="not-prose mx-auto flex h-full min-h-[calc(100vh-3.6rem)] max-w-8xl flex-col px-3 pb-6 pt-4 sm:px-6 lg:px-12">
        <div className="flex w-full flex-wrap items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              JavaScript Runner
            </div>
            {savedLabel ? (
              <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                Saved {savedLabel}
              </span>
            ) : null}
          </div>
          <button
            className="ml-auto rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
            type="button"
            onClick={handleShare}
          >
            {shareLabel}
          </button>
        </div>
        {nodeOnlyReason ? (
          <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-200">
            Node-only example detected: {nodeOnlyReason}
          </p>
        ) : null}

        <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 lg:hidden">
          <button
            className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
              activePane === 'editor'
                ? 'border-amber-300 text-amber-700 dark:border-amber-400/60 dark:text-amber-200'
                : 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300'
            }`}
            type="button"
            onClick={() => setActivePane('editor')}
          >
            Editor
          </button>
          <button
            className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
              activePane === 'output'
                ? 'border-amber-300 text-amber-700 dark:border-amber-400/60 dark:text-amber-200'
                : 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300'
            }`}
            type="button"
            onClick={() => setActivePane('output')}
          >
            Output
          </button>
        </div>

        <div
          ref={splitContainerRef}
          className="mt-4 flex-1 min-h-0 gap-4 lg:grid"
          style={{
            gridTemplateColumns: `${splitPercent}fr 12px ${100 - splitPercent}fr`,
          }}
        >
          <div
            className={`flex min-h-0 flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${
              activePane === 'editor' ? 'flex' : 'hidden'
            } lg:flex`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/70 py-2 pl-4 pr-0 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  className="rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
                  type="button"
                  onClick={handleFormat}
                >
                  Format
                </button>
                <button
                  className="rounded-full border border-zinc-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:text-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
                  type="button"
                  onClick={handleRun}
                  disabled={runDisabled}
                  title={
                    nodeOnlyReason ? `Disabled: ${nodeOnlyReason}` : undefined
                  }
                >
                  {isRunning ? 'Running...' : 'Run'}
                </button>
                <button
                  className="rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
              {isRunning ? (
                <span className="text-[10px] font-medium text-zinc-400">
                  Running...
                </span>
              ) : lastRunLabel ? (
                <span className="text-[10px] font-medium text-zinc-400">
                  Last run {lastRunLabel}
                  {lastRunDurationLabel ? ` · ${lastRunDurationLabel}` : ''}
                </span>
              ) : null}
            </div>
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                language="javascript"
                theme={theme.isDark ? 'playground-dark' : 'playground-light'}
                beforeMount={handleEditorBeforeMount}
                onMount={handleEditorMount}
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
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <button
              className={`h-full w-full cursor-col-resize rounded-full border border-transparent transition hover:border-zinc-200 dark:hover:border-zinc-700 ${
                isDraggingRef.current ? 'bg-zinc-100 dark:bg-zinc-800' : ''
              }`}
              type="button"
              onPointerDown={(event) => {
                event.preventDefault()
                isDraggingRef.current = true
              }}
              aria-label="Resize panels"
            >
              <span className="mx-auto block h-12 w-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            </button>
          </div>

          <div
            className={`flex min-h-0 flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 ${
              activePane === 'output' ? 'flex' : 'hidden'
            } lg:flex`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                    outputFilters.log
                      ? 'border-emerald-200 text-emerald-700 dark:border-emerald-400/50 dark:text-emerald-200'
                      : 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300'
                  }`}
                  type="button"
                  onClick={() => handleFilterToggle('log')}
                >
                  Log
                </button>
                <button
                  className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                    outputFilters.info
                      ? 'border-sky-200 text-sky-700 dark:border-sky-400/50 dark:text-sky-200'
                      : 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300'
                  }`}
                  type="button"
                  onClick={() => handleFilterToggle('info')}
                >
                  Info
                </button>
                <button
                  className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                    outputFilters.warn
                      ? 'border-amber-200 text-amber-700 dark:border-amber-400/50 dark:text-amber-200'
                      : 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300'
                  }`}
                  type="button"
                  onClick={() => handleFilterToggle('warn')}
                >
                  Warn
                </button>
                <button
                  className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                    outputFilters.error
                      ? 'border-rose-200 text-rose-700 dark:border-rose-400/50 dark:text-rose-200'
                      : 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300'
                  }`}
                  type="button"
                  onClick={() => handleFilterToggle('error')}
                >
                  Error
                </button>
                <button
                  className="rounded-full border border-zinc-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
                  type="button"
                  onClick={resetOutput}
                >
                  Clear
                </button>
              </div>
              <span className="text-[10px] font-medium text-zinc-400">
                {filteredOutput.length} line
                {filteredOutput.length === 1 ? '' : 's'}
              </span>
            </div>
            <div className="flex-1 min-h-0 overflow-auto px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-200">
              {filteredOutput.length ? (
                filteredOutput.map((entry) => (
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
