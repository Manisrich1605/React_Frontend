import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";

import { Table, Modal, Button, Row, Col } from "react-bootstrap";
const LeaveRequestCRUD = () => {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [editname, setEditName] = useState("");
  const [editdefaultDays, setEditDefaultDays] = useState("");
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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
      .get("http://localhost:5281/api/LeaveTypess")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEdit = (id) => {
    setShow(true);
    axios
      .get(`http://localhost:5281/api/LeaveTypess/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditDefaultDays(result.data.defaultDays);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5281/api/LeaveTypess/${id}`)
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
  const handleUpdate = () => {
    const url = `http://localhost:5281/api/LeaveTypess/${editId}`;
    const data = {
      id: editId,
      name: editname,
      defaultDays: editdefaultDays,
    };
    axios
      .put(url, data)
      .then((result) => {
        setShow(false);
        getData();
        clear();
        toast.success("LeaveType has been updated successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleShowDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };
  const clear = () => {
    setEditName("");
    setEditDefaultDays("");
    setEditId("");
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Leave Type Name",
        accessor: "name",
      },
      {
        Header: "Default Number of Days",
        accessor: "defaultDays",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="btn-group" role="group">
            <button
              className="btn btn-warning"
              onClick={() => handleEdit(row.original.id)}
            >
              <FaEdit />
            </button>{" "}
            <button
              className="btn btn-primary"
              onClick={() => handleShowDetails(row.original)}
            >
              <FiAlertCircle />
            </button>
            <Button
              className="btn btn-danger"
              onClick={() => {
                setShowDeleteConfirmation(true);
                setEditId(row.original.id);
              }}
            >
              <MdDelete />
            </Button>
          </div>
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
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
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
              <h2 className="text-black">Index</h2>
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
      {/* Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit LeaveType</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Leave Type Name"
                value={editname}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Number of Default Days"
                value={editdefaultDays}
                onChange={(e) => setEditDefaultDays(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete LeaveType</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this LeaveType?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(editId);
              setShowDeleteConfirmation(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Type Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <p>Name: {selectedItem.name}</p>
              <p>Default Days: {selectedItem.defaultDays}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};
export default LeaveRequestCRUD;
