import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <nav className="navbar-content">
          <Link to="/">
            <img src="assets/Logo.png" alt="Logo" id="logo" />
          </Link>
          <ul className="links">
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
