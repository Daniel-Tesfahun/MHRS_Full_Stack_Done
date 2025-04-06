import React from "react";
import { Link } from "react-router-dom";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar";

function DashBoard() {
  return (
    <div className="dashboard-container">
      <NavBar />
      <nav className="dashboard-nav">
        <div className="profile-card profile-shadow">
          <span>Name</span>
          <div className="profile-details">Daniel Tesfahun</div>

          <span>Role</span>
          <div className="profile-details">Admin</div>
        </div>
        <Link to="/updateAdmin" className="dd">
          Edit
        </Link>
        <div className="hor-line"></div>
        <ul>
          <li>
            <Link to="/">Overview</Link>
          </li>
          <li>
            <Link to="/">Approve Reservations</Link>
          </li>
          <li>
            <Link to="/addHall">Add New Hall</Link>
          </li>
          <li>
            <Link to="/updateHall">Display Hall</Link>
          </li>
          <li>
            <Link to="/register">Add New Admin</Link>
          </li>
          <li>
            <Link to="/displayAdmins">Display Admins</Link>
          </li>
          <li className="logout">
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <p>Welcome to the admin dashboard!</p>
        <div className="dashboard-detail-contents">
          <div className="dashboard-detail-content">
            <h3>Overview</h3>
            <p>Here you can manage all aspects of the system.</p>
          </div>
          <div className="dashboard-detail-content">
            <h3>Display Admins</h3>
            <p>View and manage existing admins.</p>
          </div>
          <div className="dashboard-detail-content">
            <h3>Add New Admin</h3>
            <p>Add new admins to the system.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
