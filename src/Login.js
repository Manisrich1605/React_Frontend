import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginBackground from "../src/assets/login.jpg"; // Import background image
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName] = useState("");
  const [lastName] = useState("");
  const [confirmpassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const adminEmail = "admin@localhost1.com";
  const adminPassword = "P@ssword1";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === adminEmail && password === adminPassword) {
        setLoginStatus("Admin login successful!");
        navigate("/Admin"); // Redirect admin upon successful login
      } else {
        const response = await axios.post(
          "http://localhost:5281/api/User/login",
          {
            email,
            password,
            firstName,
            lastName,
            confirmpassword,
          }
        );
        if (response.data === "Login successful") {
          setLoginStatus("User login successful!");
          navigate("/User"); // Redirect user upon successful login
          // Further actions upon successful login if needed
        } else {
          setLoginStatus("Invalid credentials");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.log("Error Response:", error.response.data);
      }
      setLoginStatus("Login failed");
    }
  };
  return (
    <>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          height: "100vh",
          backgroundImage: `url(${loginBackground})`, // Set background image
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div
          className="blur-background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            filter: "blur(5px)", // Apply blur effect only to the background
          }}
        />
        <div
          className="card shadow-lg p-4"
          style={{ backgroundColor: "transparent" ,width:"400px"}}
        >
          <h1 className="text-center mb-4 text-primary">Login</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="row">
              <div className="col-md-8 offset-md-4">
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-sm w-50"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          {loginStatus && <p className="text-danger mt-3">{loginStatus}</p>}
        </div>
      </div>
    </>
  );
};
export default Login;
