// import * as userReplication from "@julienprince007/todoplugin/src/replications/userReplication";
import replication from "@julienprince007/todoplugin";

export default async ({ app }) => {
  app.use(replication);
};
