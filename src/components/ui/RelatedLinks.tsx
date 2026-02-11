import { Link } from '@tanstack/react-router'
import { cheatsheetNavigation } from '../../content/navigation'

type RelatedLinksProps = {
  currentPath: string
  maxItems?: number
}

function getRelatedLinks(currentPath: string, maxItems: number) {
  if (maxItems <= 0) {
    return []
  }

  const index = cheatsheetNavigation.findIndex(
    (item) => item.path === currentPath,
  )

  if (index < 0) {
    return []
  }

  const related: typeof cheatsheetNavigation = []
  let left = index - 1
  let right = index + 1

  while (
    related.length < maxItems &&
    (left >= 0 || right < cheatsheetNavigation.length)
  ) {
    if (left >= 0) {
      related.push(cheatsheetNavigation[left])
      left -= 1
    }

    if (related.length < maxItems && right < cheatsheetNavigation.length) {
      related.push(cheatsheetNavigation[right])
      right += 1
    }
  }

  return related
}

export default function RelatedLinks({
  currentPath,
  maxItems = 4,
}: RelatedLinksProps) {
  const links = getRelatedLinks(currentPath, maxItems)

  if (links.length === 0) {
    return null
  }

  return (
    <div className="not-prose mt-8">
      <div className="rounded-2xl border border-zinc-200/70 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Related topics
          </h2>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Keep exploring
          </span>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {links.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="group flex items-center justify-between rounded-xl border border-zinc-200/70 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-white dark:hover:border-zinc-700"
              >
                <span>{item.name}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600 transition duration-200 group-hover:text-amber-700 dark:text-amber-400 dark:group-hover:text-amber-300">
                  Open
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
