<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <nuxt-content :document="cheatsheet" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cheatsheet', ['cheatsheet']),
  },
  created() {
    this.loadCheatsheet()
  },
  methods: {
    ...mapActions('cheatsheet', ['loadCheatsheet']),
  },
}
</script>

<style scoped>
:target:before {
  content: '' !important;
  display: block !important;
  height: 60px !important;
  margin: -60px 0 0 !important;
}
</style>
