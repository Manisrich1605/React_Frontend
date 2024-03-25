import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Card } from "react-bootstrap";
import { AiOutlineTable } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
const LeavetypeCRUD = () => {
  const [data, setData] = useState([]);
  const [, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [, setScreenSize] = useState(window.innerWidth);
  const updateScreenSize = () => {
    setScreenSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5281/api/LeaveRequest")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);
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
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#e7c45a";
      case "accepted":
        return "green";
      case "rejected":
        return "red";
      default:
        return "transparent";
    }
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Employee",
        accessor: "employee",
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "End Date",
        accessor: "endDate",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Leave Type",
        accessor: "leaveType",
      },
      {
        Header: "Date Requested",
        accessor: "dateRequested",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Status",
        accessor: "approved",
        Cell: ({ value }) => (
          <span style={{ backgroundColor: getStatusColor(value) }}>
            {value}
          </span>
        ),
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <>
            {row.original.approved !== "Accepted" &&
              row.original.approved !== "Rejected" && (
                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={() =>
                      handleAction(row.original.id, "Accepted", row.original)
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleAction(row.original.id, "Rejected", row.original)
                    }
                  >
                    Reject
                  </button>
                </>
              )}
          </>
        ),
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 4 }, // Start at first page and set page size
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const handleAction = (id, status, item) => {
    if (!isNaN(id) && id > 0) {
      updateLeaveRequest(id, status, item);
    } else {
      console.log("Invalid id:", id);
    }
  };

  const updateLeaveRequest = (id, status, item) => {
    const requestData = {
      id: item.id, // Ensure the ID in the request body matches the one in the URL
      approved: status,
      employee: item.employee,
      startDate: item.startDate, // Include other required fields here
      endDate: item.endDate,
      leaveType: item.leaveType,
      dateRequested: item.dateRequested,
    };
    axios
      .put(`http://localhost:5281/api/LeaveRequest/${id}`, requestData)
      .then(() => {
        setData((prevData) =>
          prevData.map((prevItem) =>
            prevItem.id === id ? { ...prevItem, approved: status } : prevItem
          )
        );
      })
      .catch((error) => {
        console.log(error);
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
            <div
              className="w-100 card border-0 p-4"
              style={{ backgroundColor: "#def2f0" }}
            >
              <div>
                <div className="row">
                  {leaveTypes.map((leaveType) => (
                    <div key={leaveType.id} className="col-md-4">
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Title style={{ color: "#dd3c8c" }}>
                            {leaveType.name}
                          </Card.Title>
                          <Card.Text>
                            Default Days: {leaveType.defaultDays}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="card-header ml-0 py-3"
                style={{ backgroundColor: "#def2f0" }}
              >
                <div className="row">
                  <div className="col-12">
                    <h2 className="text-black py-2">Leave Request Log</h2>
                  </div>
                </div>
              </div>
              <div className="card-body border p-4">
                <div className="row pb-3">
                  <div className="col-6 offset-6 text-end">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                      value={globalFilter || ""}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                  </div>
                </div>
                <ToastContainer />
                <Table striped bordered hover {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <style jsx>{`
                  @media (max-width: 768px) {
                    table {
                      display: block;
                      width: 100%;
                      overflow-x: auto;
                    }

                    th,
                    td {
                      white-space: nowrap;
                    }

                    th {
                      padding: 0.75rem 0.5rem;
                    }

                    td {
                      padding: 0.75rem;
                    }

                    th:first-of-type,
                    td:first-of-type {
                      border-left: 0;
                    }

                    th:last-of-type,
                    td:last-of-type {
                      border-right: 0;
                    }

                    th:nth-of-type(2n),
                    td:nth-of-type(2n) {
                      border-right: 0;
                    }
                  }
                `}</style>
                <div>
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Previous Page
                  </button>{" "}
                  <span>
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                    </strong>{" "}
                  </span>
                  <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next Page
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default LeavetypeCRUD;
