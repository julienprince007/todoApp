import { LocalStorage } from "quasar";

const state = {
  rxdbInfos: {
    dbName: "",
    collectionsName: [],
  },
  user: null,
};

const mutations = {
  SET_DBNAME(state) {
    const dbName = LocalStorage.getItem("dbName");
    const collectionsName = LocalStorage.getItem("collectionsName");
    state.rxdbInfos.dbName = dbName;
    state.rxdbInfos.collectionsName = collectionsName;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  LOGOUT(state) {
    state.rxdbInfos = {
      dbName: "",
      collectionName: [],
    };
    state.user = null;
    LocalStorage.clear();
  },
};

const getters = {
  getInfos: (state) => state.rxdbInfos,
  getUser: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
