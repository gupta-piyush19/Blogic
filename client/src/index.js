import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AlertState>
        <Router>
          <App />
        </Router>
      </AlertState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);
