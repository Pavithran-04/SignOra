import axiosInstance from "./CommonUrl";

export const submitForm = async (data) => {
  return await axiosInstance.post("/request", data);
};

export const getRequestForm = async (data) => {
  const response = await axiosInstance.get("/forms", {
    params: {
      role: data.role,
      identifier: data.identifier,
    },
  });
  return response;
};

export const getFormDetails = async (formId) => {
  const response = await axiosInstance.get(`/forms/${formId}`);
  return response;
};

export const getStudentDetails = async (studentId) => {
  const response = await axiosInstance.get(`/admin/students/${studentId}`);
  return response;
};

export const getStudentByUserId = async (userId) => {
  const response = await axiosInstance.get(`/students/user/${userId}`);
  return response;
};

export const uploadCertificateLink = async (requestId, driveLink) => {
  const response = await axiosInstance.post("/certificate", {
    requestId: requestId,
    link: driveLink,
  });
  return response;
};
