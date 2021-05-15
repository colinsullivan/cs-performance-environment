/**
 *  @file       WebsocketServerDispatcher.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import _ from 'lodash';
import uuid from 'uuid/v4';

const serverId = uuid();

class WebsocketServerDispatcher {
  constructor(props) {
    this.props = props;

    this.middleware = store => next => action => {
      this.handleMiddleware(store, next, action);
    };

    this.wsByClientId = {};
    this.clientIds = [];
  }

  addClient (clientId, ws) {
    this.clientIds.push(clientId);
    this.wsByClientId[clientId] = ws;
  }

  removeClient (clientId) {
    this.clientIds = _.without(this.clientIds, clientId);
    this.wsByClientId = _.pick(this.wsByClientId, this.clientIds);
  }

  handleMiddleware (_store, next, action) {
    let i;
    let clientIds = this.clientIds;
      // if action is from a client, do not send back to that client
    if (action.clientId) {
      clientIds = _.without(this.clientIds, action.clientId);
    }
    for (i = 0; i < clientIds.length; i++) {
      if (this.wsByClientId[clientIds[i]].readyState === 1) {
        this.wsByClientId[clientIds[i]].send(
          JSON.stringify({serverId, ...action})
        );
      }
    }
    return next(action);
  }

}

export default WebsocketServerDispatcher;
