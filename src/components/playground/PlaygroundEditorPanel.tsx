import Editor from '@monaco-editor/react'

type PlaygroundEditorPanelProps = {
  activePane: 'editor' | 'output'
  code: string
  isRunning: boolean
  lastRunLabel: string | null
  lastRunDurationLabel: string | null
  runDisabled: boolean
  nodeOnlyReason: string | null
  onRun: () => void
  onVisualize: () => void
  onFormat: () => void
  onEditorBeforeMount: (monaco: typeof import('monaco-editor')) => void
  onEditorMount: (
    editor: import('monaco-editor').editor.IStandaloneCodeEditor,
  ) => void
  onCodeChange: (value: string) => void
  theme: 'playground-dark' | 'playground-light'
}

export default function PlaygroundEditorPanel({
  activePane,
  code,
  isRunning,
  lastRunLabel,
  lastRunDurationLabel,
  runDisabled,
  nodeOnlyReason,
  onRun,
  onVisualize,
  onFormat,
  onEditorBeforeMount,
  onEditorMount,
  onCodeChange,
  theme,
}: PlaygroundEditorPanelProps) {
  return (
    <div
      className={`flex min-h-0 min-w-0 flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${
        activePane === 'editor' ? 'flex' : 'hidden'
      } lg:flex`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/70 py-2 pl-4 pr-0 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
            type="button"
            onClick={onFormat}
          >
            Format
          </button>
          <button
            className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-900 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-white disabled:text-zinc-400 dark:border-emerald-400/50 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:border-emerald-300"
            type="button"
            onClick={onRun}
            disabled={runDisabled}
            title={nodeOnlyReason ? `Disabled: ${nodeOnlyReason}` : undefined}
          >
            {isRunning ? 'Running...' : 'Run'}
          </button>
          <button
            className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700 transition hover:border-sky-300 hover:text-sky-900 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-white disabled:text-zinc-400 dark:border-sky-400/50 dark:bg-sky-500/10 dark:text-sky-200 dark:hover:border-sky-300"
            type="button"
            onClick={onVisualize}
            disabled={runDisabled}
            title={nodeOnlyReason ? `Disabled: ${nodeOnlyReason}` : undefined}
          >
            Visualize
          </button>
        </div>
        {isRunning ? (
          <span className="text-[10px] font-medium text-zinc-400">
            Running...
          </span>
        ) : lastRunLabel ? (
          <span className="text-[10px] font-medium text-zinc-400 mr-3">
            Last run {lastRunLabel}
            {lastRunDurationLabel ? ` · ${lastRunDurationLabel}` : ''}
          </span>
        ) : null}
      </div>
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language="javascript"
          theme={theme}
          beforeMount={onEditorBeforeMount}
          onMount={onEditorMount}
          value={code}
          onChange={(value) => onCodeChange(value ?? '')}
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
  )
}
