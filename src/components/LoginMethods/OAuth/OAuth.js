import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import './OAuth.css';

const oauth = (props) => {
  const mappedIcons = {
    Github: <FontAwesome.FaGithub />,
    Facebook: <FontAwesome.FaFacebook />,
    Google: <FontAwesome.FaGoogle />,
    Anonymous: <FontAwesome.FaUser />,
  };

  return (
    <div onClick={props.clicked} className="oauth">
      <div className="oauth__logo">{mappedIcons[props.provider]}</div>
      <p>{props.provider}</p>
    </div>
  );
};

export default oauth;
