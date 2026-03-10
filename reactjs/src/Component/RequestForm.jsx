import { useState } from "react";
import useStudentService from "../hooks/useStudentService";

function RequestForm({ showModal, setShowModal, onFormSubmitted, onSubmitSuccess }) {
  const { isLoading, error, submitRequestForm } = useStudentService();
  const [formData, setFormData] = useState({
    requestTitle: "",
    requestBody: "",
    isHodApprovalRequired: false,
    isPrincipalApprovalRequired: false,
  });
  const [fieldErrors, setFieldErrors] = useState({ requestTitle: "", requestBody: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    const requestTitle = (formData.requestTitle || "").trim();
    const requestBody = (formData.requestBody || "").trim();
    const newErrors = {
      requestTitle: !requestTitle ? "Subject is required." : "",
      requestBody: !requestBody ? "Request body is required." : "",
    };
    setFieldErrors(newErrors);
    if (newErrors.requestTitle || newErrors.requestBody) return;

    try {
      await submitRequestForm({ ...formData, requestTitle, requestBody });
      setFormData({
        requestTitle: "",
        requestBody: "",
        isHodApprovalRequired: false,
        isPrincipalApprovalRequired: false,
      });
      setFieldErrors({ requestTitle: "", requestBody: "" });
      setShowModal(false);
      setTimeout(() => {
        if (onFormSubmitted) onFormSubmitted();
        if (onSubmitSuccess) onSubmitSuccess();
      }, 0);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">
          <div className="modal-header border-0 pb-0">
            <h2 className="fw-bold text-center w-100 mb-3">Application Form</h2>
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body p-5">
            <p className="text-muted text-center mb-4">
              Fill in the details to submit your request.
            </p>

            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">
                Subject <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control form-control-lg ${fieldErrors.requestTitle ? "is-invalid" : ""}`}
                placeholder="Enter subject"
                name="requestTitle"
                value={formData.requestTitle}
                onChange={handleChange}
              />
              {fieldErrors.requestTitle && (
                <div className="invalid-feedback d-block">{fieldErrors.requestTitle}</div>
              )}
            </div>

            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">
                Request Body <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control form-control-lg ${fieldErrors.requestBody ? "is-invalid" : ""}`}
                rows="4"
                placeholder="Enter request details"
                name="requestBody"
                value={formData.requestBody}
                onChange={handleChange}
              />
              {fieldErrors.requestBody && (
                <div className="invalid-feedback d-block">{fieldErrors.requestBody}</div>
              )}
            </div>

            <div className="mb-4 text-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isHodApprovalRequired"
                  name="isHodApprovalRequired"
                  checked={formData.isHodApprovalRequired}
                  onChange={handleChange}
                />
                <label className="form-check-label fw-semibold" htmlFor="isHodApprovalRequired">
                  Required HOD Approval
                </label>
              </div>
            </div>

            <div className="mb-4 text-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isPrincipalApprovalRequired"
                  name="isPrincipalApprovalRequired"
                  checked={formData.isPrincipalApprovalRequired}
                  onChange={handleChange}
                />
                <label className="form-check-label fw-semibold" htmlFor="isPrincipalApprovalRequired">
                  Required Principal Approval
                </label>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                <strong>Error:</strong> {error}
              </div>
            )}

            <div className="d-flex gap-3 mt-4">
              <button
                type="button"
                className="btn btn-dark w-50 py-2"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-dark w-50 py-2"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestForm;
