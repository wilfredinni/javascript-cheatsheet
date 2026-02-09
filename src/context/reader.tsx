import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type ReaderContextValue = {
  isActive: boolean
  fontSize: string
  fontSizes: string[]
  toggle: () => void
  setFontSize: (size: string) => void
}

const ReaderContext = createContext<ReaderContextValue | undefined>(undefined)

const fontSizes = ['prose-sm', 'prose-md', 'prose-lg', 'prose-xl', 'prose-2xl']
const storageKey = 'reader-preferences'
const defaultFontSize = 'prose-xl'

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [fontSize, setFontSizeState] = useState(defaultFontSize)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (!stored) return

    try {
      const parsed = JSON.parse(stored) as {
        fontSize?: string
        isActive?: boolean
      }
      if (parsed.fontSize && fontSizes.includes(parsed.fontSize)) {
        setFontSizeState(parsed.fontSize)
      }
      if (typeof parsed.isActive === 'boolean') {
        setIsActive(parsed.isActive)
      }
    } catch {
      setFontSizeState(defaultFontSize)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ fontSize, isActive }))
  }, [fontSize, isActive])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'r') return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target as HTMLElement | null
      if (target) {
        const tagName = target.tagName.toLowerCase()
        const isInput =
          tagName === 'input' || tagName === 'textarea' || tagName === 'select'
        const isEditable = target.isContentEditable
        if (isInput || isEditable) {
          return
        }
      }

      event.preventDefault()
      setIsActive((current) => !current)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const toggle = () => {
    setIsActive((current) => !current)
  }

  const setFontSize = (size: string) => {
    setFontSizeState(size)
  }

  const value = useMemo(
    () => ({
      isActive,
      fontSize,
      fontSizes,
      toggle,
      setFontSize,
    }),
    [isActive, fontSize],
  )

  return (
    <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
  )
}

export function useReader() {
  const context = useContext(ReaderContext)
  if (!context) {
    throw new Error('useReader must be used within ReaderProvider')
  }
  return context
}
