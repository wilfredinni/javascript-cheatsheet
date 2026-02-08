import { contributors } from '../../contributors/contributors'

export default function Contributors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
      {contributors.map(({ name, avatar, repository }) => (
        <a
          key={name}
          href={repository}
          rel="noopener noreferrer"
          aria-label={`${name} on GitHub`}
        >
          <img
            className="h-12 w-12 rounded-full"
            src={avatar}
            width={50}
            height={50}
            alt={`${name}'s avatar`}
          />
        </a>
      ))}
    </div>
  )
}
