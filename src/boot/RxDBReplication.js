import { SubscriptionClient } from "subscriptions-transport-ws";
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app }) => {
  // something to do
  const DB = app.config.globalProperties.$DB;
  const syncURL = "https://rested-woodcock-48.hasura.app/v1/graphql";
  const batchSize = 5;

  const pullQueryBuilder = (doc) => {
    if (!doc) {
      doc = {
        id: "",
        updated_at: new Date(0).toUTCString(),
      };
    }
    const query = `
    query listTodos {
        todo(
          where: {
            _or: [
                {updated_at: {_gt: "${doc.updated_at}"}}
            ]
        },
        limit: ${batchSize},
        order_by: [{updated_at: asc}, {id: asc}]
        ) {
          id
          text
          isCompleted
          deleted
          created_at
          updated_at
        }
      }`;
    return {
      query,
      variables: {},
    };
  };

  const pushQueryBuilder = (doc) => {
    const query = `
        mutation InsertTodo($todo: [todo_insert_input!]!) {
          insert_todo(objects: $todo, on_conflict: {constraint: todo_pkey, update_columns: [text, isCompleted, deleted, updated_at]}) {
            returning {
              id
            }
          }
        }
      `;
    const variables = {
      todo: doc,
    };
    return {
      query,
      variables,
    };
  };

  // Start Replication every 10 seconds

  const replicationState = DB.todos.syncGraphQL({
    url: syncURL,
    headers: {
      "x-hasura-admin-secret":
        "0dyCHwp9GhsJlVF64dq2QFUU4WpENiWlCwVmhTyt7IZwWiwDMbhzw7589otp2zpc",
    },
    push: {
      batchSize,
      queryBuilder: pushQueryBuilder,
    },
    pull: {
      batchSize,
      queryBuilder: pullQueryBuilder,
    },
    live: true,
    deletedFlag: "deleted",
  });
  // Error log
  replicationState.error$.subscribe((err) => {
    console.log("replication error:");
    console.dir(err);
  });

  // setup the subscription client
  // Ici Pour reduire le temps de latence du serveur
  const endpointUrl = "wss://rested-woodcock-48.hasura.app/v1/graphql";
  const wsClient = new SubscriptionClient(endpointUrl, {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "0dyCHwp9GhsJlVF64dq2QFUU4WpENiWlCwVmhTyt7IZwWiwDMbhzw7589otp2zpc",
      },
    },
    connectionCallback: () => {
      console.log("SubscriptionClient.connectionCallback:");
    },
    reconnectionAttempts: 1000,
    inactivityTimeout: 10 * 1000,
  });

  const query = `
    subscription{
      todo {
        id
      }
    }`;

  const changeObservable = wsClient.request({ query });
  changeObservable.subscribe({
    next(data) {
      console.log("subscription emitted => trigger run");
      replicationState.run();
    },
    error(error) {
      console.log("got error:");
      console.dir(error);
    },
  });
};
