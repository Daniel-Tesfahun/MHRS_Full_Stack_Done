import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">Meeting Hall Reservation</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/reservation">Reservation</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
