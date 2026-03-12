import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { useAuthToken } from "../hooks/useAuthToken";
import loginImage from "../Image/loginImage.jpeg";
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
className="d-flex justify-content-center align-items-center"
style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}
>
<div
className="shadow bg-white rounded d-flex"
style={{ width: "800px", overflow: "hidden" }}
>

<img
src={loginImage}
alt="Login"
style={{ width: "350px", height: "350px", objectFit: "contain" }}
/>



    <div className="py-5 px-4 w-100">
      {(errorMsg || loginError) && (
        <div
          className="alert alert-danger alert-dismissible fade show mb-3"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <strong>Error:</strong> {loginError || errorMsg}
          <button
            type="button"
            className="btn-close"
            onClick={() => setLoginError("")}
            aria-label="Close"
          ></button>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            name="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mb-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  </div>
</div>

);
}

export default Login;