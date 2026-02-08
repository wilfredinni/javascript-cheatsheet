import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

type BaseTitleProps = {
  title: string
  description: string
  children: ReactNode
}

export default function BaseTitle({
  title,
  description,
  children,
}: BaseTitleProps) {
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported(Boolean(navigator.share))
  }, [])

  const startShare = () => {
    if (!navigator.share) return
    navigator.share({
      title,
      text: description,
      url: location.href,
    })
  }

  return (
    <div className="not-prose group mb-8 grid w-full grid-cols-12 content-center leading-[1.1111111]">
      <h1 className="doc-title col-span-11 text-[2.25em] font-medium text-zinc-900 dark:text-white">
        {children}
      </h1>
      <div className="flex w-full justify-end text-zinc-400 opacity-0 transition duration-200 group-hover:opacity-100">
        {isSupported ? (
          <button
            className="transition duration-200 hover:text-amber-500"
            onClick={startShare}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Share</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}
