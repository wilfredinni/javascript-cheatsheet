import type { ComponentType } from 'react'
import { Link } from '@tanstack/react-router'

type IconComponent = ComponentType<{ className?: string }>

type BaseLinkCardProps = {
  icon: IconComponent
  path: string
  title: string
  description: string
  isExternal?: boolean
}

export default function BaseLinkCard({
  icon: Icon,
  path,
  title,
  description,
  isExternal,
}: BaseLinkCardProps) {
  return (
    <div className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition duration-200 [background:linear-gradient(var(--link-grid-hover-bg,theme(colors.zinc.50)),var(--link-grid-hover-bg,theme(colors.zinc.50)))_padding-box,linear-gradient(to_top,theme(colors.gray.400),theme(colors.neutral.400),theme(colors.zinc.500))_border-box] group-hover:opacity-100 dark:[--link-grid-hover-bg:theme(colors.slate.800)]" />
      <div className="relative overflow-hidden rounded-xl p-6">
        <Icon className="h-8 w-8" />
        <p className="mt-4 font-display text-base text-zinc-900 dark:text-white">
          {isExternal ? (
            <a target="_blank" rel="noreferrer" href={path}>
              <span className="absolute -inset-px rounded-xl" />
              {title}
            </a>
          ) : (
            <Link to={path}>
              <span className="absolute -inset-px rounded-xl" />
              {title}
            </Link>
          )}
        </p>
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  )
}
