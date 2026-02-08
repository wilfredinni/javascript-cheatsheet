import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { cheatsheetNavigation, mainNavigation } from '../../content/navigation'
import SidebarNavigation from './TheSidebarNavigation'

export default function SidebarMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const { location } = useRouterState()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <div className="absolute inset-y-0 left-1.5 flex items-center lg:hidden">
        <button
          type="button"
          className="relative"
          onClick={() => setIsOpen(true)}
        >
          <span className="sr-only">Open navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 stroke-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <Transition show={isOpen}>
        <Dialog
          className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-zinc-900/50 pr-10 backdrop-blur lg:hidden"
          onClose={setIsOpen}
        >
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 dark:bg-zinc-900 sm:px-6">
              <DialogTitle className="sr-only">Navigation</DialogTitle>
              <div className="flex items-center">
                <button type="button" onClick={() => setIsOpen(false)}>
                  <span className="sr-only">Close navigation</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="mt-10">
                <SidebarNavigation
                  navigation={mainNavigation}
                  sectionName="Introduction"
                />
                <SidebarNavigation
                  navigation={cheatsheetNavigation}
                  sectionName="Cheatsheet"
                />
              </nav>
            </DialogPanel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
