import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import "./Alert.css";

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.message}
      </div>
    )
  );
};

export default Alert;
