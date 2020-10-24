<template>
  <v-expansion-panels accordion flat active-class="primary--text">
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
              <v-icon small color="yellow darken-3" v-text="'mdi-code-tags'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'Sidebar',
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
    toc() {
      const toc = []
      if (this.cheatsheetToc) {
        let parent = ''
        this.cheatsheetToc.forEach((link, index) => {
          if (link.depth === 2) {
            link.links = []
            parent = link.text
            toc.push(link)
          } else {
            link.parent = parent
            toc[toc.length - 1].links.push(link)
          }
        })
      }
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

<style></style>
