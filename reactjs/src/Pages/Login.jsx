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

  const { isLoading, errorMsg, login } = useLogin();
  const getAccessToken = useAuthToken();
  const navigator = useNavigate();

  const onSubmit = async () => {
    const response = await login(credentials);
    setLoginResponse(response);
    if (response?.status !== "Bad request") {
      await getAccessToken(credentials);
    }
    console.log("responnmmnse", response);
  };

  useEffect(() => {
    if (errorMsg !== "") {
      return;
    }
    console.log("useeffect");
    if (loginResponse !== undefined || loginResponse !== null) {
      console.log("login", loginResponse);
      if (loginResponse?.role?.toLowerCase() === "student") {
        console.log("student");
        navigator("/student");
      } else if (loginResponse?.role?.toLowerCase() === "staff") {
        console.log("staff");
      }
    }
  }, [loginResponse]);

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
          <div className="ErrorTest">{errorMsg}</div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="username"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <button
            className="btn btn-primary w-100 mb-3"
            onClick={() => onSubmit()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
