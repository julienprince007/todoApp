import { LocalStorage } from "quasar";
import { Notify } from "quasar";

export default async ({ store, router }) => {
  router.beforeEach((to, from, next) => {
    const dbName = LocalStorage.getItem("dbName");
    const collectionName = LocalStorage.getItem("collectionName");
    let dbInfos = store.getters["rxdb/getInfos"];
    if (
      dbInfos.dbName === "" &&
      dbInfos.collectionName === "" &&
      dbName === null &&
      collectionName === null &&
      to.path !== "/login"
    ) {
      next("/login");
      if (from.path === "/login") {
        Notify.create({
          type: "negative",
          position: "top",
          message: "access denied",
        });
      }
    } else {
      next();
    }
  });
};
