import { useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import docsearch from '@docsearch/js'

type DocSearchItem = {
  url: string
}

type NavigatorArgs = {
  itemUrl: string
}

type HitComponentProps = {
  hit: DocSearchItem
  children: React.ReactNode
}

function isSpecialClick(event: MouseEvent) {
  return (
    event.button === 1 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  )
}

function getRelativePath(absoluteUrl: string) {
  const { pathname, hash } = new URL(absoluteUrl)
  const url = window.location.origin
  const relativeUrl = pathname.replace(url, '/') + hash
  return relativeUrl.replace(/\/+$/, '')
}

export default function AlgoliaDocSearch() {
  const router = useRouter()

  useEffect(() => {
    const options = {
      container: '#docsearch',
      appId: import.meta.env.VITE_DOCSEARCH_APP_ID,
      indexName: import.meta.env.VITE_DOCSEARCH_INDEX_NAME,
      apiKey: import.meta.env.VITE_DOCSEARCH_API_KEY,
      navigator: {
        navigate({ itemUrl }: NavigatorArgs) {
          const { pathname: hitPathname } = new URL(
            window.location.origin + itemUrl,
          )

          if (window.location.pathname === hitPathname) {
            window.location.assign(window.location.origin + itemUrl)
          } else {
            router.navigate({ to: itemUrl })
          }
        },
      },
      transformItems(items: DocSearchItem[]) {
        return items.map((item) => ({
          ...item,
          url: getRelativePath(item.url),
        }))
      },
      hitComponent({ hit, children }: HitComponentProps) {
        return {
          __v: 1,
          type: 'a',
          constructor: undefined,
          props: {
            href: hit.url,
            children,
            onClick(event: MouseEvent) {
              if (isSpecialClick(event)) return

              if (window.location.pathname === hit.url) return

              const { pathname: hitPathname } = new URL(
                window.location.origin + hit.url,
              )

              if (window.location.pathname !== hitPathname)
                event.preventDefault()

              if (window.location.pathname === hitPathname) {
                window.location.assign(window.location.origin + hit.url)
              } else {
                router.navigate({ to: hit.url })
              }
            },
          },
        }
      },
    }

    docsearch(options)
  }, [router])

  return <div id="docsearch" />
}
