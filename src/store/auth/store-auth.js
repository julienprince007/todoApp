import { apolloClient } from "boot/apollo";
import { LocalStorage } from "quasar";
import { Notify } from "quasar";
import { LOGIN } from "./GQL/login";

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
  connectUser({ commit }, payload) {
    commit("SET_LOADING");
    const email = payload.email;
    const password = payload.password;
    const that = this;
    apolloClient
      .mutate({
        mutation: LOGIN,
        variables: { email: email, password: password },
      })
      .then((res) => {
        commit("SET_TOKEN", res.data.login.token);
        LocalStorage.set("token", state.token);
        commit("SET_LOADING_END");
        that.$router.push("/");
      })
      .catch((error) => {
        const message =
          error.graphQLErrors[0].extensions.internal.response.body.error;
        Notify.create({
          type: "negative",
          position: "top",
          message: message + ".Verifier votre identifiant!",
        });
        commit("SET_LOADING_END");
      });
  },

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
