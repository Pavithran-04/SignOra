import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../Component/Toast";
import axiosInstance from "../api/CommonUrl";

export default function AddCollege() {
  const navigate = useNavigate();

  const [collegeName, setCollegeName] = useState("");
  const [collegeAddress, setCollegeAddress] = useState("");
  const [collegeCode, setCollegeCode] = useState("");

  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: collegeName,
        address: collegeAddress,
        code: collegeCode,
      };

      const response = await axiosInstance.post("/admin/college", payload);
      const data = response.data;

      // Backend validation error
      if (
        data?.status === "Bad Request" &&
        data?.validationErrorInfo?.length > 0
      ) {
        setToastType("error");
        setToastMsg(data.validationErrorInfo[0].message);
        return;
      }

      // Success
      setToastType("success");
      setToastMsg("College created successfully!");

      setCollegeName("");
      setCollegeAddress("");
      setCollegeCode("");

    } catch (error) {
      console.error("Create college failed:", error);
      setToastType("error");
      setToastMsg("FAILED TO CREATE COLLEGE");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast */}
      {toastMsg &&
        ReactDOM.createPortal(
          <div className="content-success-overlay">
            <Toast
              message={toastMsg}
              type={toastType}
              onClose={() => setToastMsg("")}
              duration={3000}
            />
          </div>,
          document.getElementById("content-overlay-root")
        )}

      <div className="w-100 px-3 py-2">
        <div className="d-flex align-items-start justify-content-center pt-3">
          <div
            className="card shadow border-0 p-4"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            <h2 className="fw-bold text-center mb-3">Add New College</h2>

            <p className="text-muted text-center mb-3">
              Provide the basic details to register a new college in the system.
            </p>

            <form onSubmit={handleSubmit}>
              {/* College Name */}
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">College Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter college name"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  required
                />
              </div>

              {/* College Code */}
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">College Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter college code"
                  value={collegeCode}
                  onChange={(e) => setCollegeCode(e.target.value)}
                  required
                />
              </div>

              {/* College Address */}
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">
                  College Address
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter college address"
                  value={collegeAddress}
                  onChange={(e) => setCollegeAddress(e.target.value)}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="d-flex gap-3 mt-3">
                <button
                  type="submit"
                  className="btn btn-dark w-50 py-2"
                  disabled={
                    isSubmitting ||
                    !collegeName.trim() ||
                    !collegeCode.trim() ||
                    !collegeAddress.trim()
                  }
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-dark w-50 py-2"
                  onClick={() => navigate("/admin")}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}