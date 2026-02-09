import axiosInstance from "./CommonUrl";

export const loginUser = async (credentials) => {
  localStorage.removeItem("accessToken");
  const response = await axiosInstance.post("/login", credentials);
  return response.data;
};

export const accessToken = async (credentials) => {
  const response = await axiosInstance.post("/auth/token", credentials);
  return response.data;
};
