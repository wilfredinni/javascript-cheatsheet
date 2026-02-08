import { useRouterState } from '@tanstack/react-router'
import { useToc } from '../../hooks/useToc'
import CarbonAds from '../CarbonAds'

export default function Toc() {
  const { location } = useRouterState()
  const { toc, currentSection } = useToc(location.pathname)

  const pageToc = (() => {
    if (location.pathname === '/changelog' && toc.length > 13) {
      const cutIndex = { ...toc[13] }
      const shorter = toc.slice(0, 13)
      cutIndex.header = 'More...'
      shorter.push(cutIndex)
      return shorter
    }
    return toc
  })()

  return (
    <nav
      aria-labelledby="on-this-page-title"
      className="flex h-full w-56 flex-col justify-between"
    >
      <div>
        <h3 className="font-display text-sm font-medium text-zinc-900 dark:text-white">
          On this page
        </h3>

        <ul className="mt-4 text-sm">
          {pageToc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-1 font-medium transition duration-200 ${
                  currentSection === item.id
                    ? 'text-amber-500 dark:text-amber-400'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                }`}
              >
                {item.header}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <CarbonAds />
    </nav>
  )
}
