import { Link, useRouterState } from '@tanstack/react-router'
import AlgoliaDocSearch from '../AlgoliaDocSearch'
import BaseReaderMode from '../ui/BaseReaderMode'
import BaseThemeToggle from '../ui/BaseThemeToggle'
import SidebarMobile from './TheSidebarMobile'
import { navbarNavigation } from '../../content/navigation'

export default function Navbar() {
  const { location } = useRouterState()

  return (
    <nav className="sticky top-0 z-40 w-full flex-none border-b border-zinc-900/10 bg-white/80 backdrop-blur dark:border-zinc-50/6 dark:bg-zinc-900/80 lg:z-50">
      <div className="mx-auto max-w-8xl px-3 sm:px-6 lg:px-12">
        <div className="relative flex h-16 items-center justify-between">
          <SidebarMobile />

          <div className="ml-14 flex flex-1 items-center gap-4 lg:ml-0">
            <Link to="/" className="flex items-center gap-3">
              <img
                className="h-8 w-8 rounded"
                src="/icons/javascript_logo.png"
                alt="javascript-cheatsheet"
                height={10}
                width={10}
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Javascript Cheatsheet
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Fast, practical reference
                </p>
              </div>
            </Link>

            <div className="hidden w-full max-w-md lg:block">
              <AlgoliaDocSearch />
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden items-center gap-2 lg:flex">
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

              <a
                href="https://github.com/sponsors/wilfredinni"
                className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
              >
                Sponsor
              </a>

              <a
                href="https://github.com/wilfredinni/javascript-cheatsheet"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
              >
                GitHub
              </a>

              <BaseReaderMode />
            </div>

            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <AlgoliaDocSearch />
              </div>
              <BaseThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
