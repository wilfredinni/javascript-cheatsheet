import { Link, useRouterState } from '@tanstack/react-router'
import NewBadge from '../ui/NewBadge'

export type NavigationItem = {
  name: string
  path: string
  updated?: boolean
}

type SidebarNavigationProps = {
  sectionName: string
  navigation: NavigationItem[]
}

export default function SidebarNavigation({
  sectionName,
  navigation,
}: SidebarNavigationProps) {
  const { location } = useRouterState()

  return (
    <>
      <h3 className="font-display text-base font-medium text-zinc-900 dark:text-white">
        {sectionName}
      </h3>
      <ul className="mb-6 mt-2 space-y-2 border-l-2 border-zinc-100 text-base dark:border-zinc-800 lg:mt-4 lg:space-y-1.5 lg:border-zinc-200 lg:text-sm">
        {navigation.map((item) => (
          <li key={item.name} className="relative">
            <Link
              to={item.path}
              className={`-ml-px block border-l border-transparent pl-4 transition duration-150 ${
                location.pathname === item.path
                  ? 'border-current font-semibold text-amber-500 dark:text-amber-400'
                  : 'text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-300'
              }`}
            >
              {item.name}
              {item.updated ? <NewBadge /> : null}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
