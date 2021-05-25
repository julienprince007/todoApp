import replication from "@julienprince007/todoplugin";
import { LocalStorage } from "quasar";

import {
  todoPullQueryBuilder,
  todoPushQueryBuilder,
} from "../rxdb/queryBuilder/todoQueryBuilder ";
import {
  userPullQueryBuilder,
  userPushQueryBuilder,
} from "../rxdb/queryBuilder/userQueryBuilder";
import schema from "../rxdb/schema/schemaRxdb";
import subscriptionTodoQuery from "../rxdb/subscription/subTodoQuery";
import subscriptionUserQuery from "../rxdb/subscription/subUserQuery";

export default async ({ app, store, router }) => {
  app.use(replication);
  // call initRxdb function
  const initRxdb = app.config.globalProperties.$initRxdb;
  const createDb = app.config.globalProperties.$createDb;
  const initReplication = app.config.globalProperties.$initReplication;

  const urlwebSocket = process.env.URLWEBSOCKET;
  const urlsync = process.env.SYNCURL;

  //init queryBuilders
  let querys = [];
  querys["todos"] = [
    { pull: todoPullQueryBuilder },
    { push: todoPushQueryBuilder },
    { sub: subscriptionTodoQuery },
  ];
  querys["users"] = [
    { pull: userPullQueryBuilder },
    { push: userPushQueryBuilder },
    { sub: subscriptionUserQuery },
  ];

  initRxdb(urlwebSocket, urlsync, querys, schema);

  router.beforeEach(async (to, from, next) => {
    const user = LocalStorage.getItem("user");
    let userState = store.getters["rxdb/getUser"];

    if (user !== null) {
      if (userState === null) {
        store.commit("rxdb/SET_DBNAME", user);
        await createDb(user.name, user.token);
        setTimeout(() => {
          initReplication();
        }, 500);
      }
    }
    next();
  });
};
