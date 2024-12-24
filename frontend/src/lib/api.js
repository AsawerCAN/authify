import API from "../config/apiClient";

export const login = async (data) => API.post("/auth/login", data);

export const logout = async () => API.get("/auth/logout");

export const register = async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    return response;
  } catch (error) {
    if (error.response?.data?.errors) {
      throw {
        status: error.response.status,
        errors: error.response.data.errors,
        message: error.response.data.message,
      };
    }
    throw {
      status: error.response?.status || 500,
      message: "An unexpected error occurred",
    };
  }
};

export const verifyEmail = async (verificationCode) =>
  API.get(`/auth/email/verify/${verificationCode}`);

export const sendPasswordReset = async ({ email }) =>
  API.post("/auth/password/forgot", { email });

export const resetPassword = async ({ password, verificationCode }) =>
  API.post("/auth/password/reset", { password, verificationCode });

export const getUser = async () => API.get("/user");

export const getSessions = async () => API.get("/sessions");

export const deleteSession = async (id) => API.delete(`/sessions/${id}`);
