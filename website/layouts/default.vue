<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app width="320">
      <Sidebar :cheatsheet-toc="cheatsheet.toc" />
    </v-navigation-drawer>

    <v-app-bar :color="appBarStyle" flat clipped-left clipped-right fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        class="home-link"
        @click="toHome()"
        v-text="'JS Cheatsheet'"
      />
      <v-spacer />
      <SearchBar class="d-none d-md-block" :cheatsheet-toc="cheatsheet.toc" />
      <v-spacer />
      <!-- python cheatsheet -->
      <v-btn
        class="mr-1 ml-9"
        :color="iconColor"
        href="https://www.pythoncheatsheet.org/"
        icon
      >
        <v-icon v-text="'mdi-language-python'" />
      </v-btn>

      <!-- dark/light -->
      <v-btn class="mr-1" :color="iconColor" icon @click="darkThemeChanger()">
        <v-icon v-text="'mdi-brightness-6'" />
      </v-btn>

      <!-- github -->
      <v-btn
        class="mr-1"
        :color="iconColor"
        href="https://github.com/wilfredinni/javascript-cheatsheet"
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
      darkTheme: false,
    }
  },
  computed: {
    ...mapGetters('cheatsheet', ['cheatsheet']),
    appBarStyle() {
      if (!this.$vuetify.theme.dark) return 'yellow darken-2'
      return ''
    },
    iconColor() {
      if (!this.$vuetify.theme.dark) return 'grey darken-3'
      return ''
    },
    rightDrawerColor() {
      if (!this.$vuetify.theme.dark) return ''
      return '#1E1E1E'
    },
  },
  methods: {
    toHome() {
      this.$router.push('/#')
    },
    darkThemeChanger() {
      this.darkTheme = !this.darkTheme
      this.$vuetify.theme.dark = this.darkTheme
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
.v-application code {
  background-color: transparent;
}
</style>
