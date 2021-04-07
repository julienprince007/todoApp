import { LocalStorage } from "quasar";

const state = {
  token: null,
  loading: false,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
    LocalStorage.set("token", state.token);
    this.$router.push("/");
  },
  SET_CLEAR(state) {
    state.token = null;
    LocalStorage.clear();
  },
  SET_LOADING(state) {
    state.loading = true;
  },
  SET_LOADING_END(state) {
    state.loading = false;
  },
};

const actions = {
  logoutUser({ commit }) {
    const that = this;
    commit("SET_CLEAR");
    that.$router.push("/login");
  },
};

const getters = {
  isSignedIn: (state) => state.token,
  loading: (state) => state.loading,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
