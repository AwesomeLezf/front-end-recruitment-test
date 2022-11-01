import { ApiInterface } from "../types/api";
const BaseSettings = {
  url: "http://127.0.0.1:3333/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text-plain, */*",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
};

const Api = (data: ApiInterface) => {
  return fetch(`${BaseSettings.url}${data.url}`, {
    headers: {
      ...BaseSettings.headers,
    },
    method: data.method,
    credentials: "same-origin",
    body: data.body,
  });
};

export { Api };

export default BaseSettings;
