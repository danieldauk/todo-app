import React from "react";
import "./Header.css";

const header = (props) =>{
    return (
        <div className="header-container">
            <button onClick={props.clicked}>Log out</button>
        </div>

    );
}

export default header;