import { Link } from '@tanstack/react-router'
import Prose from '../components/Prose'
import Seo from '../components/Seo'
import { siteMetadata } from '../content/site'
import { usePrerenderReady } from '../hooks/usePrerenderReady'

const featuredTopics = [
  {
    title: 'Basics',
    description: 'Core syntax, types, operators, and the essentials.',
    slug: 'basics',
  },
  {
    title: 'Arrays',
    description: 'Create, transform, and search collections with ease.',
    slug: 'arrays',
  },
  {
    title: 'Array Methods',
    description: 'Map, filter, reduce, and the rest of the toolkit.',
    slug: 'array-methods',
  },
  {
    title: 'Objects',
    description: 'Shape data, update keys, and work with nested values.',
    slug: 'objects',
  },
  {
    title: 'Control Flow',
    description: 'Loops, branching, and patterns for clean logic.',
    slug: 'control-flow',
  },
  {
    title: 'Functions',
    description: 'Parameters, scope, and modern function syntax.',
    slug: 'functions',
  },
]

const learningPaths = [
  {
    title: 'Strings and Formatting',
    description: 'Slice, search, and format text the right way.',
    slug: 'manipulating-strings',
  },
  {
    title: 'Regular Expressions',
    description: 'Pattern matching with practical examples.',
    slug: 'regular-expressions',
  },
  {
    title: 'Maps and Sets',
    description: 'Use the right data structure for the job.',
    slug: 'map',
  },
  {
    title: 'Debugging',
    description: 'Spot issues quickly with reliable techniques.',
    slug: 'debugging',
  },
]

export default function IndexPage() {
  usePrerenderReady()

  return (
    <article className="space-y-16">
      <Seo title={siteMetadata.title} description={siteMetadata.description} />

      <section className="not-prose relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-12">
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-amber-200/60 blur-3xl dark:bg-amber-400/10" />
        <div className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-zinc-200/70 blur-3xl dark:bg-zinc-700/30" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Javascript Cheatsheet
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Learn JavaScript with confidence.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-300">
            Short, practical references for the syntax and APIs you reach for
            every day. Built for fast scanning, runnable snippets, and clean
            explanations.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/cheatsheet/$slug"
              params={{ slug: 'basics' }}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Start with the basics
            </Link>
            <Link
              to="/cheatsheet/$slug"
              params={{ slug: 'array-methods' }}
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
            >
              Browse array methods
            </Link>
            <Link
              to="/changelog"
              className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-zinc-500 transition hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white"
            >
              See what is new
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <Prose>
          <h2>Popular topics</h2>
          <p>
            Jump into the chapters that developers revisit most. Each section
            keeps the essentials close and avoids the fluff.
          </p>
        </Prose>
        <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTopics.map((topic) => (
            <Link
              key={topic.slug}
              to="/cheatsheet/$slug"
              params={{ slug: topic.slug }}
              className="group rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {topic.title}
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {topic.description}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Learn more
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <Prose className="lg:col-span-1">
          <h2>Keep moving fast</h2>
          <p>
            When you need a refresher on patterns or data structures, these
            guided routes keep you shipping.
          </p>
          <p>
            Prefer to help improve the cheatsheet? Visit the contribution guide
            or check the changelog for recent updates.
          </p>
          <div className="not-prose mt-6 flex flex-wrap gap-3">
            <Link
              to="/contributing"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
            >
              Contribute
            </Link>
            <a
              href="https://github.com/wilfredinni/javascript-cheatsheet"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
            >
              GitHub
            </a>
          </div>
        </Prose>

        <div className="not-prose grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {learningPaths.map((path) => (
            <Link
              key={path.slug}
              to="/cheatsheet/$slug"
              params={{ slug: path.slug }}
              className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {path.title}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {path.description}
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Explore now
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
