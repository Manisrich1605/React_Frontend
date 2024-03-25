import React from "react";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import { AiOutlineTable } from "react-icons/ai";

const User = () => {
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
        </div>
      </nav>
      <div className="container-fluid">
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
                  <a className="nav-link" href="/User">
                    <p style={{ fontSize: "18px" }}>
                      <FaHome />
                      &emsp;Home
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Create">
                    <p style={{ fontSize: "18px" }}>
                      <IoCreate />
                      &emsp;Apply for Leave
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Myleave">
                    <p style={{ fontSize: "18px" }}>
                      <AiOutlineTable />
                      &emsp;Myleave
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
        </div>
      </div>
    </div>
  );
};
export default User;
