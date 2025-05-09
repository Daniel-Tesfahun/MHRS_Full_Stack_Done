import React, { useState } from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const adminId = localStorage.getItem("adminId");

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Meeting Hall Reservation</Link>
      </div>
      <button
        className={`hamburger ${menuOpen ? "ham-active" : ""}`}
        onClick={toggleMenu}
      >
        ☰
      </button>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/reservation" activeClassName="active">
            Reservation
          </NavLink>
        </li>

        {adminId && (
          <li>
            <NavLink to={`/dashboard/${adminId}`} activeClassName="active">
              Dashboard
            </NavLink>
          </li>
        )}
        {!adminId && (
          <li>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
