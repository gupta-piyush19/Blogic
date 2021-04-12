import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthState from "./context/auth/AuthState";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <Router>
        <App />
      </Router>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);
