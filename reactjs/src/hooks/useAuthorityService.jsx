import { useState } from "react";
import { getRequestForm, updateRequestStatus, getFormDetails, getAuthorityByUserId, getAuthorityDetails } from "../api/AuthorityService";


const useAuthorityService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getRequestDetails = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getRequestForm(data);
      
      // Clear error on success
      setError("");

      return response;
    } catch (error) {
      // Extract meaningful error message
      let errorMessage = "Failed to fetch request details. Please try again.";
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData?.validationErrorInfo && Array.isArray(errorData.validationErrorInfo) && errorData.validationErrorInfo.length > 0) {
          errorMessage = errorData.validationErrorInfo[0].message || errorMessage;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await updateRequestStatus(data);
      
      // Clear error on success
      setError("");

      return response;
    } catch (error) {
      // Extract meaningful error message
      let errorMessage = "Failed to update status. Please try again.";
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData?.validationErrorInfo && Array.isArray(errorData.validationErrorInfo) && errorData.validationErrorInfo.length > 0) {
          errorMessage = errorData.validationErrorInfo[0].message || errorMessage;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getForm = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getFormDetails(data);
      
      // Clear error on success
      setError("");

      return response;
    } catch (error) {
      // Extract meaningful error message
      let errorMessage = "Failed to fetch form details. Please try again.";
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData?.validationErrorInfo && Array.isArray(errorData.validationErrorInfo) && errorData.validationErrorInfo.length > 0) {
          errorMessage = errorData.validationErrorInfo[0].message || errorMessage;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getAuthority = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      const id = typeof data === 'object' ? (data.authorityId ?? data.userId) : data;
      try {
        const response = await getAuthorityDetails(id);
        return response;
      } catch (adminErr) {
        if (adminErr.response?.status === 403) {
          const response = await getAuthorityByUserId(id);
          return response;
        }
        throw adminErr;
      }
    } catch (error) {
      let errorMessage = "Failed to fetch authority details. Please try again.";
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData?.validationErrorInfo && Array.isArray(errorData.validationErrorInfo) && errorData.validationErrorInfo.length > 0) {
          errorMessage = errorData.validationErrorInfo[0].message || errorMessage;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getRequestDetails,
    updateStatus,
    getForm,
    getAuthority,
  };
};

export default useAuthorityService;
