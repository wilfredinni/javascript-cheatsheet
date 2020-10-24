<template>
  <div style="width: 600px">
    <div class="text-center">
      <v-menu v-model="searchMenu" offset-y tile>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="searchText"
            flat
            hide-details
            solo-inverted
            autocomplete="off"
            label="Type to start searching"
            clearable
            prepend-inner-icon="mdi-magnify"
            append-icon="mdi-menu-down"
            v-bind="attrs"
            v-on="on"
            @click:append="searchMenu = !searchMenu"
          />
        </template>
        <v-card tile max-height="600">
          <v-list outlined class="pa-0">
            <v-list-item :class="resultsCountBackground">
              <v-list-item-content>
                <v-list-item-subtitle>
                  {{ searchResults.length }} matching results
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-if="searchText" outlined tile class="pa-0">
            <v-list-item
              v-for="result in searchResults"
              :key="result.id"
              :to="`#${result.id}`"
              @click="searchText = result.text"
            >
              <v-list-item-content>
                <v-list-item-subtitle
                  v-if="result.depth === 2"
                  class="font-weight-medium"
                >
                  {{ result.text }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                  {{ result.text }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-subtitle
                  v-if="result.depth === 2"
                  class="font-weight-medium"
                >
                  <v-icon small color="warning">mdi-star</v-icon>
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else class="font-weight-medium">
                  {{ result.parent }}
                </v-list-item-subtitle>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    cheatsheetToc: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      searchText: '',
      searchMenu: false,
    }
  },
  computed: {
    searchResults() {
      if (this.searchText) {
        const results = this.cheatsheetToc.filter((item) =>
          `${item.text} ${item.parent}`
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        )
        return results
      }
      return []
    },
    resultsCountBackground() {
      if (!this.$vuetify.theme.dark) return 'light-background'
      return ''
    },
  },
  methods: {},
}
</script>

<style scoped>
.light-background {
  background: #e5e5e5;
}
</style>
