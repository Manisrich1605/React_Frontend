import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import { AiOutlineTable } from "react-icons/ai";
const LeaveRequestCreateForm = () => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [requestComments, setRequestComments] = useState("");
  const [approved, setApproved] = useState("Pending");
  const [employee, setEmployee] = useState("");
  const [dateRequested, setDateRequested] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleSave = (e) => {
    e.preventDefault();
    const url = "http://localhost:5281/api/LeaveRequest";
    const data = {
      leaveType,
      startDate,
      endDate,
      requestComments,
      approved,
      employee,
      dateRequested,
    };
    axios
      .post(url, data)
      .then(() => {
        setLeaveType("");
        setStartDate("");
        setEndDate("");
        setRequestComments("");
        setEmployee("");
        setDateRequested("");
        toast.success("Leave request created successfully");
        navigate("/LeavetypeCRUD");
      })
      .catch((error) => {
        console.error("Error creating leave request:", error);
        toast.error("Failed to create leave request");
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    console.log("Fetching data...");
    axios
      .get("http://localhost:5281/api/LeaveTypess")
      .then((result) => {
        console.log("Data fetched successfully:", result.data);
        setData(result.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
                  <a
                    className="nav-link active"
                    href="/User"
                  >
                    <p style={{ fontSize: "18px" }}>
                      <FaHome />
                      &emsp;Home
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/Create"
                  >
                    <p style={{ fontSize: "18px" }}>
                    <IoCreate />
                      &emsp;Apply for Leave
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/Myleave"
                  >
                    <p style={{ fontSize: "18px" }}>
                    <AiOutlineTable />
                      &emsp;Myleave
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/Layout"
                  >
                    <p style={{ fontSize: "18px" }}>
                      <BiLogOut />
                      &emsp;Logout
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {/* Main Content */}
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 px-4"
            style={{ backgroundColor: "#def2f0" }}
          >
            <div className="m-4">
              <h1 className="mt-4">Apply For Leave</h1>
              <hr />

              <form onSubmit={handleSave}>
                {/* Leave Type */}
                <div className="form-group">
                  <label htmlFor="leaveType">Leave Type</label>
                  <select
                    id="leaveType"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select Leave Type</option>
                    {data.map((leaveType) => (
                      <option key={leaveType.id} value={leaveType.name}>
                        {leaveType.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Start Date and End Date */}
                <div className="form-group row">
                  <div className="col">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                {/* Employee */}
                <div className="form-group">
                  <label htmlFor="employee">Employee</label>
                  <input
                    id="employee"
                    type="text"
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    className="form-control"
                  />
                </div>
                {/* Request Comments */}
                <div className="form-group">
                  <label htmlFor="requestComments">Request Comments</label>
                  <textarea
                    id="requestComments"
                    value={requestComments}
                    onChange={(e) => setRequestComments(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
                {/* Date Requested */}
                <div className="form-group">
                  <label htmlFor="dateRequested">Date Requested</label>
                  <input
                    id="dateRequested"
                    type="date"
                    value={dateRequested}
                    onChange={(e) => setDateRequested(e.target.value)}
                    className="form-control"
                  />
                </div>
                {/* Approved */}
                <div className="form-group">
                  <label htmlFor="approved">Approved</label>
                  <select
                    id="approved"
                    value={approved}
                    onChange={(e) => setApproved(e.target.value)}
                    className="form-select"
                    disabled
                  >
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                {/* Submit Button */}
                <div className="form-group p-2">
                  <button className="btn btn-dark m-2">Cancel</button>
                  <input
                    type="submit"
                    value="Create"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default LeaveRequestCreateForm;
