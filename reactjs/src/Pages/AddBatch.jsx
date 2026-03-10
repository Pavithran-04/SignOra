import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../Component/Toast";
import axiosInstance from "../api/CommonUrl";
export default function AddBatch() {
  const navigate = useNavigate();
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startYearError, setStartYearError] = useState("");
  const [endYearError, setEndYearError] = useState("");
  const [college, setCollege] = useState(null);
  const [department, setDepartment] = useState(null);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  /* ---------------- FETCH COLLEGES ---------------- */ useEffect(() => {
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
        console.error(error);
        setToastType("error");
        setToastMsg("Failed to load colleges");
      }
    };
    fetchColleges();
  }, []);
  /* ---------------- FETCH DEPARTMENTS ---------------- */ const fetchDepartments =
    async (collegeId) => {
      try {
        const res = await axiosInstance.get(
          `/admin/departments?collegeId=${collegeId}`,
        );
        const options = res.data.departments.map((d) => ({
          value: d.id,
          label: d.name,
        }));
        setDepartmentOptions(options);
      } catch (error) {
        console.error(error);
        setToastType("error");
        setToastMsg("Failed to load departments");
      }
    };
  /* ---------------- COLLEGE CHANGE ---------------- */ const handleCollegeChange =
    (selectedCollege) => {
      setCollege(selectedCollege);
      setDepartment(null);
      setDepartmentOptions([]);
      if (selectedCollege) {
        fetchDepartments(selectedCollege.value);
      }
    };
  /* ---------------- VALIDATION ---------------- */ const validateYears = (
    start,
    end,
  ) => {
    if (!start || !end) return;
    const startNum = Number(start);
    const endNum = Number(end);
    const diff = endNum - startNum;
    if (start.length !== 4) {
      setStartYearError("Start year must be 4 digits");
      return;
    }
    if (end.length !== 4) {
      setEndYearError("End year must be 4 digits");
      return;
    }
    if (startNum === endNum) {
      setEndYearError("Start year and end year cannot be same");
      return;
    }
    if (endNum < startNum) {
      setEndYearError("End year cannot be earlier than start year");
      return;
    }
    if (diff < 2) {
      setEndYearError("Minimum batch duration is 2 years");
      return;
    }
    if (diff > 6) {
      setEndYearError("Maximum batch duration is 6 years");
      return;
    }
    setEndYearError("");
  };
  /* ---------------- START YEAR CHANGE ---------------- */ const handleStartYearChange =
    (value) => {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 4) return;
      setStartYear(value);
      const currentYear = new Date().getFullYear();
      if (value.length !== 4) {
        setStartYearError("Start year must be exactly 4 digits");
        setEndYear("");
        return;
      }
      const start = Number(value);
      if (start < 2020) {
        setStartYearError("Start year cannot be before 2020");
        setEndYear("");
        return;
      }
      if (start > currentYear + 5) {
        setStartYearError("Start year is too far in the future");
        setEndYear("");
        return;
      }
      setStartYearError("");
      const suggestedEndYear = start + 4;
      setEndYear(suggestedEndYear.toString());
      validateYears(value, suggestedEndYear.toString());
    };
  /* ---------------- END YEAR CHANGE ---------------- */ const handleEndYearChange =
    (value) => {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 4) return;
      setEndYear(value);
      if (value.length !== 4) {
        setEndYearError("End year must be exactly 4 digits");
        return;
      }
      validateYears(startYear, value);
    };
  /* ---------------- SUBMIT ---------------- */ const handleSubmit = async (
    e,
  ) => {
    e.preventDefault();
    if (isSubmitting) return;
    validateYears(startYear, endYear);
    if (startYearError || endYearError) {
      setToastType("error");
      setToastMsg("Please fix validation errors");
      return;
    }
    if (!college || !department) {
      setToastType("error");
      setToastMsg("Please select both college and department");
      return;
    }
    setIsSubmitting(true);
    try {

  const payload = {
    startYear: Number(startYear),
    endYear: Number(endYear),
    departmentId: department.value
  };

  const response = await axiosInstance.post("/admin/batch-details", payload);

  const data = response.data;

  // 🔴 BACKEND VALIDATION ERROR
  if (
    data?.status === "Bad Request" &&
    data?.validationErrorInfo?.length > 0
  ) {
    setToastType("error");
    setToastMsg(data.validationErrorInfo[0].message);
    return;
  }

  // ✅ SUCCESS
  setToastType("success");
  setToastMsg("Batch created successfully!");

  setStartYear("");
  setEndYear("");
  setCollege(null);
  setDepartment(null);
  setDepartmentOptions([]);

} catch (error) {

  console.error(error);

  setToastType("error");
  setToastMsg("FAILED TO CREATE BATCH");

} finally {

  setIsSubmitting(false);

}
  };
  return (
    <>
      {" "}
      {toastMsg &&
        ReactDOM.createPortal(
          <div className="content-success-overlay">
            {" "}
            <Toast
              message={toastMsg}
              type={toastType}
              onClose={() => setToastMsg("")}
              duration={3000}
            />{" "}
          </div>,
          document.getElementById("content-overlay-root"),
        )}{" "}
      <div className="w-100 min-vh-100 p-4">
        {" "}
        <div className="d-flex align-items-center justify-content-center">
          {" "}
          <div
            className="card shadow border-0 p-5"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            {" "}
            <h2 className="fw-bold text-center mb-4">Add New Batch</h2>{" "}
            <p className="text-muted text-center mb-4">
              {" "}
              Create a new batch by selecting academic years and
              department.{" "}
            </p>{" "}
            <form onSubmit={handleSubmit}>
              {" "}
              <div className="mb-4 text-start">
                {" "}
                <label className="form-label fw-semibold">
                  Start Year
                </label>{" "}
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="2026"
                  min="2020"
                  max="2036"
                  value={startYear}
                  onChange={(e) => handleStartYearChange(e.target.value)}
                  required
                />{" "}
                {startYearError && (
                  <small className="text-danger">{startYearError}</small>
                )}{" "}
              </div>{" "}
              <div className="mb-4 text-start">
                {" "}
                <label className="form-label fw-semibold">End Year</label>{" "}
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="2030"
                  min="2000"
                  max="2100"
                  value={endYear}
                  onChange={(e) => handleEndYearChange(e.target.value)}
                  required
                />{" "}
                {endYearError && (
                  <small className="text-danger">{endYearError}</small>
                )}{" "}
              </div>{" "}
              <div className="mb-4 text-start">
                {" "}
                <label className="form-label fw-semibold">College</label>{" "}
                <Select
                  options={collegeOptions}
                  value={college}
                  onChange={handleCollegeChange}
                  placeholder="Select college"
                  isSearchable
                  maxMenuHeight={160}
                  formatOptionLabel={(option) => (
                    <div className="d-flex justify-content-between">
                      {" "}
                      <span>{option.label}</span>{" "}
                      <span className="text-muted">{option.code}</span>{" "}
                    </div>
                  )}
                />{" "}
              </div>{" "}
              <div className="mb-4 text-start">
                {" "}
                <label className="form-label fw-semibold">
                  Department
                </label>{" "}
                <Select
                  options={departmentOptions}
                  value={department}
                  onChange={setDepartment}
                  placeholder="Select department"
                  isSearchable
                  maxMenuHeight={160}
                  isDisabled={!college}
                />{" "}
              </div>{" "}
              <div className="d-flex gap-3 mt-4">
                {" "}
                <button
                  type="submit"
                  className="btn btn-dark w-50 py-2"
                  disabled={
                    isSubmitting ||
                    !startYear ||
                    !endYear ||
                    !college ||
                    !department ||
                    startYearError ||
                    endYearError
                  }
                >
                  {" "}
                  {isSubmitting ? "Creating..." : "Create"}{" "}
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-outline-dark w-50 py-2"
                  onClick={() => navigate("/admin")}
                >
                  {" "}
                  Cancel{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
