import { useEffect, useRef, useState } from 'react'

export function useSplitResize(initialPercent = 55) {
  const [splitPercent, setSplitPercent] = useState(initialPercent)
  const [isDragging, setIsDragging] = useState(false)
  const splitContainerRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef(false)

  const handlePointerMove = (event: PointerEvent) => {
    const container = splitContainerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const next = ((event.clientX - rect.left) / rect.width) * 100
    const clamped = Math.min(75, Math.max(25, next))
    setSplitPercent(clamped)
  }

  const stopDrag = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)
    document.body.style.cursor = ''
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', stopDrag)
  }

  useEffect(() => {
    return () => {
      stopDrag()
    }
  }, [])

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    isDraggingRef.current = true
    setIsDragging(true)
    document.body.style.cursor = 'col-resize'
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDrag)
  }

  return {
    splitPercent,
    splitContainerRef,
    isDragging,
    startDrag,
  }
}
