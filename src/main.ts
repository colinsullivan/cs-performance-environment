import path from "path";
import fs from "fs";
import { configureStore } from "@reduxjs/toolkit";

import express from "express";
import expressWebsocket, { Application } from "express-ws";
import SCRedux from "supercollider-redux";

import WebsocketServerDispatcher from "main/WebsocketServerDispatcher";
import CrowDispatcherService from "main/CrowDispatcherService";
//import MaxDispatcher from "main/MaxDispatcher";

import rootReducer from "common/reducers";
import { PORT } from "common/constants";
import { rehydrate_state } from "common/actions";
import { createInitialState } from "common/models/initialState";
import { loadEnv } from "common/util/environment";

loadEnv();

const USE_EXTERNAL_SC = process.env.USE_EXTERNAL_SC === "1";
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const initialState = createInitialState();

const wsServerDispatcher = new WebsocketServerDispatcher();
const crowDispatcher = new CrowDispatcherService();
//let maxDispatcher;
//if (!IS_DEVELOPMENT) {
  //maxDispatcher = new MaxDispatcher();
//}

console.log("Creating store...");
const loggerMiddleware = (_store) => (next) => (action) => {
  if (IS_DEVELOPMENT) {
    console.log("will dispatch", action);
  }

  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  //console.log("state after dispatch", JSON.stringify(store.getState(), null, 4));

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
};
let middleware = [wsServerDispatcher.middleware];

if (crowDispatcher) {
  middleware = [...middleware, crowDispatcher.middleware];
}

if (IS_DEVELOPMENT) {
  middleware.push(loggerMiddleware);
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

crowDispatcher.setStore(store);
crowDispatcher.initialize();
//if (maxDispatcher) {
  //maxDispatcher.setStore(store);
//}

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
  const server = express() as unknown as Application;
  expressWebsocket(server);

  if (process.env.NODE_ENV === "development") {
    server.use(function (_req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    server.use(express.static("public"));
  } else {
    server.use(express.static(path.join(__dirname, ".")));
  }
  server.get("/getState", function (_req, res) {
    res.json(store.getState());
  });
  server.ws("/:clientId", function (ws, req) {
    const clientId = req.params.clientId;
    console.log(`client ${clientId} connected.`);
    ws.on("message", function (msg) {
      const action = JSON.parse(msg.toString("utf8"));
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
    server.get("/", function (_req, res) {
      res.sendFile(path.join(`${__dirname}/../index.html`));
    });
    server.get("/laptop", function (_req, res) {
      res.sendFile(path.join(`${__dirname}/../index.html`));
    });
  }

  console.log(`Starting to listen on port ${PORT}...`);
  server.listen(PORT);
  console.log(`Listening on port ${PORT}.`);
};

if (USE_EXTERNAL_SC) {
  const externalSCWait = 10000;
  console.log(`
    USE_EXTERNAL_SC: Not spawning SC...Waiting ${
      externalSCWait / 1000
    } seconds instead...
  `);
  setTimeout(() => {
    scReduxController.scStoreController.init().catch(quit);
    startServer();
  }, externalSCWait);
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
