<template>
  <div
    class="my-8 flex rounded-2xl bg-amber-50 p-6 dark:bg-zinc-800/60 dark:ring-1 dark:ring-zinc-300/10"
  >
    <warning-icon class="hidden sm:flex" />
    <div class="flex-auto sm:ml-4">
      <slot />
    </div>
  </div>
</template>
