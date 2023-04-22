<script setup lang="ts">
const currentTheme = computed(() => useColorMode().preference)
const setColorTheme = (theme: 'light' | 'dark') => {
  useColorMode().preference = theme
}
</script>

<template>
  <ClientOnly>
    <button @click="setColorTheme(useColorMode().preference === 'light' ? 'dark' : 'light')">
      <Icon :name="currentTheme === 'light' ? 'heroicons:sun-solid' : 'heroicons:moon-solid'" />
    </button>
    <template #fallback>
      <Icon name="heroicons:computer-desktop-solid" />
    </template>
  </ClientOnly>
</template>
