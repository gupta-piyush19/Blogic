import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="main-footer">
      <div className="footer-content container">
        <p>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved</p>
        <div className="social">
          <a href="https://github.com/gupta-piyush19" target="_blank">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/piyushgupta19" target="_blank">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
