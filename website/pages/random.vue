<template>
  <div>
    <!-- <h2>Random number generator</h2> -->
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="total"
          filled
          dense
          type="number"
          label="Total muestra"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="randomNumbers"
          filled
          dense
          type="number"
          label="Resultados"
        />
      </v-col>

      <v-col cols="12" class="pt-0">
        <v-btn
          block
          color="cyan darken-1"
          depressed
          dark
          @click="getRandomNumber(randomNumbers)"
        >
          Generar
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="fill-height" align="center" justify="center">
      <v-col v-if="results.length > 0" cols="12">
        <v-chip
          v-for="n in sortedResults"
          :key="n"
          color="cyan lighten-3"
          label
          class="ma-2 font-weight-medium"
          :class="getNumberPadding(n)"
        >
          {{ n }}
        </v-chip>
      </v-col>

      <v-col v-else cols="12" class="mt-16">
        <v-img height="100%" src="/analytics.svg"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: null,
      randomNumbers: null,
      results: [].sort(),
    }
  },
  computed: {
    sortedResults() {
      const results = this.results.slice()
      return results.sort(function (a, b) {
        return a - b
      })
    },
  },
  methods: {
    getRandomNumber(results) {
      this.results = []
      for (let step = 0; step < results; step++) {
        this.generateNumber()
      }
    },
    generateNumber() {
      const randomNum = Math.random() * (this.total - 1) + 1
      const randomNumber = Math.round(randomNum)
      if (this.results.includes(randomNumber)) this.generateNumber()
      else this.results.push(randomNumber)
    },
    getNumberPadding(n) {
      if (n < 10) return 'pa-5'
      return 'px-4 py-5'
    },
  },
}
</script>

<style></style>
