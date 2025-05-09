import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar";
import { getAdminById, getAllReservations } from "../../api/AdminRequest";
import {
  getAllApprovedReservations,
  getAllHallDetails,
} from "../../api/UserRequest";
import { getAllAdmins } from "../../api/DirectorRequest";
import DashboardNav from "../../components/DashboardNav/DashboardNav";

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

  return (
    <div className="dashboard-container">
      <NavBar />
      <DashboardNav />
      <div className="dashboard-content">
        <div style={{ padding: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <h2>Dashboard</h2>
            <p>
              Welcome to the admins dashboard {admin && admin.data.firstName}{" "}
              {admin && admin.data.lastName}!
            </p>
          </div>
        </div>
        <div className="dashboard-detail-contents">
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
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
