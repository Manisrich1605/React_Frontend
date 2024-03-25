import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Modal, Button } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import { AiOutlineTable } from "react-icons/ai";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
const LeavetypeCRUD = () => {
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
        Cell: ({ value, row }) =>
          row.original.approved === "pending" ? (
            <button
              onClick={() => {
                setShowDeleteConfirmation(true);
                setEditId(row.original.id);
              }}
              style={{
                backgroundColor: "#f36060",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                fontSize: "16px",
              }}
            >
              Cancel
            </button>
          ) : (
            <button disabled>{row.original.approved}</button>
          ),
      },
    ],
    []
  );
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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editId, setEditId] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get("http://localhost:5281/api/LeaveRequest")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5281/api/LeaveRequest/${id}`)
      .then((result) => {
        if (result.status === 200) {
          toast.success("LeaveType has been deleted successfully");
          getData();
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
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
      initialState: { pageIndex: 0, pageSize: 4 },
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
                  <a className="nav-link active" href="/User">
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
      {/* Cancel Modal */}
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this leave request?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(editId);
              setShowDeleteConfirmation(false);
            }}
          >
            Cancel Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default LeavetypeCRUD;
