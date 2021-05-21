/**
 *  @file       start_electron.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import path from "path";
import fs from "fs";
import dotenv from "dotenv";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import express from "express";
import expressWebsocket from "express-ws";
import SCRedux from "supercollider-redux";

import WebsocketServerDispatcher from "./WebsocketServerDispatcher";

import rootReducer, { create_default_state } from "../common/reducers";
import { PORT } from "../common/constants";
import { rehydrate_state } from "../common/actions";

dotenv.config({ path: ".env.local" });

const wsServerDispatcher = new WebsocketServerDispatcher();
console.log("Creating store...");
var loggerMiddleware = (_store) => (next) => (action) => {
  //console.log("will dispatch", action);

  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  //console.log("state after dispatch", JSON.stringify(store.getState(), null, 4));

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
};
var middleware = [thunk, wsServerDispatcher.middleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(loggerMiddleware);
}

var store = createStore(
  rootReducer,
  create_default_state(),
  applyMiddleware(...middleware)
);

console.log("Initializing SCRedux");
const scReduxController = new SCRedux.SCReduxController(store, {
  interpretOnLangBoot: fs.readFileSync(path.join(__dirname, "sclang_init.sc")),
});

const quit = () => {
  console.log("Stopping...");
  scReduxController.quit().then(() => {
    console.log("Bye!");
    process.exit();
  });
}


process.on("SIGINT", quit);

const startServer = () => {
  console.log("startServer");
  const server = express();
  expressWebsocket(server);

  if (process.env.NODE_ENV === "development") {
    server.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    server.use(express.static("public"));
  } else {
    server.use(express.static(path.join(__dirname, "..")));
  }
  server.get("/getState", function (req, res) {
    res.json(store.getState());
  });
  server.ws("/:clientId", function (ws, req) {
    const clientId = req.params.clientId;
    console.log(`client ${clientId} connected.`);
    ws.on("message", function (msg) {
      const action = JSON.parse(msg);
      console.log("action");
      console.log(action);
      store.dispatch(action);
    });
    ws.on("close", function () {
      wsServerDispatcher.removeClient(clientId);
    });
    wsServerDispatcher.addClient(clientId, ws);

    store.dispatch(rehydrate_state());

  });
  if (process.env.NODE_ENV !== "development") {
    server.get("/", function (req, res) {
      res.sendFile(path.join(`${__dirname}/../index.html`));
    });
    server.get("/laptop", function (req, res) {
      res.sendFile(path.join(`${__dirname}/../index.html`));
    });
  }

  console.log(`Starting to listen on port ${PORT}...`);
  server.listen(PORT);
  console.log(`Listening on port ${PORT}.`);
};

scReduxController
  .boot()
  .then(startServer)
  .catch(function (err) {
    console.log("error while starting up...");
    console.log(err);
    quit();
  });
