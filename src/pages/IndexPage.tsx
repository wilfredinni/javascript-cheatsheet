import { lazy, Suspense } from 'react'
import { Link } from '@tanstack/react-router'
import ArrowIcon from '../components/icons/ArrowIcon'
import GridIcon from '../components/icons/GridIcon'
import PluginIcon from '../components/icons/PluginIcon'
import Prose from '../components/Prose'
import BaseLinkCard from '../components/ui/BaseLinkCard'
import BaseTitle from '../components/ui/BaseTitle'
import Seo from '../components/Seo'
import { siteMetadata } from '../content/site'
import { usePrerenderReady } from '../hooks/usePrerenderReady'

const Contributors = lazy(() => import('../components/Contributors'))

const cardLinks = [
  {
    path: 'https://github.com/wilfredinni/javascript-cheatsheet',
    name: 'View on GitHub',
    description: 'Drop a star on GitHub if you find this project useful.',
    icon: ArrowIcon,
    external: true,
  },
  {
    path: '/contributing',
    name: 'Contribute',
    description:
      'Get to know how easy it is to contribute to the Javascript Cheatsheet.',
    icon: PluginIcon,
  },
  {
    path: '/changelog',
    name: 'Changelog',
    description: 'See what is new, what got fixed, and what is coming.',
    icon: GridIcon,
  },
]

export default function IndexPage() {
  usePrerenderReady()

  return (
    <article>
      <Seo title={siteMetadata.title} description={siteMetadata.description} />

      <Prose>
        <div className="flex justify-center px-32 sm:hidden">
          <img
            className="rounded"
            src="/icons/javascript_logo.png"
            alt="javascript-cheatsheet"
            height={10}
            width={10}
          />
        </div>

        <div className="hidden sm:block">
          <BaseTitle
            title={siteMetadata.title}
            description={siteMetadata.description}
          >
            Javascript Cheatsheet
          </BaseTitle>
        </div>

        <h1 className="mb-2 bg-linear-to-r from-indigo-400 to-amber-400 bg-clip-text text-center font-display text-4xl font-medium tracking-tight text-transparent dark:from-amber-400 dark:via-teal-300 dark:to-amber-300 sm:hidden">
          Javascript Cheatsheet
        </h1>
      </Prose>

      <Prose className="hidden sm:block">
        <p>
          Anyone can forget how to{' '}
          <Link
            to="/cheatsheet/$slug"
            params={{ slug: 'regular-expressions' }}
            hash="making-your-own-character-classes"
          >
            make character classes
          </Link>{' '}
          for a regex,{' '}
          <Link
            to="/cheatsheet/$slug"
            params={{ slug: 'lists-and-tuples' }}
            hash="getting-sublists-with-slices"
          >
            slice a list
          </Link>{' '}
          or do a{' '}
          <Link
            to="/cheatsheet/$slug"
            params={{ slug: 'control-flow' }}
            hash="for-loop"
          >
            for loop
          </Link>
          . This Javascript Cheatsheet tries to provide basic reference for
          beginner and advanced developers, lower the entry barrier for
          newcomers and help veterans refresh the old tricks.
        </p>
      </Prose>

      <div className="not-prose my-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {cardLinks.map((link) => (
          <BaseLinkCard
            key={link.path}
            title={link.name}
            description={link.description}
            path={link.path}
            icon={link.icon}
            isExternal={link.external}
          />
        ))}
      </div>

      <div className="mt-10">
        <Prose>
          <h2 id="contributors" className="text-center sm:text-start">
            Contributors
          </h2>
        </Prose>
        <Suspense fallback={<div className="text-center text-sm text-zinc-500">Loading contributors...</div>}>
          <Contributors />
        </Suspense>
      </div>
    </article>
  )
}
