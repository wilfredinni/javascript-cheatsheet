// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  modules: ['@vueuse/nuxt', 'nuxt-icon', '@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: ''
  }
})
