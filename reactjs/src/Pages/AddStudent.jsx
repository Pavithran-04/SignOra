import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Toast from "../Component/Toast";

export default function AddStudent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [college, setCollege] = useState(null);
  const [department, setDepartment] = useState(null);
  const [batch, setBatch] = useState(null);

  const [toastMsg, setToastMsg] = useState("");

  const collegeOptions = [
    { value: "ABC College of Engineering", label: "ABC College of Engineering" },
    { value: "XYZ Institute of Technology", label: "XYZ Institute of Technology" },
    { value: "DEF Arts & Science College", label: "DEF Arts & Science College" },
  ];

  const departmentOptions = [
    { value: "CSE", label: "CSE" },
    { value: "IT", label: "IT" },
    { value: "ECE", label: "ECE" },
    { value: "EEE", label: "EEE" },
    { value: "MECH", label: "MECH" },
  ];

  const batchOptions = [
    { value: "2022-2026", label: "2022 - 2026" },
    { value: "2023-2027", label: "2023 - 2027" },
    { value: "2024-2028", label: "2024 - 2028" },
  ];

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { label: "Weak", color: "danger" };
    if (score <= 4) return { label: "Medium", color: "warning" };
    return { label: "Strong", color: "success" };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !rollNumber ||
      !username ||
      !password ||
      !college ||
      !department ||
      !batch
    ) {
      setToastMsg("Please fill all required fields!");
      return;
    }

    const strength = getPasswordStrength(password);
    if (strength.label === "Weak") {
      setToastMsg("Password is too weak. Please use a stronger password.");
      return;
    }

 

    setToastMsg("Student added successfully!");

    setName("");
    setRollNumber("");
    setUsername("");
    setPassword("");
    setCollege(null);
    setDepartment(null);
    setBatch(null);
  };

  return (
    <div className="w-100 min-vh-100 p-4">
      <Toast message={toastMsg} onClose={() => setToastMsg("")} duration={3000} />

      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card shadow border-0 p-5"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <h2 className="fw-bold text-center mb-4">Add Student</h2>
          <p className="text-muted text-center mb-4">
            Enter student details and academic information.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Roll Number */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Roll Number</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter roll number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>

            {/* Username */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Password</label>

              <div className="input-group input-group-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </button>
              </div>

              {password && (
                <div
                  className={`form-text text-${getPasswordStrength(password).color}`}
                >
                  Password strength:{" "}
                  <b>{getPasswordStrength(password).label}</b>
                </div>
              )}
            </div>

            {/* College */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">College</label>
              <Select
                options={collegeOptions}
                value={college}
                onChange={setCollege}
                placeholder="Select college"
                isSearchable
                maxMenuHeight={160}
              />
            </div>

            {/* Department */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Department</label>
              <Select
                options={departmentOptions}
                value={department}
                onChange={setDepartment}
                placeholder="Select department"
                isSearchable
                maxMenuHeight={160}
              />
            </div>

            {/* Batch */}
            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Batch</label>
              <Select
                options={batchOptions}
                value={batch}
                onChange={setBatch}
                placeholder="Select batch"
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
