import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import BlogState from "./context/blog/BlogState";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AlertState>
        <BlogState>
          <Router>
            <App />
          </Router>
        </BlogState>
      </AlertState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);
