<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app width="320">
      <!-- <pre>{{ toc }}</pre> -->

      <v-expansion-panels accordion flat active-class="primary--text">
        <v-expansion-panel v-for="link of toc" :key="link.id">
          <!-- header -->
          <v-expansion-panel-header expand-icon="mdi-menu-down" class="pb-0">
            <div>
              <v-icon class="mr-2">mdi-comment-text-outline</v-icon>
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
                  <v-icon small color="yellow darken-3">
                    mdi-comment-text-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    <v-app-bar color="yellow darken-1" clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="'Javascript Cheatsheet'" />
      <v-spacer />
      <v-btn color="grey darken-4" icon>
        <v-icon>mdi-github</v-icon>
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
      items: [],
    }
  },
  computed: {
    ...mapGetters('cheatsheet', ['cheatsheet']),
    toc() {
      const toc = []
      if (this.cheatsheet) {
        this.cheatsheet.toc.forEach((link, index) => {
          if (link.depth === 2) {
            link.links = []
            toc.push(link)
          } else if (link.depth === 3) {
            toc[toc.length - 1].links.push(link)
          }
        })
      }
      return toc
    },
  },
}
</script>
