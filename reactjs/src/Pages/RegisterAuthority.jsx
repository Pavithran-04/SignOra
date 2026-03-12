import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Toast from "../Component/Toast";
import axiosInstance from "../api/CommonUrl";

export default function RegisterAuthority() {
  const navigate = useNavigate();

  const [empId, setEmpId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");

  /* PASSWORD STRENGTH */

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

  /* VALIDATION */

  const validateField = (field, value) => {
    if (field === "empId") {
      if (!value.trim()) return "Employee ID is required";
    }

    if (field === "username") {
      if (!value.trim()) return "Username required";
      if (value.length < 4) return "Username must have at least 4 characters";
    }

    if (field === "password") {
      if (!value) return "Password required";
      if (getPasswordStrength(value).label === "Weak")
        return "Password too weak";
    }

    return "";
  };

  const handleValidation = (field, value) => {
    const error = validateField(field, value);

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      empId: validateField("empId", empId),
      username: validateField("username", username),
      password: validateField("password", password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setToastType("error");
      setToastMsg("Please fix validation errors");
      return;
    }

    try {
      const payload = {
        identifier: empId,
        username: username,
        password: password,
        role: "FACULTY", // ⚠️ REQUIRED by backend
      };

      const response = await axiosInstance.post(
        "/admin/authority/register", // ✅ Correct API
        payload,
      );

      const data = response.data;

      if (
        data?.status === "Bad Request" &&
        data?.validationErrorInfo?.length > 0
      ) {
        setToastType("error");
        setToastMsg(data.validationErrorInfo[0].message);
        return;
      }

      setToastType("success");
      setToastMsg(data?.message || "Authority registered successfully");

      setEmpId("");
      setUsername("");
      setPassword("");
      setErrors({});
    } catch (error) {
      console.error("Register authority failed:", error);

      if (
        error?.response?.data?.validationErrorInfo &&
        error.response.data.validationErrorInfo.length > 0
      ) {
        setToastMsg(error.response.data.validationErrorInfo[0].message);
      } else if (error?.response?.data?.message) {
        setToastMsg(error.response.data.message);
      } else {
        setToastMsg("FAILED TO REGISTER AUTHORITY");
      }

      setToastType("error");
    }
  };

  return (
    <>
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
          document.getElementById("content-overlay-root"),
        )}

      <div className="w-100 min-vh-100 p-4">
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="card shadow border-0 p-5"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            <h2 className="fw-bold text-center mb-4">Register Authority</h2>

            <p className="text-muted text-center mb-4">
              Create login credentials for an authority member.
            </p>

            <form onSubmit={handleSubmit}>
              {/* EMPLOYEE ID */}

              <div className="mb-4 text-start">
                <label className="form-label fw-semibold">Employee ID</label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={empId}
                  onChange={(e) => {
                    setEmpId(e.target.value);
                    handleValidation("empId", e.target.value);
                  }}
                />

                {errors.empId && (
                  <small className="text-danger">{errors.empId}</small>
                )}
              </div>

              {/* USERNAME */}

              <div className="mb-4 text-start">
                <label className="form-label fw-semibold">Username</label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    handleValidation("username", e.target.value);
                  }}
                />

                {errors.username && (
                  <small className="text-danger">{errors.username}</small>
                )}
              </div>

              {/* PASSWORD */}

              <div className="mb-4 text-start">
                <label className="form-label fw-semibold">Password</label>

                <div className="input-group input-group-lg">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleValidation("password", e.target.value);
                    }}
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${
                        showPassword ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </button>
                </div>

                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}

                {password && (
                  <div
                    className={`form-text text-${
                      getPasswordStrength(password).color
                    }`}
                  >
                    Password strength:{" "}
                    <b>{getPasswordStrength(password).label}</b>
                  </div>
                )}
              </div>

              <div className="d-flex gap-3 mt-4">
                <button type="submit" className="btn btn-dark w-50 py-2">
                  Register
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
