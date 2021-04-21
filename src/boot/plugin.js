import * as todoPlugin from "@julienprince007/todoplugin";
import * as userPlugin from "@julienprince007/user-plugin";
import * as todoReplication from "@julienprince007/todoplugin/src/replication";
import * as UserReplication from "@julienprince007/user-plugin/src/replication";

export default async ({ app }) => {
  // constant for replication
  const secret = process.env.SECRET;
  const urlweb = process.env.URLWEBSOCKET;
  const urlsync = process.env.SYNCURL;

  const dbTodo = await todoPlugin.createDb();
  const dbUser = await userPlugin.createDb();

  app.provide("DBTodo", dbTodo);
  app.provide("DBUser", dbUser);

  todoReplication.initReplication(secret, urlweb, urlsync);
  UserReplication.initReplication(secret, urlweb, urlsync);
};
