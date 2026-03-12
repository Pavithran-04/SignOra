import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { useAuthToken } from "../hooks/useAuthToken";
import { useNavigate } from "react-router-dom";

function Login() {
const [credentials, setCredentials] = useState({
username: "",
password: "",
});
const [loginResponse, setLoginResponse] = useState(null);
const [loginError, setLoginError] = useState("");

const { isLoading, errorMsg, login } = useLogin();
const getAccessToken = useAuthToken();
const navigator = useNavigate();

const onSubmit = async () => {
setLoginError("");

if (!credentials.username.trim() || !credentials.password.trim()) {
  setLoginError("Please enter both username and password");
  return;
}

try {
  const response = await login(credentials);

  if (
    response?.status?.toUpperCase() === "BAD_REQUEST" ||
    response?.status === "Bad Request"
  ) {
    let errorMessage =
      "Invalid credentials. Please check your username and password.";

    if (response?.validationErrorInfo?.[0]?.message) {
      errorMessage = response.validationErrorInfo[0].message;
    }

    setLoginError(errorMessage);
    setLoginResponse(null);
    return;
  }

  if (response?.role) {
    setLoginResponse(response);
  } else {
    setLoginError("Invalid response from server. Please try again.");
    setLoginResponse(null);
  }
} catch (error) {
  let errorMessage = "Login failed. Please check your credentials.";

  if (error.response?.data) {
    const errorData = error.response.data;
    errorMessage =
      errorData.validationErrorInfo?.[0]?.message ||
      errorData.message ||
      errorData.error ||
      errorMessage;
  } else if (error.message) {
    errorMessage = error.message.includes("Username or Password")
      ? "Invalid username or password"
      : error.message;
  }

  setLoginError(errorMessage);
  setLoginResponse(null);
}

};

const getAuthToken = async () => {
try {
const response = await getAccessToken(credentials);

  if (!response || !response.token) {
    setLoginError("Failed to authenticate. Please try again.");
    return false;
  }

  return true;
} catch (error) {
  setLoginError("Failed to authenticate. Please try again.");
  return false;
}

};

useEffect(() => {
const handleLoginSuccess = async () => {
if (errorMsg || loginError || !loginResponse) return;

  const status = loginResponse?.status?.toUpperCase();
  if (status === "BAD_REQUEST") {
    let errorMessage =
      loginResponse?.validationErrorInfo?.[0]?.message ||
      "Invalid credentials.";
    setLoginError(errorMessage);
    return;
  }

  if (loginResponse.role) {
    const tokenSuccess = await getAuthToken();
    if (!tokenSuccess) return;

    const role = loginResponse.role.toUpperCase();

    const id = loginResponse.id;
    const userId = loginResponse.userId ?? loginResponse.id;
    if (role === "STUDENT") {
      navigator(`/student?id=${id}&userId=${userId}`);
    } else if (role === "FACULTY") {
      navigator(`/faculty?id=${id}&userId=${userId}`);
    } else if (role === "HOD") {
      navigator(`/hod?id=${id}&userId=${userId}`);
    } else if (role === "PRINCIPAL") {
      navigator(`/principal?id=${id}&userId=${userId}`);
    } else if (role === "ADMIN") {
      navigator(`/admin`);
    }
  }
};

handleLoginSuccess();

}, [loginResponse, errorMsg, loginError, navigator]);

return (
  <div
    className="login-page-wrap d-flex justify-content-center align-items-center p-3"
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    }}
  >
    <div
      className="login-card bg-white shadow"
      style={{
        width: "100%",
        maxWidth: "400px",
        borderRadius: "24px",
        padding: "2.5rem 2rem",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          margin: "0 auto 1.25rem",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i className="bi bi-shield-lock-fill text-white" style={{ fontSize: "1.5rem" }} />
      </div>

      <h1
        className="text-center mb-1"
        style={{ fontSize: "1.75rem", fontWeight: "700", color: "#0f172a" }}
      >
        Signora
      </h1>
      <p className="text-center mb-4" style={{ fontSize: "0.9rem", color: "#64748b" }}>
        Welcome back. Sign in to continue.
      </p>

      {(errorMsg || loginError) && (
        <div
          className="alert alert-danger alert-dismissible fade show mb-3 d-flex align-items-center"
          role="alert"
          style={{ borderRadius: "12px", fontSize: "0.875rem" }}
        >
          <i className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0" />
          <span className="flex-grow-1">{loginError || errorMsg}</span>
          <button
            type="button"
            className="btn-close"
            onClick={() => setLoginError("")}
            aria-label="Close"
          />
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="mb-3">
          <label className="form-label mb-1" style={{ fontWeight: "600", color: "#334155", fontSize: "0.875rem" }}>
            Username
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            name="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, [e.target.name]: e.target.value })
            }
            required
            style={{
              borderRadius: "12px",
              padding: "0.65rem 1rem",
              border: "1px solid #e2e8f0",
              fontSize: "0.9375rem",
            }}
          />
        </div>

        <div className="mb-4">
          <label className="form-label mb-1" style={{ fontWeight: "600", color: "#334155", fontSize: "0.875rem" }}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, [e.target.name]: e.target.value })
            }
            required
            style={{
              borderRadius: "12px",
              padding: "0.65rem 1rem",
              border: "1px solid #e2e8f0",
              fontSize: "0.9375rem",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn w-100 py-2 login-submit-btn text-white"
          disabled={isLoading}
          style={{
            borderRadius: "12px",
            fontWeight: "600",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            border: "none",
            letterSpacing: "0.02em",
            fontSize: "0.9375rem",
          }}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Logging in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;