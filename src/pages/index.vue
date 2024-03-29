<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
// import ReferenceIcon from '~/components/icons/ReferenceIcon.vue'
import PluginIcon from '~/components/icons/PluginIcon.vue'
import ArrowIcon from '~/components/icons/ArrowIcon.vue'
import GridIcon from '~/components/icons/GridIcon.vue'

const cardLinks = [
  {
    path: 'https://github.com/wilfredinni/javascript-cheatsheet',
    name: 'View on GitHub',
    description: `Drop a star on GitHub if you find this project useful.`,
    icon: ArrowIcon,
    external: true,
  },
  {
    path: '/contributing',
    name: 'Contribute',
    description: `Get to know how easy it is to contribute to the Javascript Cheatsheet.`,
    icon: PluginIcon,
  },
  // {
  //   path: '/blog',
  //   name: 'Blog',
  //   description: `Read detailed articles about Python and it's ecosystem.`,
  //   icon: ReferenceIcon,
  // },
  {
    path: '/changelog',
    name: 'Changelog',
    description: `See what is new, what got fixed, and what is coming.`,
    icon: GridIcon,
  },
]

const { description } = useMeta()
const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greater('sm')
</script>

<template>
  <article>
    <prose>
      <div class="flex justify-center sm:hidden px-32">
        <img
          class="rounded"
          src="/icons/javascript_logo.png"
          alt="javascript-cheatsheet"
          height="10"
          width="10"
        />
      </div>

      <base-title
        v-if="smAndLarger"
        id="javascript-cheatsheet"
        title="Javascript Cheatsheet"
        :description="description"
      >
        <h1>Javascript Cheatsheet</h1>
      </base-title>
      <h1
        v-else
        class="mb-2 bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-center font-display text-4xl font-medium tracking-tight text-transparent dark:from-amber-400 dark:via-teal-300 dark:to-amber-300"
      >
        Javascript Cheatsheet
      </h1>
    </prose>

    <prose class="hidden sm:block">
      <p>
        Anyone can forget how to
        <router-link
          to="/cheatsheet/regular-expressions#making-your-own-character-classes"
        >
          make character classes
        </router-link>
        for a regex,
        <router-link
          to="/cheatsheet/lists-and-tuples#getting-sublists-with-slices"
        >
          slice a list
        </router-link>
        or do a
        <router-link to="/cheatsheet/control-flow#for-loop">
          for loop
        </router-link>
        . This Javascript Cheatsheet tries to provide basic reference for
        beginner and advanced developers, lower the entry barrier for newcomers
        and help veterans refresh the old tricks.
      </p>
    </prose>

    <div className="not-prose my-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <base-link-card
        v-for="link in cardLinks"
        v-once
        :key="link.path"
        :title="link.name"
        :description="link.description"
        :path="link.path"
        :icon="link.icon"
        :is-external="link.external"
      />
    </div>

    <div class="mt-10">
      <prose>
        <h2 id="contributors" class="text-center sm:text-start">
          Contributors
        </h2>
      </prose>
      <contributors class="pb-3 pt-10" />
    </div>
  </article>
</template>
