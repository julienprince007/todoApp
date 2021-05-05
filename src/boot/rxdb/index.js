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
import subscriptionTodoQuery from "../rxdb/subscription/subTodoQuery";
import subscriptionUserQuery from "../rxdb/subscription/subUserQuery";

export default async ({ app }) => {
  app.use(replication);
  // call initRxdb function
  const initRxdb = app.config.globalProperties.$initRxdb;
  const secret = process.env.SECRET;
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

  initRxdb(secret, urlwebSocket, urlsync, querys, schema);
};
