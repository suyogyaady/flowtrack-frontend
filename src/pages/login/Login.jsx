import React, { useState } from "react";
import logo1 from "../../assets/images/Logo1.png";
import logo2 from "../../assets/images/Logo2.png";
import google from "../../assets/images/google.png";
import { loginUserApi } from "../../apis/Api";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleEmail = (e) => setEmail(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const validate = () => {
    let isValid = true;

    if (email.trim() === "") {
      setEmailError("Email is required!");

      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required!");

      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    console.log("Login button clicked!");
    e.preventDefault();

    if (!validate()) return;

    loginUserApi({ email, password })
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);

          localStorage.setItem("token", res.data.token);

          localStorage.setItem("user", JSON.stringify(res.data.userData));

          window.location.href = res.data.userData.isAdmin
            ? "/admin/dashboard"
            : "/dashboard";
        }
      })

      .catch(() => toast.error("Login failed"));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "2rem 0",
      }}
    >
      <div className="row w-75 bg-white shadow-lg rounded-3 position-relative overflow-hidden">
        {/* Top Logo */}
        <div className="col-12 d-flex justify-content-center pt-4 pb-3">
          <img
            src={logo1}
            className="img-fluid"
            style={{
              maxWidth: "400px",
              transform: "scale(0.9)",
            }}
            alt="Logo 1"
          />
        </div>

        <div className="row p-4">
          {/* Left Section */}
          <div className="col-md-6 pe-md-4 border-end">
            <div className="px-md-4">
              <h2
                className="text-center mb-4 fw-bold"
                style={{ fontSize: "24px", color: "#555" }}
              >
                Welcome Back
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control border-0 border-bottom rounded-0"
                      id="emailInput"
                      placeholder="Email"
                      onChange={handleEmail}
                    />
                    <label htmlFor="emailInput" style={{ color: "#666" }}>
                      Email
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-floating position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border-0 border-bottom rounded-0 pe-5"
                      id="passwordInput"
                      placeholder="Password"
                      onChange={handlePassword}
                    />
                    <label htmlFor="passwordInput" style={{ color: "#666" }}>
                      Password
                    </label>
                    <button
                      type="button"
                      className="btn position-absolute end-0 top-50 translate-middle-y bg-transparent border-0 text-secondary"
                      onClick={togglePassword}
                      style={{ padding: "0 10px", zIndex: 5 }}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash fs-5"></i>
                      ) : (
                        <i className="bi bi-eye fs-5"></i>
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-end mb-4">
                  <a
                    href="#"
                    className="text-primary text-decoration-none"
                    style={{ fontSize: "14px" }}
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  onClick={handleSubmit}
                  className="btn btn-success w-100 mb-4 py-3 fw-semibold shadow-sm"
                >
                  Login
                </button>
              </form>

              <div className="position-relative mb-4">
                <hr className="text-muted" />
                <span
                  className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted"
                  style={{ fontSize: "14px" }}
                >
                  Or continue with
                </span>
              </div>

              <button
                className="btn btn-outline-secondary w-100 py-3 d-flex align-items-center justify-content-center mb-4 shadow-sm"
                style={{ transition: "all 0.3s ease" }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#f8f9fa")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <img
                  src={google}
                  alt="Google"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
                Login with Google
              </button>

              <div className="text-center" style={{ fontSize: "14px" }}>
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-success text-decoration-none fw-semibold"
                >
                  Sign up now
                </a>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
            <img
              src={logo2}
              alt="FlowTrack Logo"
              className="img-fluid"
              style={{
                maxWidth: "450px",
                transform: "scale(0.9)",
                animation: "float 3s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style>
        {`
          @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .form-control:focus {
            box-shadow: none;
            border-color: #198754;
          }

          .btn-success, .btn-outline-secondary {
            border-radius: 8px;
          }

          .form-control::placeholder {
            color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
