import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const adminInfo = {
    aId: 1,
    firstName: "Daniel",
    lastName: "Tesfahun",
    userName: "dan1",
    password: "$2b$10$DUemMrfNbnCxgMk3J6hdLe8YzG.EbXo7X3iJaTnmFl3LsXXDbP.FG",
    role: "Director",
    updated: "2025-04-04T21:00:00.000Z",
  };

  return (
    <nav className="navbar">
      <div className="logo">Meeting Hall Reservation</div>
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

        {adminInfo?.aId && (
          <li>
            <NavLink
              to={`/dashboard/${adminInfo?.aId}`}
              activeClassName="active"
            >
              Dashboard
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
