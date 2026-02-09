import { useEffect, useMemo, useState } from 'react'

type Bookmark = {
  id: string
  label: string
  createdAt: number
}

type BookmarkStore = Record<string, Bookmark[]>

const storageKey = 'reader-bookmarks'
const maxBookmarksPerPage = 5

function readStore(): BookmarkStore {
  const stored = localStorage.getItem(storageKey)
  if (!stored) return {}

  try {
    return JSON.parse(stored) as BookmarkStore
  } catch {
    return {}
  }
}

function writeStore(store: BookmarkStore) {
  localStorage.setItem(storageKey, JSON.stringify(store))
}

function getActiveHeading() {
  const headings = Array.from(
    document.querySelectorAll('article h2, article h3'),
  ) as HTMLElement[]

  const fallback = headings[0]
  let active = fallback

  headings.forEach((heading) => {
    const top = heading.getBoundingClientRect().top
    if (top <= 120) {
      active = heading
    }
  })

  if (!active || !active.id) return null

  return {
    id: active.id,
    label: active.textContent || 'Bookmark',
  }
}

export function useReaderBookmarks(pathname: string) {
  const [store, setStore] = useState<BookmarkStore>({})

  useEffect(() => {
    setStore(readStore())
  }, [])

  useEffect(() => {
    writeStore(store)
  }, [store])

  const bookmarks = useMemo(() => store[pathname] || [], [store, pathname])

  const addBookmark = () => {
    const active = getActiveHeading()
    if (!active) return

    setStore((current) => {
      const existing = current[pathname] || []
      if (existing.some((item) => item.id === active.id)) {
        return current
      }

      const next = [
        {
          id: active.id,
          label: active.label,
          createdAt: Date.now(),
        },
        ...existing,
      ].slice(0, maxBookmarksPerPage)

      return { ...current, [pathname]: next }
    })
  }

  const removeBookmark = (id: string) => {
    setStore((current) => {
      const next = (current[pathname] || []).filter((item) => item.id !== id)
      return { ...current, [pathname]: next }
    })
  }

  return { bookmarks, addBookmark, removeBookmark }
}
