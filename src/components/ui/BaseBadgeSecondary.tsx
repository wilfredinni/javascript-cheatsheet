import type { ReactNode } from 'react'

type BaseBadgeSecondaryProps = {
  children: ReactNode
}

export default function BaseBadgeSecondary({
  children,
}: BaseBadgeSecondaryProps) {
  return (
    <div className="text-xs relative flex items-center rounded-full px-4 py-0.5 leading-6 text-zinc-500 dark:text-zinc-400 dark:ring-zinc-100/10 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20">
      <strong className="line-clamp-1 font-semibold">{children}</strong>
      <svg
        width="3"
        height="6"
        className="ml-3 overflow-visible text-zinc-500 dark:text-zinc-400"
        aria-hidden="true"
      >
        <path
          d="M0 0L3 3L0 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  )
}
