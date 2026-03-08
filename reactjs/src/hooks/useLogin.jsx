import { useState } from "react";
import { loginUser } from "../api/LoginApi";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setErrorMsg("");

      const response = await loginUser(credentials);

      return response;
    } catch (error) {
      setErrorMsg("Login failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, errorMsg };
};

export default useLogin;
