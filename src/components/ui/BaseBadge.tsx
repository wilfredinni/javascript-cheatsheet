import type { ReactNode } from 'react'

type BaseBadgeProps = {
  children?: ReactNode
}

export default function BaseBadge({ children }: BaseBadgeProps) {
  return (
    <div className="flex w-auto items-center rounded-full bg-amber-400/10 px-3 py-1 text-xs font-medium leading-5 text-amber-600 transition duration-300 hover:bg-amber-400/20 dark:text-amber-400">
      <strong className="line-clamp-1 font-semibold">
        {children || (
          <>
            <span className="hidden xl:flex">
              ✨ Recently added
              <span className="mx-1.5">·</span>
              Copy Module
            </span>
            <span className="hidden lg:block xl:hidden"> ✨ Latest Issue </span>
          </>
        )}
      </strong>
      <svg
        width="3"
        height="6"
        className="ml-3 overflow-visible text-amber-300 dark:text-amber-400"
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
