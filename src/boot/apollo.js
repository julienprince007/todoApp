// import something here
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";
import { createHttpLink } from "apollo-link-http";

// Initialisation Header
const getHeaders = () => {
  const headers = {
    "x-hasura-admin-secret": process.env.SECRET,
  };
  return headers;
};

// Creation Link
const httpLink = createHttpLink({
  uri: process.env.SYNCURL,
  fetch: fetch,
  headers: getHeaders(),
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app }) => {
  app.config.globalProperties.$apolloClient = apolloClient;
};

export { apolloClient };
