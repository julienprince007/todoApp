import * as todoPlugin from "poctodoplugin";
import * as userPlugin from "plugin-user";
import * as todoReplication from "poctodoplugin/src/replication";
import * as UserReplication from "plugin-user/src/replication";

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
