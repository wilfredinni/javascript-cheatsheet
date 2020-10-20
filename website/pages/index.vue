<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-alert dense color="blue-grey" text>
        <h1 class="display-1 mb-3">Welcome to Javascript Cheatsheet ☕️</h1>
        <span
          >Anyone can forget how to Match
          <a href="#regular-expressions">whitespaces with a regex</a>,
          <a href="#remove-any-element-with-splice">
            remove an element from an Array
          </a>
          or do a
          <a href="#for-loop">For Loop</a>. This basic cheat sheet, mostly based
          on the lessons on freeCodeCamp, tries to provide a basic reference for
          beginner and advanced developers and lower the entry barrier for
          newcomers.</span
        >
        <h3 class="title mt-3">Latest Updates</h3>
        <ul>
          <li><a href="">Functional Programming</a></li>
          <li><a href="">ES6 classes</a></li>
          <li><a href="">ES6 Statics Methods</a></li>
        </ul>
      </v-alert>
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

<style scoped></style>
