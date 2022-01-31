import React, { useContext, useEffect, useRef, useState } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../layout/Alert";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const { register, error, isAuthenticated, clearError } =
    useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const passwordCol = useRef(null);

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
  }, [isAuthenticated, error]);

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
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
