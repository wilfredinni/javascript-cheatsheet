import type { Ref } from 'vue'
import { breakpointsTailwind } from '@vueuse/core'

export function useToc() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const lgAndLarger = breakpoints.greater('lg')

  interface Toc {
    header: string
    id: string
  }

  const theToc: Ref<Toc[]> = ref([])
  const createToc = () => {
    const headings = document.querySelectorAll('article h2')
    theToc.value = Array.from(headings).map((item) => {
      return { header: item.innerText, id: item.id }
    })
  }

  const currentSection = ref('')
  let observer: IntersectionObserver | null = null
  let tocMutationObserver: MutationObserver | null = null
  let refreshTimer: number | null = null

  const clearRefreshTimer = () => {
    if (refreshTimer !== null) {
      window.clearTimeout(refreshTimer)
      refreshTimer = null
    }
  }

  const getObserver = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            currentSection.value = entry.target.getAttribute('id') as string
          }
        })
      },
      {
        rootMargin: '0px 0px -50% 0px',
      },
    )
    document.querySelectorAll('article h2').forEach((section) => {
      observer?.observe(section)
    })
  }

  const initToc = () => {
    if (!lgAndLarger.value) {
      theToc.value = []
      currentSection.value = ''
      if (observer) {
        observer.disconnect()
        observer = null
      }
      if (tocMutationObserver) {
        tocMutationObserver.disconnect()
        tocMutationObserver = null
      }
      clearRefreshTimer()
      return
    }

    createToc()
    getObserver()
  }

  const route = useRoute()

  const observeArticleChanges = () => {
    if (tocMutationObserver) {
      tocMutationObserver.disconnect()
      tocMutationObserver = null
    }

    const article = document.querySelector('article')
    if (!article) {
      return
    }

    tocMutationObserver = new MutationObserver(() => {
      clearRefreshTimer()
      refreshTimer = window.setTimeout(() => {
        initToc()
      }, 0)
    })

    tocMutationObserver.observe(article, {
      childList: true,
      subtree: true,
    })
  }

  watch(
    () => route.fullPath,
    () => {
      nextTick(() => {
        initToc()
        observeArticleChanges()
      })
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    if (tocMutationObserver) {
      tocMutationObserver.disconnect()
      tocMutationObserver = null
    }
    clearRefreshTimer()
  })

  return { theToc, currentSection }
}
