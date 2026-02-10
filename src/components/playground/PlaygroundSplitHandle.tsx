type PlaygroundSplitHandleProps = {
  isDragging: boolean
  onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void
}

export default function PlaygroundSplitHandle({
  isDragging,
  onPointerDown,
}: PlaygroundSplitHandleProps) {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <button
        className={`h-full w-full cursor-col-resize touch-none rounded-full border border-transparent transition hover:border-zinc-200 dark:hover:border-zinc-700 ${
          isDragging ? 'bg-zinc-100 dark:bg-zinc-800' : ''
        }`}
        type="button"
        onPointerDown={onPointerDown}
        aria-label="Resize panels"
      >
        <span className="mx-auto block h-12 w-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      </button>
    </div>
  )
}
