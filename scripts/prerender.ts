import path from 'path'
import Prerenderer from '@prerenderer/prerenderer'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'
import routes from '../src/content/routes.json'

async function prerender() {
  const staticDir = path.resolve(process.cwd(), 'dist')

  const prerenderer = new Prerenderer({
    staticDir,
    routes,
    renderer: new PuppeteerRenderer({
      renderAfterDocumentEvent: 'prerender-ready',
    }),
  })

  await prerenderer.initialize()
  await prerenderer.renderRoutes(routes)
  await prerenderer.destroy()
}

prerender().catch((error) => {
  console.error(error)
  process.exit(1)
})
