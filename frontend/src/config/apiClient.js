import axios from "axios";
import queryClient from "./queryClient";
import { UNAUTHORIZED } from "../constants/http.mjs";
import { navigate } from "../lib/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (
      status === UNAUTHORIZED &&
      data?.errorCode === "InvalidAccessToken" &&
      !config._retry &&
      config.url !== "/auth/refresh"
    ) {
      config._retry = true;
      try {
        await TokenRefreshClient.get("/auth/refresh");
        return API(config);
      } catch (refreshError) {
        queryClient.clear();
        navigate("/login", {
          state: { redirectUrl: window.location.pathname },
        });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;
