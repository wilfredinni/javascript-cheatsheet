<template>
  <div>
    <!-- form -->
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
        <v-btn block color="cyan darken-1" depressed dark @click="generate">
          Generar
        </v-btn>
      </v-col>
    </v-row>

    <!-- confirm dialog -->
    <v-dialog v-model="confirmDialog" width="500">
      <v-card>
        <v-card-title class="headline white--text red lighten-1">
          ¿Estás seguro?
        </v-card-title>

        <v-card-text class="pt-5">
          Se eliminarán los todos los resultados y se generaran nuevos. Esta
          acción no se puede deshacer.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="confirmDialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="cyan darken-1"
            dark
            depressed
            @click=";(confirmDialog = false), getRandomNumber()"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- reset dialog -->
    <v-dialog v-model="resetDialog" width="500">
      <v-card>
        <v-card-title class="headline white--text red lighten-1">
          ¿Estás seguro?
        </v-card-title>

        <v-card-text class="pt-5">
          Se eliminarán los todos los resultados. Esta acción no se puede
          deshacer.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="resetDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="cyan darken-1" dark depressed @click="resetState">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- results -->
    <v-fade-transition>
      <v-row align="center" justify="center">
        <v-col v-if="results.length > 0" cols="12">
          <v-chip
            v-for="n in sortedResults"
            :key="n"
            :color="getResultColor(n)"
            label
            dark
            class="ma-2 font-weight-medium"
            :class="getNumberPadding(n)"
            @click="workDone(n)"
          >
            {{ n }}
          </v-chip>

          <v-btn
            color="error"
            dark
            absolute
            icon
            x-large
            right
            bottom
            @click="resetDialog = true"
          >
            <v-icon>mdi-delete-forever</v-icon>
          </v-btn>
        </v-col>

        <v-col v-else cols="12" class="mt-16">
          <v-img height="100%" src="/analytics.svg"></v-img>
        </v-col>
      </v-row>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDialog: false,
      resetDialog: false,
      total: null,
      randomNumbers: null,
      results: [],
      done: [],
    }
  },
  computed: {
    sortedResults() {
      const sorted = this.results.slice()
      return sorted.sort(function (a, b) {
        return a - b
      })
    },
  },
  methods: {
    generate() {
      if (this.results.length > 0) this.confirmDialog = true
      else this.getRandomNumber()
    },
    getRandomNumber() {
      this.results = []
      this.done = []
      for (let step = 0; step < this.randomNumbers; step++) {
        this.generateNumber()
      }
    },
    generateNumber() {
      const randomNum = Math.random() * (this.total - 1) + 1
      const randomNumber = Math.round(randomNum)
      if (this.results.includes(randomNumber)) this.generateNumber()
      else this.results.push(randomNumber)
    },
    workDone(n) {
      if (this.done.includes(n)) {
        const index = this.done.indexOf(n)
        if (index > -1) this.done.splice(index, 1)
      } else {
        this.done.push(n)
      }
    },
    getNumberPadding(n) {
      if (n < 10) return 'pa-5'
      return 'px-4 py-5'
    },
    getResultColor(n) {
      if (this.done.includes(n)) return 'red'
      return 'cyan lighten-3'
    },
    resetState() {
      this.resetDialog = false
      this.results = []
      this.done = []
      this.total = null
      this.randomNumbers = null
    },
  },
}
</script>

<style></style>
