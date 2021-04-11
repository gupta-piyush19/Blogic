import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login" style={{ marginTop: "118px" }}>
      <div className="container flex">
        <div className="form-container">
          <h1>Login</h1>
          <form>
            <div className="form-group">
              <input type="text" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
          <p>
            Don't have an account?
            <span>
              <Link to="/register"> Register Here </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
