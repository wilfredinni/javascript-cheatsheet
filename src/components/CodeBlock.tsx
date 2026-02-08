import type { ReactNode } from 'react'
import { useState } from 'react'

type CodeBlockProps = {
  code: string
  language?: string
  preClassName?: string
  codeClassName?: string
  children: ReactNode
}

async function writeToClipboard(text: string) {
  if (!text) {
    return false
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  const success = document.execCommand('copy')
  document.body.removeChild(textarea)
  return success
}

export default function CodeBlock({
  code,
  language,
  preClassName,
  codeClassName,
  children,
}: CodeBlockProps) {
  const [label, setLabel] = useState('Copy')
  const preClasses = [
    'm-0',
    '!bg-transparent',
    '!shadow-none',
    '!ring-0',
    preClassName,
  ]
    .filter(Boolean)
    .join(' ')
  const languageLabel = language ? language.toUpperCase() : 'Code'

  const handleCopy = async () => {
    try {
      const copied = await writeToClipboard(code)
      if (copied) {
        setLabel('Copied')
        window.setTimeout(() => setLabel('Copy'), 1600)
      }
    } catch {
      // Ignore clipboard failures.
    }
  }

  return (
    <div
      className="not-prose flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-700/60 dark:bg-zinc-900/70 dark:ring-zinc-100/5"
      data-language={language || undefined}
    >
      <div className="flex items-center justify-between border-b border-zinc-200/70 bg-zinc-50/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-900/60 dark:text-zinc-400">
        <span>{languageLabel}</span>
        <button
          className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-[11px] font-semibold text-zinc-600 transition hover:border-amber-300 hover:text-amber-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-amber-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-amber-400/60 dark:hover:text-amber-400"
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {label}
        </button>
      </div>
      <div className="flex-1 bg-zinc-900/95 text-sm dark:bg-zinc-900">
        <pre className={`bg-transparent ${preClasses}`}>
          <code className={codeClassName}>{children}</code>
        </pre>
      </div>
    </div>
  )
}
