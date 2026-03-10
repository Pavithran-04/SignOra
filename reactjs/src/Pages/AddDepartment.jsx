import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../Component/Toast";
import axiosInstance from "../api/CommonUrl";

export default function AddDepartment() {
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");
  const [college, setCollege] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success"); // ✅ NEW
  const [collegeOptions, setCollegeOptions] = useState([]);

  // Fetch colleges
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axiosInstance.get("/admin/colleges");

        const options = res.data.collegeInfoList.map((c) => ({
          value: c.id,
          label: c.name,
          code: c.code,
        }));

        setCollegeOptions(options);
      } catch (error) {
        console.error("Failed to fetch colleges", error);
        setToastType("error");
        setToastMsg("Failed to load colleges");
      }
    };

    fetchColleges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departmentName || !college) {
      setToastType("error");
      setToastMsg("Please fill all required fields!");
      return;
    }

    const payload = {
      name: departmentName,
      collegeId: college.value,
    };

    try {
      const res = await axiosInstance.post("/admin/department", payload);

      // Backend validation
      if (res.data?.status === "Bad Request") {
        const message =
          res.data?.validationErrorInfo?.[0]?.message ||
          "Validation failed";

        setToastType("error"); // 🔴 RED
        setToastMsg(message);
        return;
      }

      // Success
      setToastType("success"); // 🟢 GREEN
      setToastMsg("Department created successfully!");
      setDepartmentName("");
      setCollege(null);

    } catch (error) {
      console.error("Failed to create department", error);
      setToastType("error");
      setToastMsg("Failed to create department");
    }
  };

  return (
    <>
      {/* TOAST CENTERED */}
      {toastMsg &&
        ReactDOM.createPortal(
          <div className="content-success-overlay">
            <Toast
              message={toastMsg}
              type={toastType} // ✅ PASS TYPE
              onClose={() => setToastMsg("")}
              duration={3000}
            />
          </div>,
          document.getElementById("content-overlay-root")
        )}

      {/* Main content */}
      <div className="w-100 min-vh-100 p-4">
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
                <label className="form-label fw-semibold">
                  Department Name
                </label>
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
                <label className="form-label fw-semibold">
                  College Name
                </label>
                <Select
                  options={collegeOptions}
                  value={college}
                  onChange={setCollege}
                  placeholder="Select college"
                  isSearchable
                  maxMenuHeight={160}
                  formatOptionLabel={(option) => (
                    <div className="d-flex justify-content-between">
                      <span>{option.label}</span>
                      <span className="text-muted">{option.code}</span>
                    </div>
                  )}
                />
              </div>

              <div className="d-flex gap-3 mt-4">
                <button
                  type="submit"
                  className="btn btn-dark w-50 py-2"
                  disabled={!departmentName || !college}
                >
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
    </>
  );
}