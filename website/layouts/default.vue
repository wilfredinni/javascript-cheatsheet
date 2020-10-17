<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-pulse</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'item.title'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
export default {
  data() {
    return {
      drawer: true,
      items: [],
    }
  },
}
</script>
