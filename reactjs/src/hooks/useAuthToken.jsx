import { accessToken } from "../api/LoginApi";
export const useAuthToken = () => {
  const getAccessToken = async (credentials) => {
    const response = await accessToken(credentials);
    console.log("response", response);
    localStorage.setItem("accessToken", response.token);
  };
  return getAccessToken;
};
