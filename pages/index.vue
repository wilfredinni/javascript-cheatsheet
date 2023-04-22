<script setup lang="ts">
useHead({
  title: 'Nuxt starter template - Vinilo',
  meta: [{ name: 'description', content: 'My amazing site.' }]
})
</script>

<template>
  <div class="text-center">
    <dark-mode />
    <h1 class="mb-5 text-4xl font-bold text-blue-500">Home</h1>
    <div>
      <p v-for="i in 70" :key="i">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
        incidunt magnam. Reprehenderit eveniet corrupti, quos vero accusantium
        quasi vel aperiam in atque recusandae nostrum accusamus excepturi ab
        voluptate dolorem! Neque?
      </p>
    </div>
  </div>
</template>
