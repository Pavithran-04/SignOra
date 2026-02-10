import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../Component/Toast";

export default function AddBatch() {
  const navigate = useNavigate();
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [college, setCollege] = useState(null);
  const [department, setDepartment] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const collegeOptions = [
    { value: "ABC College of Engineering", label: "ABC College of Engineering" },
    { value: "XYZ Institute of Technology", label: "XYZ Institute of Technology" },
    { value: "DEF Arts & Science College", label: "DEF Arts & Science College" },
    { value: "GHI University", label: "GHI University" },
    { value: "JKL Technical Campus", label: "JKL Technical Campus" },
  ];

  const departmentOptions = [
    { value: "CSE", label: "CSE" },
    { value: "IT", label: "IT" },
    { value: "ECE", label: "ECE" },
    { value: "EEE", label: "EEE" },
    { value: "MECH", label: "MECH" },
    { value: "CIVIL", label: "CIVIL" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(endYear) < Number(startYear)) {
      setToastMsg("End year cannot be earlier than start year!");
      return;
    }

    if (!college || !department) {
      setToastMsg("Please select both college and department!");
      return;
    }

    console.log({
      startYear,
      endYear,
      college: college.value,
      department: department.value,
    });

    setToastMsg("Batch created successfully!");

    setStartYear("");
    setEndYear("");
    setCollege(null);
    setDepartment(null);
  };

  return (
    <div className="w-100 min-vh-100 p-4">
      <Toast message={toastMsg} onClose={() => setToastMsg("")} duration={3000} />

      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card shadow border-0 p-5"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <h2 className="fw-bold text-center mb-4">Add New Batch</h2>
          <p className="text-muted text-center mb-4">
            Create a new batch by selecting the academic years and department.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Start Year */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Start Year</label>
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="e.g. 2022"
                min="2000"
                max="2100"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                required
              />
            </div>

            {/* End Year */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">End Year</label>
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="e.g. 2026"
                min="2000"
                max="2100"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                required
              />
            </div>

            {/* College - Enhanced Dropdown */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">College</label>
              <Select
                options={collegeOptions}
                value={college}
                onChange={setCollege}
                placeholder="Select college..."
                isSearchable
                maxMenuHeight={180}
                classNamePrefix="react-select"
              />
            </div>

            {/* Department - Enhanced Dropdown */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Department</label>
              <Select
                options={departmentOptions}
                value={department}
                onChange={setDepartment}
                placeholder="Select department..."
                isSearchable
                maxMenuHeight={180}
                classNamePrefix="react-select"
              />
            </div>

            {/* Buttons */}
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