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
  const baseUrl = /^https?:\/\//.test(siteMetadata.baseUrl)
    ? siteMetadata.baseUrl
    : `https://${siteMetadata.baseUrl}`
  const url = new URL(location.pathname, baseUrl).toString()
  const ogImage = new URL(siteMetadata.image, baseUrl).toString()
  const ogType = location.pathname === '/' ? 'website' : 'article'

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
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
