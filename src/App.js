import React, { Component } from "react";
import Input from "./containers/Input/Input";
import List from "./containers/List/List";
import Auth from "./containers/Auth/Auth";
import Aux from "./hoc/Auxiliary/Auxiliary";

import { Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Auth} />
        <Route
          path="/tasks"
          exact
          render={() => {
            return (
              <Aux>
                <Input />
                <List />
              </Aux>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
