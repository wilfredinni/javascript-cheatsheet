import { useEffect } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { Github, Play } from 'lucide-react'
import AlgoliaDocSearch from '../AlgoliaDocSearch'
import BaseReaderMode from '../ui/BaseReaderMode'
import BaseThemeToggle from '../ui/BaseThemeToggle'
import SidebarMobile from './TheSidebarMobile'
import { navbarNavigation } from '../../content/navigation'

export default function Navbar() {
  const { location } = useRouterState()
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target as HTMLElement | null
      const tagName = target?.tagName
      if (
        target?.isContentEditable ||
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT'
      ) {
        return
      }

      if (event.key.toLowerCase() !== 'p') {
        return
      }

      event.preventDefault()
      navigate({ to: '/playground' })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  return (
    <nav className="sticky top-0 z-40 w-full flex-none border-b border-zinc-900/10 bg-white/80 backdrop-blur dark:border-zinc-50/6 dark:bg-zinc-900/80 lg:z-50">
      <div className="mx-auto max-w-8xl px-3 sm:px-6 lg:px-12">
        <div className="relative flex h-16 items-center justify-between">
          <SidebarMobile />

          <div className="ml-14 flex flex-1 items-center gap-8 lg:ml-0">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <img
                className="h-8 w-8 rounded"
                src="/icons/javascript_logo.png"
                alt="javascript-cheatsheet"
                height={10}
                width={10}
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  <span className="xl:hidden">JS Cheatsheet</span>
                  <span className="hidden xl:inline">
                    Javascript Cheatsheet
                  </span>
                </p>
                <p className="hidden text-xs text-zinc-500 dark:text-zinc-400 xl:block">
                  Fast, practical reference
                </p>
              </div>
            </Link>

            <div className="hidden w-full max-w-md lg:block">
              <AlgoliaDocSearch />
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden items-center gap-3 lg:flex">
              {navbarNavigation.map((item) => (
                <div key={item.name}>
                  {item.internal ? (
                    <Link
                      to={item.path}
                      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                        location.pathname === item.path
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
                          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}

              <Link
                to="/playground"
                className="relative inline-flex h-8 items-center rounded-full border border-amber-200 bg-white/80 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 transition hover:border-amber-300 hover:bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:border-amber-400/60"
              >
                <Play className="mr-2 h-4 w-4" />
                Playground
                <span className="absolute -right-1.5 -top-1.5 rounded-full border border-amber-200 bg-white px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-[0.2em] text-amber-600 dark:border-amber-500/30 dark:bg-zinc-900 dark:text-amber-200">
                  P
                </span>
              </Link>

              <BaseReaderMode />
            </div>

            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <AlgoliaDocSearch />
              </div>
              <a
                href="https://github.com/wilfredinni/javascript-cheatsheet"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-600 transition-colors duration-200 ease-in-out hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <BaseThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
