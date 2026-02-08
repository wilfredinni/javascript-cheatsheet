import { useEffect, useState } from 'react'
import BaseTitle from '../components/ui/BaseTitle'
import Prose from '../components/Prose'
import Seo from '../components/Seo'
import { siteMetadata } from '../content/site'
import NotFoundPage from './NotFoundPage'
import { usePrerenderReady } from '../hooks/usePrerenderReady'

type DocEntry = {
  slug: string
  route: string
  title: string
  description?: string
  heading?: string
  html: string
  section: 'docs' | 'pages'
}

type DocsPayload = {
  docs: DocEntry[]
  pages: DocEntry[]
}

type MarkdownPageProps = {
  pageSlug: string
}

export default function MarkdownPage({ pageSlug }: MarkdownPageProps) {
  const [docsPayload, setDocsPayload] = useState<DocsPayload | null>(null)

  useEffect(() => {
    let isActive = true

    import('../content/docs.json').then((module) => {
      if (isActive) {
        setDocsPayload(module.default as DocsPayload)
      }
    })

    return () => {
      isActive = false
    }
  }, [])

  const page = docsPayload?.pages.find((entry) => entry.slug === pageSlug)

  usePrerenderReady(docsPayload !== null)

  if (!docsPayload) {
    return (
      <Prose>
        <Seo title={siteMetadata.title} description={siteMetadata.description} />
        <p>Loading...</p>
      </Prose>
    )
  }

  if (!page) {
    return <NotFoundPage />
  }

  const heading = page.heading || page.title

  return (
    <Prose>
      <Seo title={page.title} description={page.description} />
      <BaseTitle
        title={page.title}
        description={page.description || siteMetadata.description}
      >
        {heading}
      </BaseTitle>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </Prose>
  )
}
