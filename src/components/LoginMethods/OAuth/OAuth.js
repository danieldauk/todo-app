import React from "react";
import "./OAuth.css";

const oauth = props => {

  return (
    <div onClick={props.clicked} className="oauth-container">
      {props.provider}
    </div>
  );
};

export default oauth;
