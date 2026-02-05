import { useState } from "react";
import login from "../Image/login.jpeg";

function Login() {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const onSubmit = () => {
    // setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };
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
            src={login}
            alt="Login"
            style={{ width: "350px", height: "350px", objectFit: "contain" }}
          />
        </div>

        <div className="py-5 px-4 w-100">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="userName"
              onChange={(e) =>
                setCredentials({
                  //   ...credentials,
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
