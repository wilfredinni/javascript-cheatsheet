import { useEffect } from 'react'
import { Outlet, useRouterState } from '@tanstack/react-router'
import { useReader } from '../../context/reader'
import { useScrollBehavior } from '../../hooks/useScrollBehavior'
import BasePagination from '../ui/BasePagination'
import Footer from './TheFooter'
import Navbar from './TheNavbar'
import NavbarReader from './TheNavbarReader'
import SidebarDesktop from './TheSidebarDesktop'
import Toc from './TheToc'

const rootRepositoryRoutes = ['/contributing', '/changelog']

export default function RootLayout() {
  const reader = useReader()
  const { location } = useRouterState()

  useScrollBehavior(location.pathname, location.hash)

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.dispatchEvent(new Event('prerender-ready'))
    }, 0)

    return () => clearTimeout(timeout)
  }, [location.pathname])

  const repository = rootRepositoryRoutes.includes(location.pathname)
    ? 'https://github.com/wilfredinni/javascript-cheatsheet/blob/master/src/pages'
    : 'https://github.com/wilfredinni/javascript-cheatsheet/blob/master/docs'

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {!reader.isActive ? <Navbar /> : <NavbarReader />}

      <div className="relative mx-auto flex min-h-screen max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        {!reader.isActive ? (
          <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="absolute inset-y-0 right-0 w-[50vw] dark:hidden" />
            <div className="sticky top-[3.6rem] -ml-0.5 h-[calc(100vh-3.6rem)] overflow-y-auto overflow-x-hidden py-10 pl-0.5">
              <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-linear-to-t from-zinc-800 dark:block" />
              <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-zinc-800 dark:block" />
              <div className="w-64 pr-8 xl:w-72 xl:pr-16">
                <SidebarDesktop />
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={`min-w-0 flex-auto px-4 py-12 xl:px-16 ${
            reader.isActive ? 'max-w-2xl lg:max-w-4xl' : 'lg:max-w-none'
          }`}
        >
          <article>
            <Outlet />
          </article>

          {!location.pathname.startsWith('/builtin/') && <BasePagination />}

          <Footer repository={repository} />
        </div>

        {!reader.isActive ? (
          <div className="overflow-overlay hidden overflow-x-hidden xl:sticky xl:top-[3.6rem] xl:-mr-6 xl:block xl:h-[calc(100vh-3.6rem)] xl:flex-none xl:overflow-y-auto xl:py-10 xl:pr-6">
            <Toc />
          </div>
        ) : null}
      </div>
    </div>
  )
}
