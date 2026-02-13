import { useEffect, useState } from 'react'
import BaseTitle from '../components/ui/BaseTitle'
import MarkdownContent from '../components/MarkdownContent'
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
  section: 'docs' | 'pages'
  // html is now loaded separately or not needed in index
}

type DocContent = DocEntry & {
  html: string
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
  const [content, setContent] = useState<DocContent | null>(null)

  useEffect(() => {
    let isActive = true

    // Load metadata index
    import('../content/docs.json').then((module) => {
      if (isActive) {
        setDocsPayload(module.default as DocsPayload)
      }
    })

    // Load specific content
    import(`../content/entries/${pageSlug}.json`)
      .then((module) => {
        if (isActive) {
          setContent(module.default as DocContent)
        }
      })
      .catch((err) => {
        console.error('Failed to load content', err)
        if (isActive) setContent(null)
      })

    return () => {
      isActive = false
    }
  }, [pageSlug])

  const pageMetadata = docsPayload?.pages.find((entry) => entry.slug === pageSlug)

  usePrerenderReady(docsPayload !== null && content !== null)

  if (!docsPayload || !content) {
    return (
      <Prose>
        <Seo title={siteMetadata.title} description={siteMetadata.description} />
        <p>Loading...</p>
      </Prose>
    )
  }

  if (!pageMetadata) {
    return <NotFoundPage />
  }

  const heading = pageMetadata.heading || pageMetadata.title

  return (
    <Prose>
      <Seo title={pageMetadata.title} description={pageMetadata.description} />
      <BaseTitle
        title={pageMetadata.title}
        description={pageMetadata.description || siteMetadata.description}
      >
        {heading}
      </BaseTitle>
      <MarkdownContent html={content.html} />
    </Prose>
  )
}
