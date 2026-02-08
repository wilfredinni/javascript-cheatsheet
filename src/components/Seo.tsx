import { Helmet } from 'react-helmet-async'
import { useRouterState } from '@tanstack/react-router'
import { siteMetadata } from '../content/site'
import { useTheme } from '../context/theme'

type SeoProps = {
  title: string
  description?: string
}

export default function Seo({ title, description }: SeoProps) {
  const { location } = useRouterState()
  const { isDark } = useTheme()

  const pageDescription = description || siteMetadata.description
  const pageTitle = title || siteMetadata.title
  const url = `https://${siteMetadata.baseUrl}${location.pathname}`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="theme-color" content={isDark ? '#1f2937' : '#ffffff'} />
      <meta name="description" content={pageDescription} />
      <meta name="author" content="Javascript Cheatsheet" />
      <meta name="keywords" content={siteMetadata.keywords.join(', ')} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content="The Javascript Cheatsheet" />
      <meta name="twitter:card" content="summary" />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
