import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export default async ({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  app.provide("API", api);
};

export { api, axios };
