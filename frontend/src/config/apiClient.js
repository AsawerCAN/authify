import axios from "axios";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      // Return structured error object
      return Promise.reject({
        status,
        message: data.message || "An error occurred",
        errors: data.errors || {},
      });
    }
    // Handle network errors
    return Promise.reject({
      status: 0,
      message: "Network error - please check your connection",
      errors: {},
    });
  }
);

export default API;
