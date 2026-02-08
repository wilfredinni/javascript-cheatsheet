import { Link, useRouterState } from '@tanstack/react-router'
import { cheatsheetNavigation, mainNavigation } from '../../content/navigation'

type NavItem = {
  name: string
  path: string
}

export default function BasePagination() {
  const { location } = useRouterState()
  const changelogPath: NavItem[] = [{ name: 'Changelog', path: '/changelog' }]
  const allRoutes = [
    ...changelogPath,
    ...mainNavigation,
    ...cheatsheetNavigation,
  ]

  const index = allRoutes.findIndex((item) => item.path === location.pathname)
  const previous = index > 0 ? allRoutes[index - 1] : null
  const next =
    index >= 0 && index < allRoutes.length - 1 ? allRoutes[index + 1] : null

  return (
    <div className="mt-5 grid grid-cols-1 gap-4 pt-5 text-zinc-400 sm:grid-cols-2">
      {previous ? (
        <Link
          to={previous.path}
          className="grid w-full rounded-lg border border-zinc-300/70 p-5 transition duration-300 hover:border-zinc-500 hover:bg-zinc-400/5 dark:border-zinc-800 dark:hover:border-zinc-400"
        >
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Previous page
          </span>
          <span className="font-medium text-zinc-600 dark:text-zinc-400">
            {previous.name}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={next.path}
          className="grid w-full rounded-lg border border-zinc-300/70 p-5 text-end transition duration-300 hover:border-zinc-500 hover:bg-zinc-400/5 dark:border-zinc-800 dark:hover:border-zinc-400"
        >
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Next page
          </span>
          <span className="font-medium text-zinc-600 dark:text-zinc-400">
            {next.name}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
