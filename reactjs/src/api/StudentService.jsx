import { useCallback } from "react";
import axiosInstance from "./CommonUrl";

export const submitForm = (data) => {
  return axiosInstance.post("/request", data);
};

export const getRequestForm = useCallback(async () => {
  const response = await axiosInstance.get("");
  return response;
});

