import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { Card } from "react-bootstrap";
import axios from "axios";
const Admin = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5281/api/LeaveTypess")
      .then((response) => {
        setLeaveTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching LeaveTypess:", error);
      });
  }, []);
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
          <div
            className="w-100 card border-0 p-4"
            style={{ backgroundColor: "#def2f0" }}
          >
            <div
              className="card-header ml-0 py-3"
              style={{ backgroundColor: "#def2f0" }}
            >
              <div className="row">
                <div className="col-12"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              {leaveTypes.map((leaveType) => (
                <div key={leaveType.id} className="col-md-4">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title style={{ color: "#dd3c8c" }}>
                        {leaveType.name}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "20px", color:"#905fe9"}}>
                        Default Days: {leaveType.defaultDays}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Admin;
