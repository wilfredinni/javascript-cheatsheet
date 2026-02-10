type PlaygroundMobileTabsProps = {
  activePane: 'editor' | 'output'
  onChange: (value: 'editor' | 'output') => void
}

export default function PlaygroundMobileTabs({
  activePane,
  onChange,
}: PlaygroundMobileTabsProps) {
  return (
    <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 lg:hidden">
      <button
        className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
          activePane === 'editor'
            ? 'border-amber-300 text-amber-700 dark:border-amber-400/60 dark:text-amber-200'
            : 'border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-300'
        }`}
        type="button"
        onClick={() => onChange('editor')}
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
        onClick={() => onChange('output')}
      >
        Output
      </button>
    </div>
  )
}
