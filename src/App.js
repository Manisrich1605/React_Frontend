//import logo from './logo.svg';
import "./App.css"; //import statements for the components
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import Myleave from "./Myleave";
import Create from "./Create";
import Edit from "./Edit";
import Createtype from "./Createtype";
import Edittype from "./Edittype";
import LeavetypeCRUD from "./LeavetypeCRUD";
import LeaveRequestCRUD from "./LeaveRequestCRUD";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Admin from "./Admin";
import User from "./User";
import Employee from "./Employee";
import Navbar from "./Navbar";

//path empty means stay constant for all
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register></Register>}></Route>
          <Route path="/Myleave" element={<Myleave />}></Route>
          <Route path="/Create" element={<Create />}></Route>
          <Route path="/Edittype" element={<Edittype />}></Route>
          <Route path="/Edit" element={<Edit />}></Route>
          <Route path="/LeavetypeCRUD" element={<LeavetypeCRUD />}></Route>
          <Route path="/Createtype" element={<Createtype />}></Route>
          <Route
            path="/LeaveRequestCRUD"
            element={<LeaveRequestCRUD />}
          ></Route>
          <Route path="/Admin" element={<Admin />}></Route>
          <Route path="/User" element={<User />}></Route>
          <Route path="" element={<Layout />}></Route>
          <Route path="/Layout" element={<Layout />}></Route>
          <Route path="/Employee" element={<Employee />}></Route>
          <Route path="/Navbar" element={<Navbar />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
