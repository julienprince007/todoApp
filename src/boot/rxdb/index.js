import replication from "@julienprince007/todoplugin";
import {
  todoPullQueryBuilder,
  todoPushQueryBuilder,
} from "../rxdb/queryBuilder/todoQueryBuilder ";
import {
  userPullQueryBuilder,
  userPushQueryBuilder,
} from "../rxdb/queryBuilder/userQueryBuilder";
import schema from "../rxdb/schema/schemaRxdb";
import subscriptionQuery from "../rxdb/subscription/subTodoQuery";
import { LocalStorage } from "quasar";

export default async ({ app, router, store }) => {
  app.use(replication);
  let localDb = null;
  // call initRxdb function
  const initRxdb = app.config.globalProperties.$initRxdb;
  const restartReplication = app.config.globalProperties.$restartReplication;

  const secret = process.env.SECRET;
  const urlwebSocket = process.env.URLWEBSOCKET;
  const urlsync = process.env.SYNCURL;

  let queryBuilders = [];
  queryBuilders["todos"] = [
    { pull: todoPullQueryBuilder },
    { push: todoPushQueryBuilder },
  ];

  const init = initRxdb(
    secret,
    urlwebSocket,
    urlsync,
    subscriptionQuery,
    queryBuilders,
    schema
  );
  store.commit("rxdb/SET_COLLECTIONNAME", ["todos", "users"]);
  let dbInfos = store.getters["rxdb/getInfos"];
  router.beforeEach(async (to, from, next) => {
    const dbName = LocalStorage.getItem("dbName");
    const collectionName = LocalStorage.getItem("collectionName");
    let dbInfos = store.getters["rxdb/getInfos"];
    if (dbName !== null && collectionName !== null) {
      if (dbInfos.dbName === "" && dbInfos.collectionName.length) {
        init;

        localDb = await restartReplication();
        store.commit("rxdb/SET_DBNAME", dbName);
        store.commit("rxdb/SET_COLLECTIONNAME", collectionName);
      }
    }
    next();
  });
};
