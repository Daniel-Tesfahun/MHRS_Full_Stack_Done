import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar";
import { getAdminById } from "../../api/AdminRequest";

function DashBoard() {
  const [admin, setAdmin] = useState(null);
  const [isDirector, setIsDirector] = useState(false);
  const { aId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getAdminById(aId);
        setAdmin(response.data);
        if (response.data.data.role === "Director") {
          setIsDirector(true);
        }
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      }
    };

    fetchAdminData();
  }, [aId]);
  // console.log("The feched data!!", admin);

  const handleLogout = () => {
    localStorage.removeItem("adminId");
    localStorage.removeItem("authToken");
    setIsDirector(false);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <NavBar />
      <nav className="dashboard-nav">
        <div className="profile-card profile-shadow">
          <span>Name</span>
          <div className="profile-details">
            {admin && admin.data.firstName} {admin && admin.data.lastName}
          </div>

          <span>Role</span>
          <div className="profile-details">{admin && admin.data.role}</div>
        </div>
        <Link to={`/updateAdmin/${admin && admin.data.aId}`} className="dd">
          Edit
        </Link>
        <div className="hor-line"></div>
        <ul>
          <li>
            <Link to="/">Overview</Link>
          </li>
          <li>
            <Link to="/approveReservation">Approve Reservations</Link>
          </li>
          <li>
            <Link to="/addHall">Add New Hall</Link>
          </li>
          <li>
            <Link to="/displayHalls">Display Hall</Link>
          </li>
          {isDirector && (
            <li>
              <Link to="/register">Add New Admin</Link>
            </li>
          )}
          {isDirector && (
            <li>
              <Link to="/displayAdmins">Display Admins</Link>
            </li>
          )}
          <li className="logout">
            <div onClick={handleLogout} className="logout-btn">
              Logout
            </div>
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
