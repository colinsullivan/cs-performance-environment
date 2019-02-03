/**
 *  @file       WebsocketDispatcher.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import { websocketReadyStateChanged } from 'common/actions';

/**
 *  @class        WebsocketDispatcher
 *
 *  @classdesc    Updates redux store with websocket `readyState` and handles
 *  maintaining WebSocket connection.
 **/
class WebsocketDispatcher {
  constructor(props) {

    this.props = props;
    this.url = (
      `ws://${window.location.hostname}:${props.port}/${props.clientId}`
    );
    this.store = null;
    this.ws = null;

    // the actual instance method pulled into the redux middleware, see
    // `handle_middleware` below
    this.middleware = store => next => action => {
      this.handle_middleware(store, next, action);
    };

  }
  /**
   *  A separate setter for the store instance is needed so instance
   *  middleware can be used first.
   **/
  setStore(store) {
    this.store = store;
    this.connect();
  }

  /**
   *  The actual middleware hook.  Simply forwards the action over the WebSocket
   *  when it is dispatched from elsewhere.
   **/
  handle_middleware (store, next, action) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      // only send actions originating here
      if (!action.clientId && !action.serverId) {
        this.ws.send(JSON.stringify({
            ...action,
            ...{
              clientId: this.props.clientId
            }
        }));
      }
    }
    return next(action);
  }
  /**
   *  Connect a new websocket, bind to event handlers.
   **/
  connect () {
    this.ws = new window.WebSocket(this.url);
    this.ws.onerror = () => this.handle_error();
    this.ws.onopen = () => this.handle_opened();
    this.ws.onclose = () => this.handle_closed();
    this.ws.onmessage = (msg) => this.handle_message(msg);
  }

  /**
   *  When a new message comes in, if it is an action, dispatch that action.
   **/
  handle_message (message) {
    const action = JSON.parse(message.data);
    // ignore actions just dispatched from this client
    if (!action.clientId || action.clientId !== this.props.clientId) {
      this.store.dispatch(action);
    }
  }

  update_readystate () {
    this.store.dispatch(websocketReadyStateChanged(
        this.ws.readyState,
        this.props.clientId
    ));
  }

  handle_opened () {
    this.update_readystate();
  }
  // when closed, wait 1 second and connect a new WebSocket
  handle_closed () {
    this.update_readystate();
    setTimeout(() => this.connect(), 1000);
  }
  handle_error () {
  }
}

export default WebsocketDispatcher;
