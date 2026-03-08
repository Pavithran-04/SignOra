import axiosInstance from "./CommonUrl";


export const getRequestForm = async (data) => {
  const response = await axiosInstance.get("/forms", {
    params: {
      role: data.role,
      identifier: data.identifier,
    },
  });
  return response;
};

export const updateRequestStatus = async (data) => {
  const response = await axiosInstance.post("/form/update-status", {
    requestId: data.requestId,
    isApproved: data.isApproved,
  });
  return response;
};

export const getFormDetails = async (formId) => {
  const response = await axiosInstance.get(`/forms/${formId}`);
  return response;
};
