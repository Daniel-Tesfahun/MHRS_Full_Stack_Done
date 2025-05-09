import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import { getAdminById } from "../../api/AdminRequest";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { LuListCollapse } from "react-icons/lu";
import { VscCollapseAll } from "react-icons/vsc";
import { VscExpandAll } from "react-icons/vsc";

const DashboardNav = () => {
  const [admin, setAdmin] = useState(null);
  const [isDirector, setIsDirector] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  //   const { aId } = useParams();
  const adminId = localStorage.getItem("adminId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getAdminById(adminId);
        setAdmin(response.data);
        if (response.data.data.role === "Director") {
          setIsDirector(true);
        }
      } catch (err) {
        console.error("Failed to fetch admin data:");
      }
    };

    fetchAdminData();
  }, [adminId, isDirector]);

  const handleLogout = () => {
    localStorage.removeItem("adminId");
    localStorage.removeItem("authToken");
    setIsDirector(false);
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`dashboard-nav ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? "➡️" : <VscCollapseAll />}
      </button>
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
          <NavLink
            to={`/dashboard/${admin && admin.data.aId}`}
            activeClassName="active"
          >
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/approveReservation" activeClassName="active">
            Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/addHall" activeClassName="active">
            New Hall
          </NavLink>
        </li>
        <li>
          <NavLink to="/displayHalls" activeClassName="active">
            Display Hall
          </NavLink>
        </li>
        {isDirector && (
          <li>
            <NavLink to="/register" activeClassName="active">
              New Admin
            </NavLink>
          </li>
        )}
        {isDirector && (
          <li>
            <NavLink to="/displayAdmins" activeClassName="active">
              Display Admins
            </NavLink>
          </li>
        )}
        <li className="logout">
          <div onClick={handleLogout} className="logout-btn">
            Logout
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNav;
