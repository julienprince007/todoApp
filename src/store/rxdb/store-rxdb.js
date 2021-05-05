import { LocalStorage } from "quasar";

const state = {
  rxdbInfos: {
    dbName: "",
    collectionsName: [],
  },
};

const mutations = {
  SET_DBNAME(state) {
    const dbName = LocalStorage.getItem("dbName");
    const collectionsName = LocalStorage.getItem("collectionsName");
    state.rxdbInfos.dbName = dbName;
    state.rxdbInfos.collectionsName = collectionsName;
  },
  LOGOUT(state) {
    state.rxdbInfos = {
      dbName: "",
      collectionName: [],
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
