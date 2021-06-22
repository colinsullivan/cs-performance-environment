/**
 *  @file       index.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import uuid from "uuid/v4";

import "./index.scss";

import WebsocketDispatcher from "dispatchers/WebsocketDispatcher";
import DebounceActionsMiddleware from "dispatchers/DebounceActionsMiddleware";
import App from "components/App";
import { PORT } from "common/constants";
import { configureStore } from "./store";

const clientId = uuid();

const wsDispatcher = new WebsocketDispatcher({
  port: PORT,
  clientId,
});

const debounceActionsMiddleware = new DebounceActionsMiddleware();

// get initial state then render
axios
  .get(
    `${window.location.protocol}//${window.location.hostname}:${PORT}/getState`
  )
  .then(function (resp) {
    const initialState = resp.data;
    const store = configureStore(
      initialState,
      wsDispatcher,
      debounceActionsMiddleware
    );
    wsDispatcher.setStore(store);
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  });
