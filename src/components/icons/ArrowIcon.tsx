type IconProps = {
  className?: string
}

export default function ArrowIcon({ className = '' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={`h-8 w-8 [--icon-foreground:theme(colors.zinc.900)] [--icon-background:theme(colors.white)] ${className}`}
    >
      <defs>
        <radialGradient
          id=":r9:-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 12 3)"
        >
          <stop stopColor="#fbbf24"></stop>
          <stop stopColor="#fb923c" offset=".527"></stop>
          <stop stopColor="#f87171" offset="1"></stop>
        </radialGradient>
        <radialGradient
          id=":r9:-gradient-dark"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 21 -21 0 16 7)"
        >
          <stop stopColor="#fbbf24"></stop>
          <stop stopColor="#fb923c" offset=".527"></stop>
          <stop stopColor="#f87171" offset="1"></stop>
        </radialGradient>
      </defs>
      <g className="dark:hidden">
        <circle cx="12" cy="12" r="12" fill="url(#:r9:-gradient)"></circle>
        <path
          d="m8 8 9 21 2-10 10-2L8 8Z"
          fillOpacity="0.5"
          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
      <g className="hidden dark:inline">
        <path
          d="m4 4 10.286 24 2.285-11.429L28 14.286 4 4Z"
          fill="url(#:r9:-gradient-dark)"
          stroke="url(#:r9:-gradient-dark)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  )
}
