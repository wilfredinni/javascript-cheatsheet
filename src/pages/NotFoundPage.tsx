import { Link } from '@tanstack/react-router'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-900 pb-12 pt-16">
      <Seo title="404 Not Found" description="Page not found." />
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <Link to="/" className="inline-flex">
            <span className="sr-only">Javascript Cheatsheet</span>
            <img
              className="h-12 w-auto rounded"
              src="/icons/javascript_logo.png"
              alt="javascript-cheatsheet"
            />
          </Link>
        </div>
        <div className="py-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">
              404 error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-200 sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-zinc-500">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="text-base font-medium text-amber-400 hover:text-amber-500"
              >
                Go back home<span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
