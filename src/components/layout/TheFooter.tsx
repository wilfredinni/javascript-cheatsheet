import { useRouterState } from '@tanstack/react-router'
import EditIcon from '../icons/EditIcon'
import QuestionIcon from '../icons/QuestionIcon'
import BugIcon from '../icons/BugIcon'
import NetlifyBadge from '../NetlifyBadge'

type FooterProps = {
  repository?: string
}

export default function Footer({ repository = '' }: FooterProps) {
  const { location } = useRouterState()
  const routesWithoutGithub = ['/', '/blog']

  const editLink = {
    linkHeader: 'Edit this page on',
    linkText: 'GitHub',
    url: `${repository}${location.pathname}.md`,
    icon: EditIcon,
  }

  const footerLinks = [
    {
      linkHeader: 'Do you have a question?',
      linkText: 'ask the community',
      url: 'https://github.com/wilfredinni/javascript-cheatsheet/discussions',
      icon: QuestionIcon,
    },
    {
      linkHeader: 'Do you see a bug?',
      linkText: 'open an issue on GitHub',
      url: 'https://github.com/wilfredinni/javascript-cheatsheet/issues',
      icon: BugIcon,
    },
  ]

  const EditIconComponent = editLink.icon

  return (
    <footer className="mt-5 border-t dark:border-t-zinc-800">
      <div className="justify-between pt-5 sm:flex">
        <div
          className={`grid text-xs ${
            location.pathname !== '/' ? 'space-y-1.5' : ''
          }`}
        >
          {!routesWithoutGithub.includes(location.pathname) ? (
            <div className="flex items-center text-zinc-600 dark:text-zinc-400 font-medium">
              <EditIconComponent className="mr-2 h-4 w-4" />
              {editLink.linkHeader}
              <a
                target="_blank"
                href={editLink.url}
                className="ml-1 flex text-zinc-600 hover:text-zinc-800 dark:text-zinc-100 dark:hover:text-zinc-300"
                rel="noreferrer"
              >
                {editLink.linkText}
              </a>
            </div>
          ) : null}

          {footerLinks.map((link) => {
            const LinkIcon = link.icon
            return (
              <div
                key={link.url}
                className="flex items-center text-zinc-600 dark:text-zinc-400 font-medium"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                {link.linkHeader}
                <a
                  target="_blank"
                  href={link.url}
                  className="ml-1 flex text-zinc-600 hover:text-zinc-800 dark:text-zinc-100 dark:hover:text-zinc-300"
                  rel="noreferrer"
                >
                  {link.linkText}
                </a>
              </div>
            )
          })}
        </div>

        <div className="mt-4 grid sm:mt-0">
          <NetlifyBadge />
        </div>
      </div>
    </footer>
  )
}
