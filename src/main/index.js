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
import electron from "electron";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import express from "express";
import expressWebsocket from "express-ws";
import SCRedux from "supercollider-redux";

import WebsocketServerDispatcher from "./WebsocketServerDispatcher";

import rootReducer, { create_default_state } from "../common/reducers";
import { PORT } from "../common/constants";
import { rehydrate_state } from "../common/actions";

//const electron = require('electron');
// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

//const path = require('path');
//const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const wsServerDispatcher = new WebsocketServerDispatcher();
console.log("Creating store...");
var loggerMiddleware = (store) => (next) => (action) => {
  console.log("will dispatch", action);

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

const quit = () =>
  scReduxController.quit().then(() => {
    app.quit();
  });

const load = () => {
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000/laptop");
  } else {
    mainWindow.loadURL("http://localhost:3001/laptop");
  }
};

const startServer = () => {
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
  load();
};

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1440, height: 900 });

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    quit();
  }
});

app.on("will-quit", quit);

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

scReduxController
  .boot()
  .then(startServer)
  .catch(function (err) {
    console.log("error while starting up...");
    console.log(err);
    quit();
  });
