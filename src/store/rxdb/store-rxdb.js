import { LocalStorage } from "quasar";

const state = {
  rxdbInfos: {
    dbName: "",
    collectionName: null,
  },
};

const mutations = {
  SET_DBNAME(state, name) {
    state.rxdbInfos.dbName = name;
    LocalStorage.set("dbName", name);
  },
  SET_COLLECTIONNAME(state, name) {
    state.rxdbInfos.collectionName = name;
    LocalStorage.set("collectionName", name);
  },
  LOGOUT(state) {
    state.rxdbInfos = {
      dbName: "",
      collectionName: "",
    };
    LocalStorage.clear();
  },
};

const getters = {
  getInfos: (state) => state.rxdbInfos,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
