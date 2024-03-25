import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { AiOutlineTable } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
const Employee = () => {
  const [data, setData] = useState([]);
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
    getData();
  }, []);
  const getData = () => {
    axios
      .get("http://localhost:5281/api/User")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Date Joined",
        accessor: "dateJoined",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
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
      initialState: { pageIndex: 0, pageSize: 5 }, // Start at first page and set page size
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
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
                <div className="col-12">
                  <h2 className="text-black py-2">Employees</h2>
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
                {headerGroups.map((headerGroup) => (
                  <thead {...headerGroup.getHeaderGroupProps()}>
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
                  </thead>
                ))}

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
                  Page <strong>{pageIndex + 1}</strong> of{" "}
                  <strong>{Math.ceil(data.length / pageSize)}</strong>{" "}
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
  );
};
export default Employee;
