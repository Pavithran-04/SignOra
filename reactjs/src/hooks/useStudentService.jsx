import { submitForm } from "../api/StudentService";
import { useState } from "react";
import { getRequestForm } from "../api/StudentService";
import {
  getFormDetails,
  getStudentDetails,
  uploadCertificateLink,
} from "../api/StudentService";
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

      const userId =
        typeof data === "object" ? (data.userId ?? data.studentId) : data;
      const response = await getStudentDetails(userId);

      return response;
    } catch (error) {
      setError("Error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const uploadCertificate = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await uploadCertificateLink(data.requestId, data.link);

      return response;
    } catch (error) {
      setError("Error uploading certificate link");
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
    uploadCertificate,
  };
};

export default useStudentService;
