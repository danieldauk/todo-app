import React from 'react';
import * as Octicons from 'react-icons/lib/go';
import './Header.css';

const header = props => (
  <div className="header">
    <button className="header__button" onClick={props.clicked}>
      <Octicons.GoSignOut /> Log out
    </button>
  </div>
);

export default header;
