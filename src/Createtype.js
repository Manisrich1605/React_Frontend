import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
const CreateLeaveTypeForm = () => {
  const [name, setName] = useState("");
  const [defaultDays, setDefaultDays] = useState("");
  const [errors, setErrors] = useState({});
  const [leaveTypes, setLeaveTypes] = useState([]);
  const navigate = useNavigate();
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!defaultDays.trim()) {
      errors.defaultDays = "Default Days is required";
      isValid = false;
    } else if (isNaN(defaultDays) || parseInt(defaultDays) <= 0) {
      errors.defaultDays = "Please enter a valid number of days";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get("http://localhost:5281/api/LeaveTypess")
      .then((result) => {
        setLeaveTypes(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clear = () => {
    setName("");
    setDefaultDays("");
  };
  const handleSave = () => {
    const url = "http://localhost:5281/api/LeaveTypess";
    const data = {
      name: name,
      defaultDays: defaultDays,
    };
    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        navigate("/LeaveRequestCRUD");
        toast.success("LeaveType added successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const newLeaveType = {
        id: leaveTypes.length + 1,
        name,
        defaultDays: parseInt(defaultDays),
      };
      setLeaveTypes([...leaveTypes, newLeaveType]);
      setName("");
      setDefaultDays("");
    } else {
      console.log("Form has validation errors");
    }
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#3e5569" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Leave Management System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/Createtype">
                  Create New
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <div className="row">
          <nav
            className="col-md-2 d-none d-md-block sidebar"
            style={{
              backgroundColor: "#f8f9fa",
              height: "100vh",
              width: "220px",
            }}
          >
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <br />
                  <br />
                  <a className="nav-link" href="/Admin">
                    <p style={{ fontSize: "18px" }}>
                      <FaHome />
                      &emsp;Home
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Employee">
                    <p style={{ fontSize: "18px" }}>
                      <FaUser />
                      &emsp;Employees
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/LeaveRequestCRUD">
                    <p style={{ fontSize: "18px" }}>
                      <IoInformationCircle />
                      &emsp;Leavetype
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/LeavetypeCRUD">
                    <p style={{ fontSize: "18px" }}>
                      <AiOutlineTable />
                      &emsp;Leaverequest
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Layout">
                    <p style={{ fontSize: "18px" }}>
                      <BiLogOut />
                      &emsp;Logout
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 px-4"
            style={{ backgroundColor: "#def2f0" }}
          >
            <div className="m-4">
              <h1>Create Leave Type</h1>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    id="Name"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="DefaultDays">Default Days</label>
                  <input
                    type="text"
                    id="DefaultDays"
                    className={`form-control ${
                      errors.defaultDays ? "is-invalid" : ""
                    }`}
                    value={defaultDays}
                    onChange={(e) => setDefaultDays(e.target.value)}
                  />
                  {errors.defaultDays && (
                    <span className="text-danger">{errors.defaultDays}</span>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => handleSave()}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default CreateLeaveTypeForm;
