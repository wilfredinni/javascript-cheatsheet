<script setup lang="ts">
interface Navigation {
  name: string
  path: string
  updated?: boolean
  [key: string]: any
}

defineProps<{
  sectionName: string
  navigation: Array<Navigation>
}>()
</script>

<template>
  <h3 class="font-display text-base font-medium text-zinc-900 dark:text-white">
    {{ sectionName }}
  </h3>
  <ul
    class="mb-6 mt-2 space-y-2 border-l-2 border-zinc-100 text-base dark:border-zinc-800 lg:mt-4 lg:space-y-1.5 lg:border-zinc-200 lg:text-sm"
  >
    <li v-for="item in navigation" :key="item.name" class="relative">
      <router-link
        :to="item.path"
        class="-ml-px block border-l border-transparent pl-4 transition duration-150"
        :class="
          $route.path === item.path
            ? 'border-current font-semibold text-amber-500 dark:text-amber-400'
            : 'text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-300'
        "
      >
        {{ item.name }}
        <new-badge v-if="item.updated" class="ml-1" />
      </router-link>
    </li>
  </ul>
</template>
