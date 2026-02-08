import { Link, useRouterState } from '@tanstack/react-router'
import AlgoliaDocSearch from '../AlgoliaDocSearch'
import GithubIcon from '../icons/GithubIcon'
import BaseReaderMode from '../ui/BaseReaderMode'
import BaseThemeToggle from '../ui/BaseThemeToggle'
import SidebarMobile from './TheSidebarMobile'
import { navbarNavigation } from '../../content/navigation'

export default function Navbar() {
  const { location } = useRouterState()

  return (
    <nav className="sticky top-0 z-40 w-full flex-none border-b border-zinc-900/10 bg-white/90 backdrop-blur dark:border-zinc-50/[0.06] dark:bg-transparent lg:z-50">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-12">
        <div className="relative flex h-14 justify-between">
          <SidebarMobile />

          <div className="ml-14 flex flex-1 items-center space-x-6 lg:ml-0">
            <div className="mr-3 flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  className="h-6 w-auto rounded"
                  src="/icons/javascript_logo.png"
                  alt="javascript-cheatsheet"
                  height={10}
                  width={10}
                />
              </Link>
            </div>

            <AlgoliaDocSearch />
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center space-x-5 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden border-r border-zinc-200 pr-6 dark:border-zinc-800 sm:ml-6 sm:space-x-6 lg:flex">
              {navbarNavigation.map((item) => (
                <div key={item.name}>
                  {item.internal ? (
                    <Link
                      to={item.path}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300 ${
                        location.pathname === item.path
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-zinc-700 hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-400'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-zinc-700 transition duration-300 hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-400"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}

              <a
                href="https://github.com/sponsors/wilfredinni"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300 hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-400"
              >
                Sponsor
                <span className="ml-1 text-red-500"> ❤</span>
              </a>

              <BaseReaderMode />
            </div>

            <BaseThemeToggle />
            <a
              target="_blank"
              href="https://github.com/wilfredinni/javascript-cheatsheet"
              rel="noreferrer"
            >
              <GithubIcon />
              <span className="sr-only">Javascript Cheatsheet repository</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
