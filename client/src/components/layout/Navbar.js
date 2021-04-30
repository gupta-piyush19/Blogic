import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../../context/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { isAuthenticated, user, loadUser, logout } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li>
        <Link
          to="/blogs/new"
          style={{
            border: "none",
          }}
        >
          <FontAwesomeIcon className="plus-icon" icon={faPlusSquare} />
        </Link>
      </li>
      <li className="temp-style">Hello {user && user.name}</li>
      <li>
        <a href="/login" onClick={onLogout}>
          Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <div className="navbar">
      <div className="container">
        <nav className="navbar-content">
          <Link
            to="/"
            style={{
              fontSize: "2.2rem",
              textDecoration: "none",
              fontFamily: '"Fira Mono"',
            }}
            className="logo"
          >
            Blogic
          </Link>
          <ul className="links">{isAuthenticated ? authLinks : guestLinks}</ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
