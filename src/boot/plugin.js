import * as todoPlugin from "@julienprince007/todoplugin";
import * as todoReplication from "@julienprince007/todoplugin/src/replications/todoReplication";
import * as userReplication from "@julienprince007/todoplugin/src/replications/userReplication";

export default async ({ app }) => {
  // constant for replication
  const secret = process.env.SECRET;
  const urlweb = process.env.URLWEBSOCKET;
  const urlsync = process.env.SYNCURL;

  const db = await todoPlugin.createDb();
  const rp = await todoReplication.initTodoReplication(secret, urlweb, urlsync);
  await userReplication.initUserReplication(secret, urlweb, urlsync);

  app.provide("DB", db);
  app.provide("RP", rp);
};
