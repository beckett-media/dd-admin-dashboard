import axios from "axios";
// export const baseDomain = "https://staging105.botkraft.com";
// export const marketplaceDomain = "epic-villani-e0510b.netlify.app";
// export const marketplaceURL = "https://epic-villani-e0510b.netlify.app";

export const baseDomain = "https://api.duedilly.co";
// export const baseDomain = "http://127.0.0.1:3000";

export const marketplaceDomain = "marketplace.duedilly.co";
// export const marketplaceDomain = "localhost:3001";

export const marketplaceURL = "https://marketplace.duedilly.co";
// export const marketplaceURL = "https://localhost:3001";

const xAppToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiRENHUyIsImlhdCI6MTYwNzg2NDcwMX0.F_3ZTAs_7MbboyzrNCkg0oOyV3yIacP81wee8LPTHJw`;

export const appName = "dilly";

export const customHeaders = {
  Accept: "application/json",
  "content-type": "application/json",
  "x-app-token": xAppToken,
};

export const baseUrl = `${baseDomain}`;

const instance = axios.create({
  baseUrl,
  headers: customHeaders,
});

instance.interceptors.request.use(
  (config) => {
    const _xAuthToken = localStorage.getItem(`${appName}_xAuthToken`) || null;
    if (_xAuthToken) config.headers["x-auth-token"] = _xAuthToken;
    if (
      (config.url || "").indexOf("/update-lsiting-images") > -1 ||
      (config.url || "").indexOf("/add-update-profile-picture") > -1
    )
      config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};

export const getError = (error) => {
  console.log("error: ", error.response);
  if (error.response) {
    if (error?.response?.data?.data?.errorMessage) {
      return `${error.response.data?.data?.errorMessage}`;
    } else if (error?.response?.data?.message) {
      return `${error.response?.data?.message}`;
    }
  } else if (error.request) {
  } else {
    return `${error}`;
  }
};
