<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app width="320">
      <Sidebar :toc="toc" />
    </v-navigation-drawer>

    <v-app-bar color="yellow darken-2" flat clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        class="home-link"
        @click="toHome()"
        v-text="'Javascript Cheatsheet'"
      />
      <v-spacer />
      <SearchBar :toc="cheatsheet.toc" />
      <v-spacer />
      <v-btn
        color="grey darken-4"
        href="https://github.com/wilfredinni/javascript-cheatsheet"
        target="_blank"
        icon
      >
        <v-icon v-text="'mdi-github'" />
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '~/components/core/Sidebar.vue'
import SearchBar from '~/components/core/SearchBar.vue'

export default {
  components: { Sidebar, SearchBar },
  data() {
    return {
      drawer: true,
    }
  },
  computed: {
    ...mapGetters('cheatsheet', ['cheatsheet']),
    toc() {
      const toc = []
      if (this.cheatsheet.toc) {
        this.cheatsheet.toc.forEach((link, index) => {
          if (link.depth === 2) {
            link.links = []
            toc.push(link)
          } else {
            toc[toc.length - 1].links.push(link)
          }
        })
      }
      return toc
    },
  },

  methods: {
    toHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
.nuxt-content h2 {
  font-size: 2.25rem;
  font-weight: 400;
  letter-spacing: 0.0073529412em;
  margin-bottom: 0.5rem;
  margin-top: -70px; /* negative fixed header height */
  padding-top: 70px; /* fixed header height*/
}
.nuxt-content h3 {
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  padding-top: 70px; /* fixed header height*/
  margin-top: -70px; /* negative fixed header height */
}
.nuxt-content pre {
  margin-bottom: 1.5rem;
}
.nuxt-content table {
  margin-bottom: 1.5rem;
}
.home-link {
  cursor: pointer;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
