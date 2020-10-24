<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="10" lg="9" xl="8">
      <v-alert color="blue-grey" text>
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
        <h2 class="title mt-3">Latest Updates</h2>
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
  data() {
    return {
      title: 'Javascript Cheatsheet',
      description: `Anyone can forget how to Match whitespaces with a regex, remove an element from an Array or do a For Loop. This basic cheat sheet, mostly based on the lessons on freeCodeCamp, tries to provide a basic reference for beginner and advanced developers and lower the entry barrier for newcomers.`,
    }
  },
  computed: {
    ...mapGetters('cheatsheet', ['cheatsheet']),
  },
  created() {
    this.loadCheatsheet()
  },
  methods: {
    ...mapActions('cheatsheet', ['loadCheatsheet']),
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.description,
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.title,
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: this.description,
          },
          // Twitter Card
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: this.title,
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: this.description,
          },
        ],
      }
    },
  },
}
</script>

<style scoped></style>
