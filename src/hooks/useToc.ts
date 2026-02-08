import { useEffect, useState } from 'react'

type TocItem = {
  header: string
  id: string
}

export function useToc(triggerKey: string) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [currentSection, setCurrentSection] = useState('')

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('article h2'))
    setToc(
      headings.map((heading) => ({
        header: heading.textContent || '',
        id: heading.id,
      })),
    )

    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setCurrentSection(entry.target.getAttribute('id') || '')
          }
        })
      },
      { rootMargin: '0px 0px -50% 0px' },
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [triggerKey])

  return { toc, currentSection }
}
