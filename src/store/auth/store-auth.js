import { api } from "boot/axios";
import { LocalStorage } from "quasar";
import { Notify } from "quasar";

const state = {
  token: null,
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
  },
};

const actions = {
  connectUser({ commit }, payload) {
    const that = this;
    api
      .post("users/sign_in", payload)
      .then(function (response) {
        commit("SET_TOKEN", response.data.token);
        LocalStorage.set("token", state.token);
        that.$router.push("/");
      })
      .catch(function (error) {
        Notify.create({
          type: "negative",
          position: "top",
          message: error.response.data.error + ".Verifier votre identifiant!",
        });
      });
  },

  logoutUser({ commit }) {
    const that = this;
    commit("SET_CLEAR");
    LocalStorage.clear();
    that.$router.push("/login");
  },
};

const getters = {
  isSignedIn: (state) => state.token,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
