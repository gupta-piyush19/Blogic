import React, { useContext, useRef, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Alert from "../layout/Alert";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register, error, isAuthenticated, clearError } = useContext(
    AuthContext
  );
  const passwordCol = useRef(null);

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    register(formData);
  };

  const showPassword = () => {
    if (passwordCol.current.type === "password") {
      passwordCol.current.type = "text";
    } else {
      passwordCol.current.type = "password";
    }
  };

  return (
    <div className="register">
      <div className="container flex">
        <div className="form-container">
          <Alert />
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Name"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                autoComplete="off"
                ref={passwordCol}
              />
              <div className="show-password">
                <input
                  type="checkbox"
                  name="showPassword"
                  id="showPassword"
                  onChange={showPassword}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
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
