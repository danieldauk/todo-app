import React, { Component } from 'react';
import {Route} from "react-router-dom";
import './App.css';

import Login from "./containers/Login/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Login}/>
      </div>
    );
  }
}

export default App;
