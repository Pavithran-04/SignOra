import { accessToken } from "../api/LoginApi";
export const useAuthToken = () => {
  const getAccessToken = async (credentials) => {
    try {
      const response = await accessToken(credentials);
      
      // Check if token is null or response indicates error
      if (!response || !response.token || response.status === "400 BAD_REQUEST" || response.status === "BAD_REQUEST") {
        console.error("Invalid token response:", response);
        throw new Error("Failed to get access token");
      }
      
      localStorage.setItem("accessToken", response.token);
      return response;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };
  return getAccessToken;
};
