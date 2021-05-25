import { LocalStorage } from "quasar";
import { Notify } from "quasar";

export default async ({ store, router }) => {
  router.beforeEach((to, from, next) => {
    let user = store.getters["rxdb/getUser"];
    if (user === null && to.path !== "/login") {
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
