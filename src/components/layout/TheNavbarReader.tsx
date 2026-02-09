import { useRouterState } from '@tanstack/react-router'
import BaseThemeToggle from '../ui/BaseThemeToggle'
import { useReader } from '../../context/reader'
import { useReaderStats } from '../../hooks/useReaderStats'

export default function NavbarReader() {
  const reader = useReader()
  const { location } = useRouterState()
  const { progress, minutes } = useReaderStats('reader-content', [
    location.pathname,
  ])
  const progressPercent = Math.round(progress * 100)

  const fontIndex = reader.fontSizes.findIndex(
    (item) => item === reader.fontSize,
  )
  const hasNext = reader.fontSizes.length - 1 > fontIndex
  const hasPrevious = fontIndex !== 0

  const increaseFont = () => {
    if (hasNext) {
      reader.setFontSize(reader.fontSizes[fontIndex + 1])
    }
  }

  const decreaseFont = () => {
    if (hasPrevious) {
      reader.setFontSize(reader.fontSizes[fontIndex - 1])
    }
  }

  return (
    <nav className="sticky top-0 z-40 w-full flex-none border-b border-zinc-900/10 bg-white/80 backdrop-blur dark:border-zinc-50/6 dark:bg-zinc-900/80 lg:z-50">
      <div className="mx-auto max-w-8xl px-4 xl:px-10">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-center justify-between gap-4 sm:items-center">
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              <span>{progressPercent}% read</span>
              <span className="hidden sm:inline">
                {minutes > 0 ? `${minutes} min read` : 'Calculating'}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="space-x-6 border-r border-zinc-200 pr-6 dark:border-zinc-800">
                <button
                  className={`text-zinc-400 transition duration-300 dark:text-zinc-500 ${
                    hasNext
                      ? 'hover:text-amber-500 dark:hover:text-amber-500'
                      : ''
                  }`}
                  onClick={increaseFont}
                >
                  A+
                </button>
                <button
                  className={`text-zinc-400 transition duration-300 dark:text-zinc-500 ${
                    hasPrevious
                      ? 'hover:text-amber-500 dark:hover:text-amber-500'
                      : ''
                  }`}
                  onClick={decreaseFont}
                >
                  A-
                </button>
                <span className="text-white"> </span>
              </div>

              <BaseThemeToggle />

              <button
                className="rounded text-zinc-400 transition duration-300 hover:text-amber-500 dark:hover:bg-transparent"
                onClick={reader.toggle}
              >
                <span className="sr-only">close reader mode</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full bg-amber-500 transition-[width] duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </nav>
  )
}
