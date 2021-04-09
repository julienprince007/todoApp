import * as todoPlugin from "poctodoplugin";
import * as userPlugin from "plugin-user";

export default async ({ app }) => {
  const dbTodo = await todoPlugin.createDb();
  const dbUser = await userPlugin.createDb();
  app.provide("DBTodo", dbTodo);
  app.provide("DBUser", dbUser);
};
