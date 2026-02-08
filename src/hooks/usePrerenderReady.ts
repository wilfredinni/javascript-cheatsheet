import { useEffect, useRef } from 'react'
import { useRouterState } from '@tanstack/react-router'

export function usePrerenderReady(isReady: boolean = true) {
  const firedRef = useRef(false)
  const { location } = useRouterState()

  useEffect(() => {
    firedRef.current = false
  }, [location.pathname])

  useEffect(() => {
    if (!isReady || firedRef.current) {
      return
    }

    firedRef.current = true
    document.dispatchEvent(new Event('prerender-ready'))
  }, [isReady, location.pathname])
}
