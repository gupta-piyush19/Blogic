import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="container flex">
        <div className="form-container">
          <h1>Register</h1>
          <form>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="Email"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <button type="submit">Register</button>
            </div>
          </form>
          <p>
            Already have an account?
            <span>
              <Link to="/login"> Login Here </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
