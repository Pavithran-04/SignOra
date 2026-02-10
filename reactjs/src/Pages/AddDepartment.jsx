import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../Component/Toast";

export default function AddDepartment() {
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");
  const [college, setCollege] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const collegeOptions = [
    { value: "ABC College of Engineering", label: "ABC College of Engineering" },
    { value: "XYZ Institute of Technology", label: "XYZ Institute of Technology" },
    { value: "DEF Arts & Science College", label: "DEF Arts & Science College" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!departmentName || !college) {
      setToastMsg("Please fill all required fields!");
      return;
    }

    // TODO: API call
    console.log({
      departmentName,
      collegeName: college.value,
    });

    setToastMsg("Department created successfully!");

    setDepartmentName("");
    setCollege(null);
  };

  return (
    <div className="w-100 min-vh-100 p-4">
      {/* ✅ Toast Notification */}
      <Toast message={toastMsg} onClose={() => setToastMsg("")} duration={3000} />

      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card shadow border-0 p-5"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <h2 className="fw-bold text-center mb-3">Add New Department</h2>
          <p className="text-muted text-center mb-4">
            Add a new department and link it with the corresponding college.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Department Name */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Department Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter department name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                required
              />
            </div>

            {/* College Dropdown */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">College Name</label>
              <Select
                options={collegeOptions}
                value={college}
                onChange={setCollege}
                placeholder="Select college"
                isSearchable
                maxMenuHeight={160}
              />
            </div>

            <div className="d-flex gap-3 mt-4">
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
