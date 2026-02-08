import BaseThemeToggle from '../ui/BaseThemeToggle'
import { useReader } from '../../context/reader'

export default function NavbarReader() {
  const reader = useReader()

  const fontIndex = reader.fontSizes.findIndex(
    (item) => item === reader.fontSize,
  )
  const hasNext = reader.fontSizes.length - 1 > fontIndex
  const hasPrevious = fontIndex !== 0

  const increaseFont = () => {
    if (hasNext) {
      reader.setFontSize(reader.fontSizes[fontIndex + 1])
    }
  }

  const decreaseFont = () => {
    if (hasPrevious) {
      reader.setFontSize(reader.fontSizes[fontIndex - 1])
    }
  }

  return (
    <nav className="sticky top-0 z-40 w-full flex-none bg-transparent backdrop-blur dark:border-zinc-50/6 lg:z-50 lg:border-b lg:border-zinc-900/10">
      <div className="mx-auto max-w-8xl px-4 xl:px-10">
        <div className="relative flex h-14 justify-between">
          <div className="flex flex-1 items-center justify-end space-x-5 sm:items-center">
            <div className="ml-6 space-x-6 border-r border-zinc-200 dark:border-zinc-800">
              <button
                className={`text-zinc-400 transition duration-300 dark:text-zinc-500 ${
                  hasNext
                    ? 'hover:text-amber-500 dark:hover:text-amber-500'
                    : ''
                }`}
                onClick={increaseFont}
              >
                A+
              </button>
              <button
                className={`text-zinc-400 transition duration-300 dark:text-zinc-500 ${
                  hasPrevious
                    ? 'hover:text-amber-500 dark:hover:text-amber-500'
                    : ''
                }`}
                onClick={decreaseFont}
              >
                A-
              </button>
              <span className="text-white"> </span>
            </div>

            <BaseThemeToggle />

            <button
              className="rounded text-zinc-400 transition duration-300 hover:text-amber-500 dark:hover:bg-transparent"
              onClick={reader.toggle}
            >
              <span className="sr-only">close reader mode</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
