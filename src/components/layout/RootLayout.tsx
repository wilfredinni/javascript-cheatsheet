import { Outlet, useRouterState } from '@tanstack/react-router'
import { useReader } from '../../context/reader'
import { useScrollBehavior } from '../../hooks/useScrollBehavior'
import BasePagination from '../ui/BasePagination'
import Footer from './TheFooter'
import Navbar from './TheNavbar'
import NavbarReader from './TheNavbarReader'
import SidebarDesktop from './TheSidebarDesktop'
import Toc from './TheToc'

const rootRepositoryRoutes = ['/changelog', '/playground']

export default function RootLayout() {
  const reader = useReader()
  const { location } = useRouterState()
  const isPlayground = location.pathname === '/playground'

  useScrollBehavior(location.pathname, location.hash)

  const repository = rootRepositoryRoutes.includes(location.pathname)
    ? 'https://github.com/wilfredinni/javascript-cheatsheet/blob/master/src/pages'
    : 'https://github.com/wilfredinni/javascript-cheatsheet/blob/master/docs'

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {!reader.isActive ? <Navbar /> : <NavbarReader />}

      <div
        className={`relative mx-auto flex min-h-screen justify-center ${
          isPlayground
            ? 'max-w-none px-0'
            : 'max-w-8xl sm:px-2 lg:px-8 xl:px-12'
        }`}
      >
        {!reader.isActive && !isPlayground ? (
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
          className={`min-w-0 flex-auto ${
            isPlayground ? 'px-0 pb-0 pt-0' : 'px-4 py-12 xl:px-16'
          } ${
            reader.isActive
              ? 'max-w-2xl lg:max-w-4xl'
              : isPlayground
                ? 'max-w-none'
                : 'lg:max-w-none'
          }`}
        >
          <article id="reader-content">
            <Outlet />
          </article>

          {!isPlayground && !location.pathname.startsWith('/builtin/') && (
            <BasePagination />
          )}

          {!isPlayground && <Footer repository={repository} />}
        </div>

        {!reader.isActive && !isPlayground && location.pathname !== '/' ? (
          <div className="overflow-overlay hidden overflow-x-hidden xl:sticky xl:top-[3.6rem] xl:-mr-6 xl:block xl:h-[calc(100vh-3.6rem)] xl:flex-none xl:overflow-y-auto xl:py-10 xl:pr-6">
            <Toc />
          </div>
        ) : null}
      </div>
    </div>
  )
}
