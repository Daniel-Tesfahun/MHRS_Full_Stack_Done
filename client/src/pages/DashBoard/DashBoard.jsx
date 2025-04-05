import React from "react";
import { Link } from "react-router-dom";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar";

function DashBoard() {
  return (
    <div className="dashboard-container">
      <NavBar />
      <nav className="dashboard-nav">
        <ul>
          <li>
            <Link to="/overview">Overview</Link>
          </li>
          <li>
            <Link to="/displayAdmin">Display Admins</Link>
          </li>
          <li>
            <Link to="/newAdmin">Add New Admin</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <p>Welcome to the admin dashboard!</p>
      </div>
    </div>
  );
}

export default DashBoard;
