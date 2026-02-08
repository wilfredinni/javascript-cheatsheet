import type { ReactNode } from 'react'

type BaseBadgeNoticeProps = {
  size: 'xs' | 'sm'
  title?: ReactNode
  message?: ReactNode
}

const sizes = {
  xs: 'text-xs py-0.5 gap-x-2',
  sm: 'text-sm py-1 gap-x-4',
}

export default function BaseBadgeNotice({
  size,
  title = 'Changelog',
  message = 'My message',
}: BaseBadgeNoticeProps) {
  return (
    <div className="flex">
      <div
        className={`relative flex items-center rounded-full px-4 leading-6 text-zinc-600 dark:ring-zinc-100/10 dark:text-zinc-300 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 ${sizes[size]}`}
      >
        <span className="font-semibold text-amber-600 dark:text-amber-500">
          {title}
        </span>
        <span
          className="h-4 w-px bg-zinc-900/10 dark:bg-zinc-100/10"
          aria-hidden="true"
        />
        <p className="flex items-center gap-x-1 font-semibold">
          <span className="absolute inset-0" aria-hidden="true" />
          {message}
        </p>
      </div>
    </div>
  )
}
