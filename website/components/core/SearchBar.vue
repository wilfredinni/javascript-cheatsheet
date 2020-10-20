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
            placeholder="Type to start searching"
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
            <v-list-item style="background: #e5e5e5">
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
                <v-list-item-subtitle>{{ result.text }}</v-list-item-subtitle>
              </v-list-item-content>
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
    toc: {
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
        const results = this.toc.filter((item) =>
          item.text.toLowerCase().includes(this.searchText.toLowerCase())
        )
        return results
      }
      return []
    },
  },
  methods: {},
}
</script>

<style></style>
