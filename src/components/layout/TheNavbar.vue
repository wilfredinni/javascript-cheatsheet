<script setup lang="ts">
const navigation = useNavigationStore()
const route = useRoute()
</script>

<template>
  <nav
    class="sticky top-0 z-40 w-full flex-none border-b border-zinc-900/10 bg-white/90 backdrop-blur dark:border-zinc-50/[0.06] dark:bg-transparent lg:z-50"
  >
    <div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-12">
      <div class="relative flex h-14 justify-between">
        <the-sidebar-mobile />

        <!-- menu -->
        <div class="ml-14 flex flex-1 items-center space-x-6 lg:ml-0">
          <div class="mr-3 flex flex-shrink-0 items-center">
            <router-link to="/">
              <img
                class="h-6 w-auto rounded"
                src="/icons/javascript_logo.png"
                alt="javascript-cheatsheet"
                height="10"
                width="10"
              />
            </router-link>
          </div>

          <algolia-doc-search />
        </div>

        <!-- actions -->
        <div
          class="absolute inset-y-0 right-0 flex items-center space-x-5 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div
            class="hidden border-r border-zinc-200 pr-6 dark:border-zinc-800 sm:ml-6 sm:space-x-6 lg:flex"
          >
            <template
              v-for="item in navigation.navbarNavigation"
              :key="item.name"
            >
              <div v-if="navigation.navbarNavigation" v-once>
                <router-link
                  v-if="item.internal"
                  :to="item.path"
                  class="inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300"
                  :class="
                    route.path === item.path
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-zinc-700 hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-400'
                  "
                >
                  {{ item.name }}
                </router-link>

                <a
                  v-else
                  v-once
                  :href="item.path"
                  target="_blank"
                  class="inline-flex items-center px-1 pt-1 text-sm font-medium text-zinc-700 transition duration-300 hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-400"
                >
                  {{ item.name }}
                </a>
              </div>
            </template>

            <a
              href="https://github.com/sponsors/wilfredinni"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-300 hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-400"
            >
              Sponsor
              <span class="ml-1 text-red-500"> ❤</span>
            </a>

            <base-reader-mode />
          </div>

          <base-theme-toggle />
          <a
            target="_blank"
            href="https://github.com/wilfredinni/javascript-cheatsheet"
            rel="noreferrer"
          >
            <github-icon />
            <span class="sr-only">Javascript Cheatsheet repository</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
