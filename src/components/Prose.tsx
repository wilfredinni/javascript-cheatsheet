import type { ReactNode } from 'react'
import { useReader } from '../context/reader'

type ProseProps = {
  children: ReactNode
  className?: string
}

export default function Prose({ children, className = '' }: ProseProps) {
  const reader = useReader()

  return (
    <div
      className={[
        'prose prose-zinc max-w-none dark:prose-invert dark:text-zinc-400',
        'prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-medium lg:prose-headings:scroll-mt-20',
        'prose-lead:text-zinc-500 dark:prose-lead:text-zinc-400',
        'prose-a:font-semibold dark:prose-a:text-zinc-300',
        'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,var(--color-zinc-400))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:var(--color-zinc-900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,var(--color-zinc-500))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
        'prose-pre:rounded-lg prose-pre:bg-zinc-900 prose-pre:shadow-lg dark:prose-pre:bg-zinc-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-zinc-300/10',
        'dark:prose-hr:border-zinc-800',
        'overflow-x-auto prose-thead:leading-6 prose-th:font-semibold prose-th:text-zinc-700 prose-td:font-mono prose-td:font-bold prose-td:leading-6 prose-td:text-zinc-500 prose-th:dark:text-zinc-300 prose-td:dark:text-zinc-400',
        'prose-code:text-zinc-500 prose-code:dark:text-zinc-200',
        reader.isActive ? reader.fontSize : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
