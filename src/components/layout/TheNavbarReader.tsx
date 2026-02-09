import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import BaseThemeToggle from '../ui/BaseThemeToggle'
import { useReader } from '../../context/reader'
import { useReaderStats } from '../../hooks/useReaderStats'
import { useReaderBookmarks } from '../../hooks/useReaderBookmarks'

export default function NavbarReader() {
  const reader = useReader()
  const { location } = useRouterState()
  const { progress, minutes } = useReaderStats('reader-content', [
    location.pathname,
  ])
  const { bookmarks, addBookmark, removeBookmark } = useReaderBookmarks(
    location.pathname,
  )
  const progressPercent = Math.round(progress * 100)
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false)

  useEffect(() => {
    setIsBookmarksOpen(false)
  }, [location.pathname])

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

              <div className="relative">
                <button
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
                  onClick={() => setIsBookmarksOpen((open) => !open)}
                >
                  Bookmarks
                  <span className="ml-2 rounded-full border border-zinc-200 px-2 py-0.5 text-[0.6rem] dark:border-zinc-700">
                    {bookmarks.length}
                  </span>
                </button>

                {isBookmarksOpen ? (
                  <div className="absolute right-0 top-full z-50 mt-3 w-72 rounded-2xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        Bookmarks
                      </p>
                      <button
                        className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-400 transition hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                        onClick={() => setIsBookmarksOpen(false)}
                      >
                        Close
                      </button>
                    </div>

                    <button
                      className="mt-4 w-full rounded-full border border-zinc-200 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
                      onClick={addBookmark}
                    >
                      Add current heading
                    </button>

                    <div className="mt-4 space-y-2">
                      {bookmarks.length === 0 ? (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          No bookmarks yet.
                        </p>
                      ) : (
                        bookmarks.map((bookmark) => (
                          <div
                            key={bookmark.id}
                            className="rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-800"
                          >
                            <a
                              href={`#${bookmark.id}`}
                              className="block truncate text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                              onClick={() => setIsBookmarksOpen(false)}
                            >
                              {bookmark.label}
                            </a>
                            <button
                              className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-400 transition hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                              onClick={() => removeBookmark(bookmark.id)}
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : null}
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
