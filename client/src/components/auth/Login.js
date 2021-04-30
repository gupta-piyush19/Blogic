import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Alert from "../layout/Alert";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const passwordCol = useRef(null);

  const { login, error, isAuthenticated, clearError } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
  }, [isAuthenticated, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const showPassword = () => {
    if (passwordCol.current.type === "password") {
      passwordCol.current.type = "text";
    } else {
      passwordCol.current.type = "password";
    }
  };

  return (
    <div className="login">
      <div className="container flex">
        <div className="form-container">
          <Alert />
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                autoComplete="off"
                // required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                autoComplete="off"
                ref={passwordCol}
                // required
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
