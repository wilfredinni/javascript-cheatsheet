import { useReader } from '../../context/reader'

export default function BaseReaderMode() {
  const reader = useReader()

  return (
    <button
      className="relative inline-flex h-8 items-center rounded-full border border-amber-200 bg-white/80 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 transition hover:border-amber-300 hover:bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:border-amber-400/60"
      onClick={reader.toggle}
    >
      Reader Mode
      <span className="absolute -right-1.5 -top-1.5 rounded-full border border-amber-200 bg-white px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-[0.2em] text-amber-600 dark:border-amber-500/30 dark:bg-zinc-900 dark:text-amber-200">
        R
      </span>
    </button>
  )
}
