import { submitForm } from "../api/StudentService";
import { useState } from "react";
import { getRequestForm } from "../api/StudentService";
import { getFormDetails, getStudentDetails } from "../api/StudentService";
// import {submitForm} from "../api/StudentService";
const useStudentService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  //   const submitRequestForm = submitForm(data);
  const submitRequestForm = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await submitForm(data);

      return response;
    } catch (error) {
      setError("Error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getRequestDetails = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getRequestForm(data);

      return response;
    } catch (error) {
      setError("Error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  // const

  const getForm = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getFormDetails(data);

      return response;
    } catch (error) {
      setError("Error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getStudent = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getStudentDetails(data);

      return response;
    } catch (error) {
      setError("Error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    error,
    submitRequestForm,
    getRequestDetails,
    getForm,
    getStudent,
  };
};

export default useStudentService;
