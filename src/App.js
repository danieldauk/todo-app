import React, { Component } from 'react';
import Input from "./containers/Input/Input";
import List from "./containers/List/List";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Input/>
        <List/>
      </div>
    );
  }
}

export default App;
