import axiosInstance from "./CommonUrl";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/login", credentials);
  console.log("response");
  return response.data;
};

export const accessToken = async (credentials) => {
  console.log("credentials", credentials);
  localStorage.removeItem("accessToken");

  const response = await axiosInstance.post("/auth/token", credentials);
  return response.data;
};
