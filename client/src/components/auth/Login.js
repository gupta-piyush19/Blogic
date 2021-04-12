import React, { useContext, useEffect, useState } from "react";
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

  return (
    <div
      className="login"
      style={{
        width: "100%",
      }}
    >
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
                required
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
                required
              />
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
