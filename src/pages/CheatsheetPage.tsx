import { useParams } from '@tanstack/react-router'
import docsData from '../content/docs.json'
import BaseTitle from '../components/ui/BaseTitle'
import Prose from '../components/Prose'
import Seo from '../components/Seo'
import { siteMetadata } from '../content/site'
import NotFoundPage from './NotFoundPage'

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

export default function CheatsheetPage() {
  const { slug } = useParams({ from: '/cheatsheet/$slug' })
  const { docs } = docsData as DocsPayload
  const page = docs.find((entry) => entry.slug === slug)

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
