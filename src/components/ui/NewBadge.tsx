type NewBadgeProps = {
  className?: string
}

export default function NewBadge({ className = '' }: NewBadgeProps) {
  return (
    <span
      className={`ml-2 rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 ${className}`}
    >
      New
    </span>
  )
}
