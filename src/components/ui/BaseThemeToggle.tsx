import { Switch } from '@headlessui/react'
import { useTheme } from '../../context/theme'

export default function BaseThemeToggle() {
  const { isDark, setDark } = useTheme()

  return (
    <Switch
      checked={isDark}
      onChange={setDark}
      className={`${
        isDark
          ? 'border-zinc-700 bg-zinc-800 text-zinc-100'
          : 'border-zinc-200 bg-white/80 text-zinc-600'
      } inline-flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 ease-in-out focus:outline-none`}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </Switch>
  )
}
