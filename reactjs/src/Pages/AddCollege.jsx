import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../Component/Toast";

export default function AddCollege() {
  const navigate = useNavigate();
  const [collegeName, setCollegeName] = useState("");
  const [collegeAddress, setCollegeAddress] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: API call here
    console.log({
      collegeName,
      collegeAddress,
      collegeCode,
    });

    setToastMsg("College created successfully!");

    setCollegeName("");
    setCollegeAddress("");
    setCollegeCode("");
  };

  return (
    <div className="w-100 min-vh-100 px-3 py-2">
      {/* Toast */}
      <Toast message={toastMsg} onClose={() => setToastMsg("")} duration={3000} />

      <div className="d-flex align-items-start justify-content-center">
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
              <label className="form-label fw-semibold">College Address</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter college address"
                value={collegeAddress}
                onChange={(e) => setCollegeAddress(e.target.value)}
                required
              />
            </div>

            <div className="d-flex gap-3 mt-3">
              <button type="submit" className="btn btn-dark w-50 py-2">
                Create
              </button>
              <button
                type="button"
                className="btn btn-outline-dark w-50 py-2"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
