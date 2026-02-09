import { useEffect, useMemo, useState } from 'react'

type ReaderStats = {
  progress: number
  wordCount: number
  minutes: number
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function useReaderStats(targetId: string, deps: unknown[] = []) {
  const [progress, setProgress] = useState(0)
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const ratio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
      const clamped = Math.min(1, Math.max(0, ratio))
      setProgress(clamped)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) {
      setWordCount(0)
      return
    }

    const text = target.textContent || ''
    setWordCount(countWords(text))
  }, deps)

  const minutes = useMemo(() => {
    if (!wordCount) return 0
    return Math.max(1, Math.round(wordCount / 200))
  }, [wordCount])

  return { progress, wordCount, minutes } as ReaderStats
}
