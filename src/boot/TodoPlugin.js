import * as database from "poctodoplugin";

export default async ({ app }) => {
  const db = await database.createDb();
  app.provide("DB", db);
};
