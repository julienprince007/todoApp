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
    const dbName = LocalStorage.getItem("dbName");
    let dbInfos = store.getters["rxdb/getInfos"];
    if (dbName !== null) {
      if (dbInfos.dbName === "" && !dbInfos.collectionsName.length) {
        store.commit("rxdb/SET_DBNAME", dbName);
        const createDb = app.config.globalProperties.$createDb;
        const initReplication = app.config.globalProperties.$initReplication;
        const localDB = await createDb(dbName);
        setTimeout(() => {
          initReplication();
        }, 200);
        app.provide("localDB", localDB);
      }
    }
    next();
  });
};
