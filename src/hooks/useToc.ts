import { useEffect, useState } from 'react'

type TocItem = {
  header: string
  id: string
}

export function useToc(triggerKey: string) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [currentSection, setCurrentSection] = useState('')

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | null = null
    let mutationObserver: MutationObserver | null = null
    let refreshTimer: number | null = null

    const clearRefreshTimer = () => {
      if (refreshTimer !== null) {
        window.clearTimeout(refreshTimer)
        refreshTimer = null
      }
    }

    const buildToc = () => {
      const headings = Array.from(document.querySelectorAll('article h2'))
      setToc(
        headings.map((heading) => ({
          header: heading.textContent || '',
          id: heading.id,
        })),
      )

      if (!headings.length) {
        setCurrentSection('')
        if (intersectionObserver) {
          intersectionObserver.disconnect()
          intersectionObserver = null
        }
        return
      }

      if (intersectionObserver) {
        intersectionObserver.disconnect()
        intersectionObserver = null
      }

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              setCurrentSection(entry.target.getAttribute('id') || '')
            }
          })
        },
        { rootMargin: '0px 0px -50% 0px' },
      )

      headings.forEach((heading) => intersectionObserver?.observe(heading))
    }

    const observeArticleChanges = () => {
      const article = document.querySelector('article')
      if (!article) {
        return
      }

      mutationObserver = new MutationObserver(() => {
        clearRefreshTimer()
        refreshTimer = window.setTimeout(() => {
          buildToc()
        }, 0)
      })

      mutationObserver.observe(article, { childList: true, subtree: true })
    }

    buildToc()
    observeArticleChanges()

    return () => {
      clearRefreshTimer()
      if (mutationObserver) {
        mutationObserver.disconnect()
        mutationObserver = null
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect()
        intersectionObserver = null
      }
    }
  }, [triggerKey])

  return { toc, currentSection }
}
