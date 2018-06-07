import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { createStore, applyMiddleware } from "redux";
import reducer from "./store/reducer";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import thunk from "redux-thunk";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
