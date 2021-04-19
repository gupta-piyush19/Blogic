import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Delete = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.push("/"), 3000);
  }, []);

  return (
    <div className="container">
      <h1>Blog has been deleted ...</h1>
      <p>You will be redirected to homepage in 3s</p>
    </div>
  );
};

export default Delete;
