import React, { useState } from "react";
import logo1 from "../../assets/images/Logo1.png";
import logo2 from "../../assets/images/Logo2.png";
import google from "../../assets/images/google.png";
import { registerUserApi } from "../../apis/Api";
import { toast } from "react-toastify";

const Signup = () => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const titleOptions = [
    "Select your title",
    "Student",
    "Teacher",
    "Businessman",
    "Banker",
    "Trader",
    "Developer",
    "Engineer",
    "Doctor",
    "Consultant",
    "Entrepreneur",
    "Accountant",
    "Manager",
    "Designer",
    "Other",
  ];

  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [budgetError, setBudgetError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validate = () => {
    let isValid = true;

    if (username.trim() === "") {
      setUsernameError("Username is required!");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (title.trim() === "") {
      setTitleError("Title is required!");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (email.trim() === "") {
      setEmailError("Email is required!");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (budget.trim() === "") {
      setBudgetError("Budget is required!");
      isValid = false;
    } else {
      setBudgetError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required!");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required!");
      isValid = false;
    } else if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Passwords don't match!");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = { username, title, email, password, budget };

    registerUserApi(data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err.response) {
          toast.warning(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });
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
          <div className="col-md-6 pe-md-4 border-end">
            <div className="px-md-4">
              <h2
                className="text-center mb-4 fw-bold"
                style={{ fontSize: "24px", color: "#555" }}
              >
                Create Account
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control border-0 border-bottom rounded-0"
                      id="usernameInput"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="usernameInput" style={{ color: "#666" }}>
                      Username
                    </label>
                  </div>
                  {usernameError && (
                    <small className="text-danger">{usernameError}</small>
                  )}
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control border-0 border-bottom rounded-0"
                      id="emailInput"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="emailInput" style={{ color: "#666" }}>
                      Email
                    </label>
                  </div>
                  {emailError && (
                    <small className="text-danger">{emailError}</small>
                  )}
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <select
                      className="form-select border-0 border-bottom rounded-0"
                      id="titleSelect"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    >
                      {titleOptions.map((title, index) => (
                        <option
                          key={index}
                          value={index === 0 ? "" : title}
                          disabled={index === 0}
                        >
                          {title}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="titleSelect" style={{ color: "#666" }}>
                      Title
                    </label>
                  </div>
                  {titleError && (
                    <small className="text-danger">{titleError}</small>
                  )}
                </div>

                <div className="mb-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control border-0 border-bottom rounded-0"
                      id="budgetInput"
                      placeholder="Budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                    <label htmlFor="budgetInput" style={{ color: "#666" }}>
                      Budget
                    </label>
                  </div>
                  {budgetError && (
                    <small className="text-danger">{budgetError}</small>
                  )}
                </div>

                <div className="mb-4 position-relative">
                  <div className="form-floating">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border-0 border-bottom rounded-0 pe-5"
                      id="passwordInput"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="passwordInput" style={{ color: "#666" }}>
                      Password
                    </label>
                    <button
                      type="button"
                      className="btn position-absolute end-0 top-50 translate-middle-y bg-transparent border-0 text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex="-1"
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                        style={{ fontSize: "1.2rem" }}
                      ></i>
                    </button>
                  </div>
                  {passwordError && (
                    <small className="text-danger">{passwordError}</small>
                  )}
                </div>

                <div className="mb-4 position-relative">
                  <div className="form-floating">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control border-0 border-bottom rounded-0 pe-5"
                      id="confirmPasswordInput"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{
                        borderColor: passwordMatch ? "" : "#dc3545",
                      }}
                    />
                    <label
                      htmlFor="confirmPasswordInput"
                      style={{ color: "#666" }}
                    >
                      Confirm Password
                    </label>
                    <button
                      type="button"
                      className="btn position-absolute end-0 top-50 translate-middle-y bg-transparent border-0 text-muted"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      tabIndex="-1"
                    >
                      <i
                        className={`bi ${
                          showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                        style={{ fontSize: "1.2rem" }}
                      ></i>
                    </button>
                  </div>
                  {!passwordMatch && (
                    <small className="text-danger">
                      Passwords do not match
                    </small>
                  )}
                  {confirmPasswordError && (
                    <small className="text-danger">
                      {confirmPasswordError}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mb-4 py-3 fw-semibold shadow-sm"
                >
                  Sign Up
                </button>

                <div className="text-center" style={{ fontSize: "14px" }}>
                  Already have an account?{" "}
                  <a
                    href="/Login"
                    className="text-success text-decoration-none fw-semibold"
                  >
                    Login
                  </a>
                </div>
              </form>
            </div>
          </div>

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

export default Signup;
