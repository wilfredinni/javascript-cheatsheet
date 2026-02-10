import { useEffect, useMemo, useRef, useState } from 'react'
import {
  buildTableOutput,
  formatOutputArgs,
  formatTraceStack,
} from '../../utils/consoleFormat'
import { createRunnerWorker, getNodeOnlyReason } from '../../utils/codeRunner'
import { DEFAULT_SNIPPET, STORAGE_KEY } from './constants'
import type { OutputEntry, OutputFilterKey, OutputFilters } from './types'

export function usePlaygroundRunner() {
  const [code, setCode] = useState(DEFAULT_SNIPPET)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<OutputEntry[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [shareLabel, setShareLabel] = useState('Share')
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [activePane, setActivePane] = useState<'editor' | 'output'>('editor')
  const [lastRunAt, setLastRunAt] = useState<number | null>(null)
  const [lastRunDuration, setLastRunDuration] = useState<number | null>(null)
  const [outputFilters, setOutputFilters] = useState<OutputFilters>({
    log: true,
    info: true,
    warn: true,
    error: true,
  })
  const workerRef = useRef<Worker | null>(null)
  const groupDepthRef = useRef(0)
  const runStartRef = useRef<number | null>(null)
  const editorRef = useRef<
    import('monaco-editor').editor.IStandaloneCodeEditor | null
  >(null)

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

  const handleFilterToggle = (key: OutputFilterKey) => {
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

  const filteredOutput = useMemo(() => {
    return output.filter((entry) => {
      if (entry.type in outputFilters) {
        return outputFilters[entry.type as OutputFilterKey]
      }
      return true
    })
  }, [output, outputFilters])

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

  return {
    code,
    setCode,
    isRunning,
    output,
    filteredOutput,
    outputFilters,
    activePane,
    setActivePane,
    shareLabel,
    savedLabel,
    lastRunLabel,
    lastRunDurationLabel,
    nodeOnlyReason,
    runDisabled,
    handleRun,
    handleReset,
    handleFormat,
    handleShare,
    handleFilterToggle,
    resetOutput,
    outputTypeClass,
    handleEditorBeforeMount,
    handleEditorMount,
  }
}
