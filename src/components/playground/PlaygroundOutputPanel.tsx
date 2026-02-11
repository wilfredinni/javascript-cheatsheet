import VisualizationPanel from './VisualizationPanel'
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
            <VisualizationPanel
              traceEvents={traceEvents}
              visualizationStatus={visualizationStatus}
            />
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
