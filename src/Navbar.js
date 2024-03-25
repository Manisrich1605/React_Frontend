import React from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoCreate, IoInformationCircle } from "react-icons/io5";
import { AiOutlineTable } from "react-icons/ai";
import { useLocation } from "react-router-dom";
const Navbar = ({ isAdmin, firstName }) => {
 const links = isAdmin
   ? [
       { path: "/Admin", text: "Home", icon: <FaHome /> },
       { path: "/Employee", text: "Employees", icon: <FaUser /> },
       { path: "/LeaveRequestCRUD", text: "Leave Requests", icon: <IoInformationCircle /> },
       { path: "/LeavetypeCRUD", text: "Leave Types", icon: <AiOutlineTable /> },
     ]
   : [
       { path: "/User", text: "Home", icon: <FaHome /> },
       { path: "/Create", text: "Apply for Leave", icon: <IoCreate /> },
       { path: "/Myleave", text: "My Leave", icon: <AiOutlineTable /> },
     ];
 return (
<nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#3e5569" }}>
<div className="container-fluid">
<a className="navbar-brand" href="/">
         Leave Management System
</a>
<div className="collapse navbar-collapse" id="navbarNav">
<ul className="navbar-nav ml-auto">
           {links.map((link, index) => (
<li className="nav-item" key={index}>
<a className="nav-link" href={link.path}>
<p style={{ fontSize: "18px" }}>
                   {link.icon} &emsp;{link.text}
</p>
</a>
</li>
           ))}
<li className="nav-item">
<span className="nav-link">Hello, {firstName}</span>
</li>
<li className="nav-item">
<a className="nav-link" href="/Layout">
<p style={{ fontSize: "18px" }}>
<BiLogOut /> &emsp;Logout
</p>
</a>
</li>
</ul>
</div>
</div>
</nav>
 );
};
export default Navbar;