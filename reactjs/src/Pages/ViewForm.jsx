import { useSearchParams, useNavigate } from "react-router-dom";
import useStudentService from "../hooks/useStudentService";
import { useEffect, useState } from "react";

function ViewForm() {
  const { getForm } = useStudentService();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const formId = searchParams.get("formId");
  
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      if (!formId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await getForm(formId);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching form data:", err);
        setError("Failed to load form details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormData();
  }, [formId]);

  if (isLoading) {
    return (
      <div className="w-100 min-vh-100 p-4 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading form details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-100 min-vh-100 p-4 d-flex align-items-center justify-content-center">
        <div
          className="card shadow border-0 p-5"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-outline-dark py-2"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="w-100 min-vh-100 p-4 d-flex align-items-center justify-content-center">
        <div
          className="card shadow border-0 p-5"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <div className="alert alert-info" role="alert">
            No form data found
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-outline-dark py-2"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    if (status?.startsWith("APPROVED")) return "badge bg-success";
    if (status?.startsWith("REJECTED")) return "badge bg-danger";
    if (status?.startsWith("MOVED")) return "badge bg-warning";
    return "badge bg-secondary";
  };

  return (
    <div className="w-100 min-vh-100 p-4">
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card shadow border-0 p-5"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <h2 className="fw-bold text-center mb-4">Form Details</h2>
          <p className="text-muted text-center mb-4">
            View request form information and status.
          </p>

          {/* Request Title */}
          <div className="mb-4 text-start">
            <label className="form-label fw-semibold">Request Title</label>
            <div className="form-control form-control-lg" style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}>
              {formData.requestTitle || "N/A"}
            </div>
          </div>

          {/* Request Body */}
          {formData.requestBody && (
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Request Body</label>
              <div 
                className="form-control form-control-lg" 
                style={{ 
                  backgroundColor: "#f8f9fa", 
                  border: "1px solid #dee2e6",
                  minHeight: "120px",
                  whiteSpace: "pre-wrap"
                }}
              >
                {formData.requestBody}
              </div>
            </div>
          )}

          {/* Status */}
          {formData.status && (
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Status</label>
              <div className="form-control form-control-lg" style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}>
                <span className={getStatusBadgeClass(formData.status)}>
                  {formData.status}
                </span>
              </div>
            </div>
          )}

          {/* Form ID (if needed for reference) */}
          {formData.id && (
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Form ID</label>
              <div className="form-control form-control-lg" style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}>
                {formData.id}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              className="btn btn-outline-dark py-2"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewForm;
