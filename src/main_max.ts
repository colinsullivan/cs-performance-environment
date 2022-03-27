import maxApi from "max-api";
import uuid from "uuid/v4";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { loadEnv } from "common/util/environment";
import { PORT } from "common/constants";
import rootReducer from "common/reducers";
import WebsocketDispatcher from "dispatchers/WebsocketDispatcher";
import {fetchInitialState} from "common/util/setup";

loadEnv();
const clientId = uuid();


const main = async () => {

  maxApi.addHandlers({
    dispatch: (actionType: string, payloadJson: string) => {
      const payload = JSON.parse(payloadJson);
      console.log("dispatch");
      console.log("actionType");
      console.log(actionType);
      console.log("payload");
      console.log(payload);
    },
  });

  console.log("Hello max!");

  const wsDispatcher = new WebsocketDispatcher({
    port: PORT,
    clientId,
    uri: `localhost:${PORT}`
  });

  const middleware = [thunk];

  const initialState = await fetchInitialState(`http://localhost:${PORT}`);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  const handleStateChange = async () => {
    const state = store.getState();

    try {
      await maxApi.setDict("cs/state", state);
    } catch (e) {
      console.log("Error setting cs/state");
      console.log("e");
      console.log(e);
    }
    try {
      await maxApi.outlet("cs/state_changed");
    } catch (e) {
      console.log("Error sending change notification");
      console.log("e");
      console.log(e);
    }
  };

  store.subscribe(handleStateChange);

  wsDispatcher.setStore(store);
  
};

main();
