/**
 *  @file       WebsocketDispatcher.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/
import { Store, Middleware, AnyAction } from "redux";
import WebSocket from "isomorphic-ws";

import { websocketReadyStateChanged } from "common/actions";

export interface WebsocketDispatcherProps {
  uri: string;
  port: number;
  clientId: string;
}

/**
 *  @class        WebsocketDispatcher
 *
 *  @classdesc    Updates redux store with websocket `readyState` and handles
 *  maintaining WebSocket connection.
 **/
class WebsocketDispatcher {
  props: WebsocketDispatcherProps;
  url: string;
  store: Store | undefined;
  ws: WebSocket | undefined;
  middleware: Middleware<unknown>;
  constructor(props: WebsocketDispatcherProps) {
    this.props = props;
    this.url = `ws://${props.uri}/${props.clientId}`;

    // the actual instance method pulled into the redux middleware, see
    // `handle_middleware` below
    this.middleware = (store) => (next) => (action) => {
      this.handle_middleware(store, next, action);
    };
  }
  /**
   *  A separate setter for the store instance is needed so instance
   *  middleware can be used first.
   **/
  setStore(store: Store) {
    this.store = store;
    this.connect();
  }
  getStore() {
    if (!this.store) {
      throw new Error("Store not initialized");
    }
    return this.store;
  }
  getWs() {
    if (!this.ws) {
      throw new Error("WebSocket not yet initialized");
    }
    return this.ws;
  }

  /**
   *  The actual middleware hook.  Simply forwards the action over the WebSocket
   *  when it is dispatched from elsewhere.
   **/
  handle_middleware(_store, next: (action: AnyAction) => void, action: AnyAction) {
    this.sendAction(action);
    return next(action);
  }
  /**
   *  Connect a new websocket, bind to event handlers.
   **/
  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onerror = () => this.handle_error();
    this.ws.onopen = () => this.handle_opened();
    this.ws.onclose = () => this.handle_closed();
    this.ws.onmessage = (msg) => this.handle_message(msg);
  }

  // Sends a message if the WebSocket is ready
  sendAction(action: AnyAction) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      // only send actions originating here
      if (!action.clientId && !action.serverId) {
        this.ws.send(
          JSON.stringify({
            ...action,
            ...{
              clientId: this.props.clientId,
            },
          })
        );
      }
    }
  }

  /**
   *  When a new message comes in, if it is an action, dispatch that action.
   **/
  handle_message(message) {
    const action = JSON.parse(message.data);
    // ignore actions just dispatched from this client
    if (!action.clientId || action.clientId !== this.props.clientId) {
      if (this.store) {
        this.store.dispatch(action);
      } else {
        throw new Error("WebsocketDispatcher: Store not yet initialized.");
      }
    }
  }

  update_readystate() {
    const store = this.getStore();
    const ws = this.getWs();
    store.dispatch(
      websocketReadyStateChanged(ws.readyState, this.props.clientId)
    );
  }

  handle_opened() {
    this.update_readystate();
  }
  // when closed, wait 1 second and connect a new WebSocket
  handle_closed() {
    this.update_readystate();
    setTimeout(() => this.connect(), 1000);
  }
  handle_error() {
    console.log("Websocket error");
  }
}

export default WebsocketDispatcher;
