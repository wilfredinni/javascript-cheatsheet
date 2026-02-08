import { useEffect, useRef, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { useReader } from '../context/reader'

export default function CarbonAds() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [placeholder, setPlaceholder] = useState(false)
  const { location } = useRouterState()
  const reader = useReader()

  useEffect(() => {
    if (import.meta.env.VITE_LOAD_CARBON !== 'true') return

    const container = containerRef.current
    if (!container) return

    const existing = document.getElementById('_carbonads_js')
    if (existing) existing.remove()

    setPlaceholder(true)

    const serve = import.meta.env.VITE_CARBON_SERVE
    const placement = import.meta.env.VITE_CARBON_PLACEMENT
    const script = document.createElement('script')
    script.id = '_carbonads_js'
    script.src = `https://cdn.carbonads.com/carbon.js?serve=${serve}&placement=${placement}`
    script.async = true

    container.innerHTML = ''
    container.appendChild(script)

    const timeout = setTimeout(() => setPlaceholder(false), 100)

    return () => clearTimeout(timeout)
  }, [location.pathname, reader.isActive])

  if (import.meta.env.VITE_LOAD_CARBON !== 'true') {
    return null
  }

  return (
    <div className="mt-4 space-y-1.5">
      <div className="relative flex h-[270px] w-[200px] justify-center rounded-md bg-zinc-100/70 dark:border-zinc-700 dark:bg-zinc-800">
        <div id="carbonads" ref={containerRef} className="mb-40 h-full" />
        <div
          className={`absolute top-0 h-full w-full rounded-md bg-zinc-100/70 transition-opacity duration-300 dark:border-zinc-700 dark:bg-zinc-800 ${placeholder ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  )
}
