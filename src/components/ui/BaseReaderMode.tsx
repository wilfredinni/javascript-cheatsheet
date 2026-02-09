import { useReader } from '../../context/reader'

export default function BaseReaderMode() {
  const reader = useReader()

  return (
    <button
      className="inline-flex items-center rounded-full bg-amber-500/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-amber-500 hover:shadow-md dark:bg-amber-400/90 dark:text-zinc-900 dark:hover:bg-amber-400"
      onClick={reader.toggle}
    >
      Reader mode
    </button>
  )
}
