import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import RootLayout from './components/layout/RootLayout'
import IndexPage from './pages/IndexPage'
import MarkdownPage from './pages/MarkdownPage'
import CheatsheetPage from './pages/CheatsheetPage'
import NotFoundPage from './pages/NotFoundPage'
import PlaygroundPage from './pages/PlaygroundPage'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
})

const contributingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contributing',
  component: () => <MarkdownPage pageSlug="contributing" />,
})

const changelogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/changelog',
  component: () => <MarkdownPage pageSlug="changelog" />,
})

const cheatsheetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cheatsheet/$slug',
  component: CheatsheetPage,
})

const playgroundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/playground',
  component: PlaygroundPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  contributingRoute,
  changelogRoute,
  cheatsheetRoute,
  playgroundRoute,
])

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
