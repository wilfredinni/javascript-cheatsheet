import { useRouterState } from '@tanstack/react-router'
import { useReaderBookmarks } from '../../hooks/useReaderBookmarks'

export default function ReaderBookmarks() {
  const { location } = useRouterState()
  const { bookmarks, addBookmark, removeBookmark } = useReaderBookmarks(
    location.pathname,
  )

  return (
    <aside className="flex h-full w-56 flex-col gap-4">
      <div>
        <h3 className="font-display text-sm font-medium text-zinc-900 dark:text-white">
          Bookmarks
        </h3>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Save your place in this page.
        </p>
      </div>

      <button
        className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
        onClick={addBookmark}
      >
        Add bookmark
      </button>

      <div className="space-y-2">
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
                className="block truncate text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                {bookmark.label}
              </a>
              <button
                className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-400 transition hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                onClick={() => removeBookmark(bookmark.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}
