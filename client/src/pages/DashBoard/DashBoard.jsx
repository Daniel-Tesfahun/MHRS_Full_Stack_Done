import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar";
<<<<<<< HEAD
import { getAdminById, getAllReservations } from "../../api/AdminRequest";
import {
  getAllApprovedReservations,
  getAllHallDetails,
} from "../../api/UserRequest";
import { getAllAdmins } from "../../api/DirectorRequest";
=======
import { getAdminById } from "../../api/AdminRequest";
import ReservationStatusChart from "../../components/ReservationStatusChart/ReservationStatusChart";
import ActivityTrendsChart from "../../components/ActiveTrendChart/ActiveTrendChart";
import HallPerformanceChart from "../../components/HallPerformanceChart/HallPerformanceChart";
>>>>>>> e912b3cd19883edbe3a0e978af406e9e969591e9

function DashBoard() {
  const [admin, setAdmin] = useState(null);
  const [info, setInfo] = useState({
    numOfAppReser: "",
    numOfAdmins: "",
    numOfAllReser: "",
    numOfHulls: "",
  });
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

    const fetchAllInfo = async () => {
      try {
        const appResData = await getAllApprovedReservations();
        const hallData = await getAllHallDetails();
        const reserData = await getAllReservations();

        let updatedInfo = {
          numOfAppReser: appResData.data.data.length || "0",
          numOfHulls: hallData.data.data.length || "0",
          numOfAllReser: reserData.data.data.length || "0",
          numOfAdmins: isDirector ? "" : "Fetching",
        };

        if (isDirector) {
          const adminsData = await getAllAdmins();
          updatedInfo.numOfAdmins = adminsData.data.data.length || "0";
        }
        setInfo(updatedInfo);
      } catch (err) {
        console.error("Failed to fetch All Info data:", err);
      }
    };

    fetchAdminData();
    fetchAllInfo();
  }, [aId, isDirector]);

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
<<<<<<< HEAD
          <li>
            <Link to="">Overview</Link>
          </li>
=======
          {/* <li>
            <Link to="/">Overview</Link>
          </li> */}
>>>>>>> e912b3cd19883edbe3a0e978af406e9e969591e9
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
        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <h2>Dashboard</h2>
            <p>
              Welcome to the admins dashboard {admin && admin.data.firstName}{" "}
              {admin && admin.data.lastName}!
            </p>
<<<<<<< HEAD
          </div>
        </div>
        <div className="dashboard-detail-contents">
=======
            {/* <ReservationStatusChart />
            <ActivityTrendsChart />
            <HallPerformanceChart /> */}
          </div>
        </div>
        {/* <div className="dashboard-detail-contents">
>>>>>>> e912b3cd19883edbe3a0e978af406e9e969591e9
          <div className="dashboard-detail-content">
            <h1>{info && info.numOfAllReser}</h1>
            <p>Number of All Reservations</p>
          </div>
          <div className="dashboard-detail-content">
            <h1>{info && info.numOfAppReser}</h1>
            <p>Number of Approved Reservations</p>
          </div>
          {isDirector && (
            <div className="dashboard-detail-content">
              <h1>{info && info.numOfAdmins}</h1>
              <p>Number of Admins</p>
            </div>
          )}
          <div className="dashboard-detail-content">
            <h1>{info && info.numOfHulls}</h1>
            <p>Number of Meeting Hulls</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default DashBoard;
