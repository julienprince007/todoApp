import { LocalStorage } from "quasar";
export default async ({ store, router }) => {
  router.beforeEach((to, from, next) => {
    const token = LocalStorage.getItem("token");
    if (token === null && to.path !== "/login") {
      next("/login");
      if (from.path === "/login") {
        alert("access denied");
      }
    } else {
      next();
    }
  });
};
