const BaseSettings = {
  url: "https://restcountries.com/v3.1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text-plain, */*",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
};

export default {
  get() {
    return fetch(`${BaseSettings.url}all`, {
      method: "GET",
      headers: {
        ...BaseSettings.headers,
      },
      credentials: "same-origin",
    });
  },
};
