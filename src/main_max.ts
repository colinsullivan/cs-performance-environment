import maxApi from "max-api";
import uuid from "uuid/v4";
import { createStore, applyMiddleware, AnyAction, Store } from "redux";
import thunk from "redux-thunk";

import { loadEnv } from "common/util/environment";
import { PORT } from "common/constants";
import rootReducer from "common/reducers";
import WebsocketDispatcher from "dispatchers/WebsocketDispatcher";
import { fetchInitialState } from "common/util/setup";
import { abletonSessionStateUpdate } from "common/actions";
import { getAbleton } from "common/selectors";

type MaxMessageName = "sessionStateUpdate";

loadEnv();
const IS_DEVELOPMENT = true;
const loggerMiddleware = (store: Store) => (next) => (action: AnyAction) => {
  console.log("will dispatch", action);

  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  //console.log("state after dispatch", JSON.stringify(store.getState(), null, 4));
  console.log("ableton state after dispatch", JSON.stringify(getAbleton(store.getState()), null, 4));

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
};
const clientId = uuid();

const main = async () => {
  console.log("Hello max!");

  const wsDispatcher = new WebsocketDispatcher({
    port: PORT,
    clientId,
    uri: `localhost:${PORT}`,
  });

  let middleware = [thunk, wsDispatcher.middleware];
  if (IS_DEVELOPMENT) {
    middleware.push(loggerMiddleware);
  }

  const initialState = await fetchInitialState(`http://localhost:${PORT}`);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  maxApi.addHandlers({
    dispatch: (messageName: string, payloadJson: string) => {
      const maxMessageName = messageName.trim() as MaxMessageName;
      let action: AnyAction;

      switch (maxMessageName) {
        case "sessionStateUpdate":
          let payload;
          try {
            payload = JSON.parse(payloadJson);
          } catch (e) {
            console.log(`error parsing json payload: ${payloadJson}`);
            console.log("e");
            console.log(e);
            return;
          }
          action = abletonSessionStateUpdate(payload);
          break;

        default:
          console.log("default");
          break;
      }

      if (action) {
        store.dispatch(action);
      }
    },
  });

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
