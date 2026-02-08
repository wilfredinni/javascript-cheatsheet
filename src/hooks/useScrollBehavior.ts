import { useEffect } from 'react'

export function useScrollBehavior(pathname: string, hash: string) {
  useEffect(() => {
    if (hash) {
      const target = hash.startsWith('#') ? hash : `#${hash}`
      const element = document.querySelector(target)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname, hash])
}
