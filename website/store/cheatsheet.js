export const state = () => ({
  cheatsheet: '',
})

export const getters = {
  cheatsheet: (state) => state.cheatsheet,
}

export const actions = {
  async loadCheatsheet({ commit, state }) {
    const cheatsheet = await this.$content('cheatsheet').fetch()

    commit('setCheatsheet', cheatsheet)
  },
}

export const mutations = {
  setCheatsheet: (state, cheatsheet) => (state.cheatsheet = cheatsheet),
}
