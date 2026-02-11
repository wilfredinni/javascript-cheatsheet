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
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                  Timeline
                </div>
                <div className="space-y-2">
                  {traceEvents.map((entry) => (
                    <div key={entry.step} className="flex items-center gap-2">
                      <span className="w-8 text-right text-[11px] text-zinc-400">
                        {entry.step}
                      </span>
                      <span className="rounded-full border border-sky-200 px-2 py-[2px] text-[11px] text-sky-700 dark:border-sky-400/50 dark:text-sky-200">
                        L{entry.line}
                      </span>
                      <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                  Flow Map
                </div>
                <div className="space-y-3">
                  {traceEdges.length ? (
                    traceEdges.map((edge) => (
                      <div
                        key={`${edge.from}-${edge.to}`}
                        className="space-y-1"
                      >
                        <div className="flex items-center justify-between gap-3 text-[11px] text-zinc-400">
                          <span>
                            L{edge.from} → L{edge.to}
                          </span>
                          <span>{edge.count}x</span>
                        </div>
                        <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
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
                    <div className="text-zinc-400 dark:text-zinc-500">
                      Run a snippet with multiple steps to see flow.
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                    Line Hits
                  </div>
                  {traceSummary.map((entry) => (
                    <div key={entry.line} className="flex items-center gap-3">
                      <span className="w-12 text-right text-[11px] text-zinc-400">
                        L{entry.line}
                      </span>
                      <div className="h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div
                          className="h-2 rounded-full bg-sky-500/70"
                          style={{
                            width: `${(entry.count / maxTraceCount) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="w-8 text-right text-[11px] text-zinc-400">
                        {entry.count}
                      </span>
                    </div>
                  ))}
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
