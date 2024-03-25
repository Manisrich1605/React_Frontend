import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import type from "../src/assets/type.jpg";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [dateJoinedError, setDateJoinedError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFirstName();
    validateLastName();
    validateDateOfBirth();
    validateDateJoined();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    if (
      !firstNameError &&
      !lastNameError &&
      !dateOfBirthError &&
      !dateJoinedError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      const url = "http://localhost:5281/api/User/reg";
      const data = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        dateJoined: dateJoined,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      axios
        .post(url, data)
        .then((result) => {
          toast.success("Registration successful");
          clear();
        })
        .catch((error) => {
          toast.error("Registration failed");
        });
    }
  };
  const clear = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setDateJoined("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const validateFirstName = () => {
    if (!firstName) {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
  };
  const validateLastName = () => {
    if (!lastName) {
      setLastNameError("Last Name is required");
    } else {
      setLastNameError("");
    }
  };
  const validateDateOfBirth = () => {
    if (!dateOfBirth) {
      setDateOfBirthError("Date of Birth is required");
    } else {
      setDateOfBirthError("");
    }
  };
  const validateDateJoined = () => {
    if (!dateJoined) {
      setDateJoinedError("Date Joined is required");
    } else {
      setDateJoinedError("");
    }
  };
  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one digit");
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError(
        "Password must contain at least one special character: !@#$%^&*"
      );
    } else {
      setPasswordError("");
    }
  };
  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };
  return (
    <div className="m-4">
      <Container>
        <Row>
          <Col md={4} className="p-0">
            <Card>
              <Card.Img variant="top" src={type} style={{ height: "560px" }} />
            </Card>
          </Col>
          <Col md={8} className="p-0">
            <Card>
              <Card.Body style={{ backgroundColor: "#d3d9db" }}>
                <h1 className="text-center mb-4">Registration Form</h1>
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-md-8 offset-md-2">
                      <form onSubmit={handleSubmit}>
                        <hr />
                        <div className="row">
                          <div className="col-md-6">
                            <label className="form-label small">
                              First Name
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                firstNameError ? "is-invalid" : ""
                              }`}
                              aria-required="true"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              onBlur={validateFirstName}
                              required
                            />
                            {firstNameError && (
                              <div className="invalid-feedback">
                                {firstNameError}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label small">
                              Last Name
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                lastNameError ? "is-invalid" : ""
                              }`}
                              aria-required="true"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              onBlur={validateLastName}
                              required
                            />
                            {lastNameError && (
                              <div className="invalid-feedback">
                                {lastNameError}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label small">
                              Date Of Birth
                            </label>
                            <input
                              type="date"
                              className={`form-control ${
                                dateOfBirthError ? "is-invalid" : ""
                              }`}
                              aria-required="true"
                              value={dateOfBirth}
                              onChange={(e) => setDateOfBirth(e.target.value)}
                              onBlur={validateDateOfBirth}
                              required
                            />
                            {dateOfBirthError && (
                              <div className="invalid-feedback">
                                {dateOfBirthError}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label small">
                              Date Joined
                            </label>
                            <input
                              type="date"
                              className={`form-control ${
                                dateJoinedError ? "is-invalid" : ""
                              }`}
                              aria-required="true"
                              value={dateJoined}
                              onChange={(e) => setDateJoined(e.target.value)}
                              onBlur={validateDateJoined}
                              required
                            />
                            {dateJoinedError && (
                              <div className="invalid-feedback">
                                {dateJoinedError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <label className="form-label small">Email</label>
                            <input
                              type="email"
                              className={`form-control ${
                                emailError ? "is-invalid" : ""
                              }`}
                              autoComplete="username"
                              aria-required="true"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onBlur={validateEmail}
                              required
                            />
                            {emailError && (
                              <div className="invalid-feedback">
                                {emailError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <label className="form-label small">Password</label>
                            <input
                              type="password"
                              className={`form-control ${
                                passwordError ? "is-invalid" : ""
                              }`}
                              aria-required="true"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onBlur={validatePassword}
                              required
                            />
                            {passwordError && (
                              <div className="invalid-feedback">
                                {passwordError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <label className="form-label small">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className={`form-control ${
                                confirmPasswordError ? "is-invalid" : ""
                              }`}
                              aria-required="true"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              onBlur={validateConfirmPassword}
                              required
                            />
                            {confirmPasswordError && (
                              <div className="invalid-feedback">
                                {confirmPasswordError}
                              </div>
                            )}
                          </div>
                        </div>
                        <br />
                        <div className="row">
                          <div className="col-md-8 offset-md-4">
                            <button
                              type="submit"
                              className="btn btn-outline-primary btn-sm w-50"
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};
export default Register;
