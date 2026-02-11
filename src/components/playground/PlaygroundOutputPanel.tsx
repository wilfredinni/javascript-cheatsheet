import { useMemo } from 'react'
import type {
  OutputEntry,
  OutputFilterKey,
  OutputFilters,
  TraceEvent,
  VisualizationStatus,
} from './types'

type PlaygroundOutputPanelProps = {
  activePane: 'editor' | 'output'
  filteredOutput: OutputEntry[]
  traceEvents: TraceEvent[]
  showVisualization: boolean
  hasVisualization: boolean
  visualizationStatus: VisualizationStatus
  outputFilters: OutputFilters
  onFilterToggle: (key: OutputFilterKey) => void
  onClear: () => void
  onVisualizationToggle: () => void
  outputTypeClass: (type: OutputEntry['type']) => string
}

type TraceSummary = {
  line: number
  count: number
}

type TraceEdge = {
  from: number
  to: number
  count: number
}

type TracePathStep = {
  line: number
}

const summarizeTrace = (events: TraceEvent[]): TraceSummary[] => {
  const counts = new Map<number, number>()
  for (const event of events) {
    counts.set(event.line, (counts.get(event.line) || 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([line, count]) => ({ line, count }))
    .sort((a, b) => a.line - b.line)
}

const buildTraceEdges = (events: TraceEvent[]): TraceEdge[] => {
  const edges = new Map<string, TraceEdge>()

  for (let i = 1; i < events.length; i += 1) {
    const from = events[i - 1].line
    const to = events[i].line
    const key = `${from}-${to}`
    const existing = edges.get(key)
    if (existing) {
      existing.count += 1
    } else {
      edges.set(key, { from, to, count: 1 })
    }
  }

  return Array.from(edges.values()).sort((a, b) => b.count - a.count)
}

const buildTracePath = (events: TraceEvent[]): TracePathStep[] => {
  const path: TracePathStep[] = []
  for (const event of events) {
    const last = path[path.length - 1]
    if (!last || last.line !== event.line) {
      path.push({ line: event.line })
    }
  }
  return path
}

export default function PlaygroundOutputPanel({
  activePane,
  filteredOutput,
  traceEvents,
  showVisualization,
  hasVisualization,
  visualizationStatus,
  outputFilters,
  onFilterToggle,
  onClear,
  onVisualizationToggle,
  outputTypeClass,
}: PlaygroundOutputPanelProps) {
  const traceSummary = summarizeTrace(traceEvents)
  const traceEdges = buildTraceEdges(traceEvents)
  const tracePath = buildTracePath(traceEvents)
  const maxTraceCount = traceSummary.reduce(
    (max, entry) => Math.max(max, entry.count),
    1,
  )
  const maxEdgeCount = traceEdges.reduce(
    (max, entry) => Math.max(max, entry.count),
    1,
  )
  const visualizationReason = !visualizationStatus.enabled
    ? visualizationStatus.reason
    : traceEvents.length
      ? null
      : 'No trace events captured.'
  const pathSummary = useMemo(() => {
    if (!tracePath.length) return ''
    const parts = tracePath.map((step) => `L${step.line}`)
    return parts.join(' → ')
  }, [tracePath])

  return (
    <div
      className={`flex min-h-0 min-w-0 flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 ${
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
            onClick={() => onFilterToggle('log')}
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
            onClick={() => onFilterToggle('info')}
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
            onClick={() => onFilterToggle('warn')}
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
            onClick={() => onFilterToggle('error')}
          >
            Error
          </button>
          <button
            className="rounded-full border border-zinc-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
            type="button"
            onClick={onClear}
          >
            Clear
          </button>
          <button
            className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
              showVisualization
                ? 'border-sky-200 text-sky-700 dark:border-sky-400/50 dark:text-sky-200'
                : 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300'
            } ${
              hasVisualization
                ? 'hover:border-zinc-300 hover:text-zinc-700 dark:hover:border-zinc-500'
                : 'cursor-not-allowed opacity-60'
            }`}
            type="button"
            onClick={onVisualizationToggle}
          >
            Visualize
          </button>
        </div>
        <div className="flex flex-col items-end gap-1 text-[10px] font-medium text-zinc-400">
          <span>
            {filteredOutput.length} line{filteredOutput.length === 1 ? '' : 's'}
          </span>
          {!hasVisualization && visualizationReason ? (
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-300">
              {visualizationReason}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-auto px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-200">
        {showVisualization ? (
          hasVisualization ? (
            <div className="space-y-6">
              {pathSummary ? (
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-[11px] text-indigo-700 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
                  <div className="font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-200">
                    Timeline (Order Of Execution)
                  </div>
                  <div className="mt-1 text-[11px] text-indigo-700/80 dark:text-indigo-200/90">
                    The exact route your code took, line by line.
                  </div>
                  <div className="mt-2 break-words text-indigo-700 dark:text-indigo-200">
                    {pathSummary}
                  </div>
                </div>
              ) : null}
              <div className="space-y-6">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-[11px] text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                  <div className="font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-200">
                    Flow Map (Common Jumps)
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-700/80 dark:text-emerald-200/90">
                    Shows which line-to-line jumps happen most often.
                  </div>
                  <div className="mt-3 space-y-3">
                    {traceEdges.length ? (
                      traceEdges.map((edge) => (
                        <div
                          key={`${edge.from}-${edge.to}`}
                          className="space-y-1"
                        >
                          <div className="flex items-center justify-between gap-3 text-[11px] text-emerald-700/70 dark:text-emerald-200/80">
                            <span>
                              L{edge.from} → L{edge.to}
                            </span>
                            <span>{edge.count}x</span>
                          </div>
                          <div className="h-2 rounded-full bg-emerald-100 dark:bg-emerald-500/20">
                            <div
                              className="h-2 rounded-full bg-emerald-500/70"
                              style={{
                                width: `${(edge.count / maxEdgeCount) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-emerald-700/70 dark:text-emerald-200/80">
                        Run a snippet with multiple steps to see flow.
                      </div>
                    )}
                  </div>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-[11px] text-amber-700 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                  <div className="font-semibold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-200">
                    Line Hits
                  </div>
                  <div className="mt-1 text-[11px] text-amber-700/80 dark:text-amber-200/90">
                    Counts how many times each line ran.
                  </div>
                  <div className="mt-3 space-y-2">
                    {traceSummary.map((entry) => (
                      <div key={entry.line} className="flex items-center gap-3">
                        <span className="w-12 text-right text-[11px] text-amber-700/70 dark:text-amber-200/80">
                          L{entry.line}
                        </span>
                        <div className="h-2 flex-1 rounded-full bg-amber-100 dark:bg-amber-500/20">
                          <div
                            className="h-2 rounded-full bg-amber-500/70"
                            style={{
                              width: `${(entry.count / maxTraceCount) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="w-8 text-right text-[11px] text-amber-700/70 dark:text-amber-200/80">
                          {entry.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-zinc-400 dark:text-zinc-500">
              {visualizationReason || 'Run a snippet to visualize execution.'}
            </div>
          )
        ) : filteredOutput.length ? (
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
  )
}
