import { LocalStorage } from "quasar"

const state = {
  user: null
}

const mutations = {
  setUser(state, payload) {
    console.log("payload", payload)
    state.user = payload
    LocalStorage.set("user", payload)
  },

  LOGOUT(state) {
    state.user = null
    LocalStorage.clear()
  }
}

const getters = {
  getUser: (state) => state.user
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
