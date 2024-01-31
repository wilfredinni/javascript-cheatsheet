<script setup lang="ts">
import EditIcon from '~/components/icons/EditIcon.vue'
import QuestionIcon from '~/components/icons/QuestionIcon.vue'
import BugIcon from '~/components/icons/BugIcon.vue'

const props = defineProps<{
  repository?: string
}>()

const route = useRoute()

const EditLink = {
  linkHeader: 'Edit this page on',
  linkText: 'GitHub',
  url: `${props.repository}${route.path}.md`,
  icon: EditIcon,
}

const footerLinks = [
  {
    linkHeader: 'Do you have a question?',
    linkText: 'ask the community',
    url: 'https://github.com/wilfredinni/javascript-cheatsheet/discussions',
    icon: QuestionIcon,
  },
  {
    linkHeader: 'Do you see a bug?',
    linkText: 'open an issue on GitHub',
    url: 'https://github.com/wilfredinni/javascript-cheatsheet/issues',
    icon: BugIcon,
  },
]

const routesWithoutGithub = ['index', 'blog']
</script>

<template>
  <footer class="mt-5 border-t dark:border-t-zinc-800">
    <div class="justify-between pt-5 sm:flex">
      <div
        class="grid text-xs"
        :class="route.name !== 'index' ? 'space-y-1.5' : ''"
      >
        <div
          v-if="!routesWithoutGithub.includes(route.name as string)"
          class="flex items-center text-zinc-600 dark:text-zinc-400"
        >
          <component :is="EditLink.icon" class="mr-2 h-4 w-4" />
          {{ EditLink.linkHeader }}
          <a
            target="_blank"
            :href="`${repository}${$route.path}.md`"
            class="ml-1 flex text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-500"
          >
            {{ EditLink.linkText }}
          </a>
        </div>

        <div
          v-for="link in footerLinks"
          v-once
          :key="link.url"
          class="flex items-center text-zinc-600 dark:text-zinc-400"
        >
          <component :is="link.icon" class="mr-2 h-4 w-4" />
          {{ link.linkHeader }}
          <a
            target="_blank"
            :href="link.url"
            class="ml-1 flex text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-500"
          >
            {{ link.linkText }}
          </a>
        </div>
      </div>

      <div class="mt-4 grid sm:mt-0">
        <netlify-badge class="mx-auto" />
      </div>
    </div>
  </footer>
</template>
