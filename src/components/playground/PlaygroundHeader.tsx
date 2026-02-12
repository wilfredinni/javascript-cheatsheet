import { Keyboard } from 'lucide-react'

type PlaygroundHeaderProps = {
  savedLabel: string | null
  shareLabel: string
  onShare: () => void
}

export default function PlaygroundHeader({
  savedLabel,
  shareLabel,
  onShare,
}: PlaygroundHeaderProps) {
  return (
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

      <div
        className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-full bg-zinc-50 px-2.5 py-1.5 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400"
        title="Run: ⌘↵ | Format: ⌘⇧F"
      >
        <Keyboard size={12} />
        <span className="text-[9px] font-bold uppercase tracking-widest">
          Shortcuts Info
        </span>
      </div>
      <button
        className="rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
        type="button"
        onClick={onShare}
      >
        {shareLabel}
      </button>
    </div>
  )
}
