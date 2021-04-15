import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

import { SET_ALERT, CLEAR_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (message, type, timeout = 5000) => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type },
    });

    setTimeout(() => dispatch({ type: CLEAR_ALERT }), timeout);
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
