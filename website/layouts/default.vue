<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app width="320">
      <v-expansion-panels
        v-if="cheatsheet.toc"
        accordion
        flat
        active-class="primary--text"
      >
        <v-expansion-panel v-for="link of toc" :key="link.id">
          <!-- header -->
          <v-expansion-panel-header expand-icon="mdi-menu-down" class="pb-0">
            <div>
              <v-icon class="mr-2" v-text="linkIcon(link)" />
              {{ link.text }}
            </div>
          </v-expansion-panel-header>

          <!-- index -->
          <v-expansion-panel-content>
            <v-list dense class="pb-0">
              <v-list-item
                v-for="item in link.links"
                :key="item.id"
                :to="`#${item.id}`"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon
                    small
                    color="yellow darken-3"
                    v-text="'mdi-code-tags'"
                  />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <v-app-bar color="transparent" flat clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="'Javascript Cheatsheet'" />
      <v-spacer />
      <v-btn color="grey darken-4" icon>
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

export default {
  data() {
    return {
      drawer: true,
      icons: [
        { id: 'comments', icon: 'mdi-comment-text-outline' },
        { id: 'data-types', icon: 'mdi-format-list-bulleted-type' },
        { id: 'variables', icon: 'mdi-package-variant' },
        { id: 'strings', icon: 'mdi-format-letter-case' },
        { id: 'arrays', icon: 'mdi-contain' },
        { id: 'array-methods', icon: 'mdi-contain' },
        { id: 'javascript-objects', icon: 'mdi-code-json' },
        { id: 'booleans', icon: 'mdi-toggle-switch-outline' },
        { id: 'if-else-statements', icon: 'mdi-swap-horizontal' },
        { id: 'comparison-operators', icon: 'mdi-not-equal-variant' },
        { id: 'while-loops', icon: 'mdi-sync' },
        { id: 'for-loops', icon: 'mdi-refresh' },
        { id: 'functions', icon: 'mdi-function-variant' },
        { id: 'regular-expressions', icon: 'mdi-regex' },
        { id: 'object-oriented', icon: 'mdi-code-braces' },
        { id: 'es6-object-oriented', icon: 'mdi-code-braces' },
        { id: 'es6-import-and-export', icon: 'mdi-swap-vertical' },
        { id: 'asyncawait', icon: 'mdi-monitor-multiple' },
      ],
    }
  },
  computed: {
    ...mapGetters('cheatsheet', ['cheatsheet']),
    toc() {
      const toc = []
      this.cheatsheet.toc.forEach((link, index) => {
        if (link.depth === 2) {
          link.links = []
          toc.push(link)
        } else {
          toc[toc.length - 1].links.push(link)
        }
      })
      return toc
    },
  },

  methods: {
    linkIcon(link) {
      const icon = this.icons.find((icon) => link.id === icon.id)
      if (icon) return icon.icon
      return 'mdi-nodejs'
    },
  },
}
</script>

<style lang="scss">
.nuxt-content h2 {
  margin-top: 1.5rem;
  font-size: 2.15rem;
  font-weight: 400;
  letter-spacing: 0.0073529412em;
}
.nuxt-content h3 {
  font-size: 1.5rem;
  font-weight: 500;
  padding-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.nuxt-content pre {
  margin-bottom: 1.5rem;
}
.nuxt-content table {
  margin-bottom: 1.5rem;
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
