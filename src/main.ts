/**
 *  @file       start_electron.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

const USE_EXTERNAL_SC = process.env.USE_EXTERNAL_SC == "1";
const IS_DEVELOPMENT = process.env.NODE_ENV == "development";

if (!IS_DEVELOPMENT) {
  require("module-alias/register");
}

import path from "path";
import fs from "fs";
import dotenv from "dotenv";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import express from "express";
import expressWebsocket from "express-ws";
import SCRedux from "supercollider-redux";

import WebsocketServerDispatcher from "main/WebsocketServerDispatcher";
import CrowDispatcherService from "main/CrowDispatcherService";

import rootReducer, { create_default_state } from "common/reducers";
import { PORT } from "common/constants";
import { rehydrate_state } from "common/actions";

dotenv.config({ path: ".env" });

const CROW_A_SERIAL_PATH = process.env.CROW_A_SERIAL_PATH;
if (!CROW_A_SERIAL_PATH) {
  throw new Error("Expected CROW_A_SERIAL_PATH environment variable");
}
const CROW_B_SERIAL_PATH = process.env.CROW_B_SERIAL_PATH;
if (!CROW_B_SERIAL_PATH) {
  throw new Error("Expected CROW_B_SERIAL_PATH environment variable");
}

const wsServerDispatcher = new WebsocketServerDispatcher();
const crowDispatcherA = new CrowDispatcherService(CROW_A_SERIAL_PATH);
const crowDispatcherB = new CrowDispatcherService(CROW_B_SERIAL_PATH);
console.log("Creating store...");
var loggerMiddleware = (_store) => (next) => (action) => {
  console.log("will dispatch", action);

  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  //console.log("state after dispatch", JSON.stringify(store.getState(), null, 4));

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
};
var middleware = [
  thunk,
  wsServerDispatcher.middleware,
  crowDispatcherA.middleware,
  crowDispatcherB.middleware,
];

if (IS_DEVELOPMENT) {
  middleware.push(loggerMiddleware);
}

var store = createStore(
  rootReducer,
  create_default_state(),
  applyMiddleware(...middleware)
);

console.log("Initializing SCRedux");
const scReduxController = new SCRedux.SCReduxController(store, {
  interpretOnLangBoot: fs.readFileSync(
    path.join(__dirname, "main", "sclang_init.sc")
  ),
});

const quit = () => {
  console.log("Stopping...");
  scReduxController.quit().then(() => {
    console.log("Bye!");
    process.exit();
  });
};

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
    server.use(express.static(path.join(__dirname, ".")));
  }
  server.get("/getState", function (req, res) {
    res.json(store.getState());
  });
  server.ws("/:clientId", function (ws, req) {
    const clientId = req.params.clientId;
    console.log(`client ${clientId} connected.`);
    ws.on("message", function (msg) {
      const action = JSON.parse(msg);
      //console.log("action");
      //console.log(action);
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

if (USE_EXTERNAL_SC) {
  const externalSCWait = 2000;
  console.log(`
    USE_EXTERNAL_SC: Not spawning SC...Waiting ${
      externalSCWait / 1000
    } seconds instead...
  `);
  setTimeout(startServer, externalSCWait);
} else {
  scReduxController
    .boot()
    .then(startServer)
    .catch(function (err) {
      console.log("error while starting up...");
      console.log(err);
      quit();
    });
}
