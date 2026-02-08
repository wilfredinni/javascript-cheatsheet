import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

type ReaderContextValue = {
  isActive: boolean
  fontSize: string
  fontSizes: string[]
  toggle: () => void
  setFontSize: (size: string) => void
}

const ReaderContext = createContext<ReaderContextValue | undefined>(undefined)

const fontSizes = ['prose-sm', 'prose-md', 'prose-lg', 'prose-xl', 'prose-2xl']

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [fontSize, setFontSizeState] = useState('prose-xl')

  const toggle = () => {
    setFontSizeState('prose-xl')
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
