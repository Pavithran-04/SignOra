import { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { useAuthToken } from "../hooks/useAuthToken";
import useStudentService from "../hooks/useStudentService";
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
  const { getRequestDetails, getStudent } = useStudentService();
  const navigator = useNavigate();

  const onSubmit = async () => {
    // Clear previous errors
    setLoginError("");

    // Validate empty fields
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setLoginError("Please enter both username and password");
      return;
    }

    try {
      const response = await login(credentials);

      // Check if response indicates an error (backend returns 200 OK but with error status in body)
      if (
        response?.status === "Bad Request" ||
        response?.status === "BAD_REQUEST"
      ) {
        // Extract error message from validationErrorInfo
        let errorMessage =
          "Invalid credentials. Please check your username and password.";
        if (
          response?.validationErrorInfo &&
          Array.isArray(response.validationErrorInfo) &&
          response.validationErrorInfo.length > 0
        ) {
          errorMessage =
            response.validationErrorInfo[0].message || errorMessage;
        }
        setLoginError(errorMessage);
        setLoginResponse(null);
        return;
      }

      // Only set response if it's a successful login (has role field)
      if (response?.role) {
        setLoginResponse(response);
      } else {
        setLoginError("Invalid response from server. Please try again.");
        setLoginResponse(null);
      }
    } catch (error) {
      // Handle login errors
      let errorMessage = "Login failed. Please check your credentials.";


      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data;

        // Check for ValidationErrorResponse structure (from GlobalExceptionHandler)
        if (
          errorData?.validationErrorInfo &&
          Array.isArray(errorData.validationErrorInfo) &&
          errorData.validationErrorInfo.length > 0
        ) {
          errorMessage =
            errorData.validationErrorInfo[0].message || errorMessage;
        }
        // Check for direct message field
        else if (errorData?.message) {
          errorMessage = errorData.message;
        }
        // Check for error field
        else if (errorData?.error) {
          errorMessage = errorData.error;
        }
        // Check for status codes
        else if (
          error.response.status === 401 ||
          error.response.status === 403
        ) {
          errorMessage = "Invalid username or password";
        }
        // Check if status is "Bad Request" in response
        else if (errorData?.status === "Bad Request") {
          errorMessage =
            "Invalid credentials. Please check your username and password.";
        }
      } else if (error.message) {
        // Network or other errors
        if (error.message.includes("Username or Password")) {
          errorMessage = "Invalid username or password";
        } else {
          errorMessage = error.message;
        }
      }

      setLoginError(errorMessage);
      setLoginResponse(null);
    }
  };

  const getAuthToken = async () => {
    try {
      const response = await getAccessToken(credentials);
      // Check if token is null or invalid
      if (!response || !response.token) {
        console.error("Failed to get access token");
        setLoginError("Failed to authenticate. Please try again.");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error getting auth token:", error);
      setLoginError("Failed to authenticate. Please try again.");
      return false;
    }
  };

  useEffect(() => {
    const handleLoginSuccess = async () => {
      // Don't proceed if there's an error message or invalid response
      if (errorMsg !== "" || loginError !== "") {
        return;
      }
      // Check if response indicates an error
      if (
        loginResponse?.status === "Bad Request" ||
        loginResponse?.status === "BAD_REQUEST" ||
        loginResponse?.status === "Bad request"
      ) {
        // Extract error message from validationErrorInfo
        let errorMessage = "Invalid credentials. Please try again.";
        if (
          loginResponse?.validationErrorInfo &&
          Array.isArray(loginResponse.validationErrorInfo) &&
          loginResponse.validationErrorInfo.length > 0
        ) {
          errorMessage =
            loginResponse.validationErrorInfo[0].message || errorMessage;
        }
        setLoginError(errorMessage);
        return;
      }

      // Only proceed if we have a valid successful response with role
      if (
        loginResponse !== undefined &&
        loginResponse !== null &&
        !loginError &&
        loginResponse?.role
      ) {
        
        // Wait for token to be stored before navigating
        const tokenSuccess = await getAuthToken();
        if (!tokenSuccess) {
          // Token retrieval failed, don't proceed with navigation
          return;
        }
        const role = loginResponse?.role?.toUpperCase();
        if (role === "STUDENT") {
          // Fetch student info during login
          try {
            // First get forms to get studentId
            const formsResponse = await getRequestDetails({
              identifier: loginResponse.id,
              role: "STUDENT",
            });

            const studentId = formsResponse.data?.studentId;
            if (studentId) {
              // Call getStudent API to get student details
              const studentResponse = await getStudent({ studentId });
              const studentData = studentResponse.data;
              if (studentData) {
                // Store student info in localStorage
                const studentInfo = {
                  name: `${studentData.firstName || ""} ${studentData.lastName || ""}`.trim(),
                  rollNo: studentData.rollNo || "",
                };
                localStorage.setItem(
                  "studentInfo",
                  JSON.stringify(studentInfo),
                );
              }
            }
          } catch (err) {
            console.error("Error fetching student info during login:", err);
          }

          navigator(`/student?id=${loginResponse?.id}`);
        } else if (role === "FACULTY") {
          navigator(`/faculty?id=${loginResponse?.id}`);
        } else if (role === "HOD") {
          navigator(`/hod?id=${loginResponse?.id}`);
        } else if (role === "PRINCIPAL") {
          navigator(`/principal?id=${loginResponse?.id}`);
        } else if (role === "ADMIN") {
          navigator(`/admin`);
        }
      }
    };

    handleLoginSuccess();
  }, [loginResponse, errorMsg, loginError]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}
    >
      <div
        className="shadow bg-white rounded d-flex"
        style={{ width: "800px", overflow: "hidden" }}
      >
        <div className="d-flex align-items-center justify-content-center px-4">
          <img
            src={loginImage}
            alt="Login"
            style={{ width: "350px", height: "350px", objectFit: "contain" }}
          />
        </div>

        <div className="py-5 px-4 w-100">
          {/* Error Alert */}
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
                onClick={() => {
                  setLoginError("");
                }}
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
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    [e.target.name]: e.target.value,
                  });
                  // Clear error when user starts typing
                  if (loginError) setLoginError("");
                }}
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
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    [e.target.name]: e.target.value,
                  });
                  // Clear error when user starts typing
                  if (loginError) setLoginError("");
                }}
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
                    aria-hidden="true"
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
