import uuid from "uuid/v4";
import { createStore, applyMiddleware, AnyAction, Store } from "redux";
import thunk from "redux-thunk";

import { loadEnv } from "main/util/environment";
import { PORT } from "common/constants";
import rootReducer from "common/reducers";
import WebsocketDispatcher from "dispatchers/WebsocketDispatcher";
import { fetchInitialState } from "common/util/setup";
import { getAbleton } from "common/selectors";
import MaxDispatcher from "./main/MaxDispatcher";
import {max} from "lodash";

loadEnv();
const IS_DEVELOPMENT = true;
const loggerMiddleware = (store: Store) => (next) => (action: AnyAction) => {
  console.log("will dispatch", action);

  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  //console.log("state after dispatch", JSON.stringify(store.getState(), null, 4));
  console.log(
    "ableton state after dispatch",
    JSON.stringify(getAbleton(store.getState()), null, 4)
  );

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
};

const clientId = uuid();

const configureStore = (wsDispatcher: WebsocketDispatcher, maxDispatcher: MaxDispatcher, initialState: unknown) => {
  const middleware = [thunk, wsDispatcher.middleware, maxDispatcher.middleware];
  if (IS_DEVELOPMENT) {
    middleware.push(loggerMiddleware);
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  wsDispatcher.setStore(store);
  maxDispatcher.setStore(store);
};

const startup = async (wsDispatcher: WebsocketDispatcher, maxDispatcher: MaxDispatcher) => {
  let initialState: unknown;
  try {
    initialState = await fetchInitialState(`http://localhost:${PORT}`);
  } catch (e) {
    console.log("Error fetching initial state, trying again in 1 seconds...");
    setTimeout(() => startup(wsDispatcher, maxDispatcher), 1000);
    return;
  }

  configureStore(wsDispatcher, maxDispatcher, initialState)

}

const main = async () => {
  console.log("Hello max!");

  const wsDispatcher = new WebsocketDispatcher({
    port: PORT,
    clientId,
    uri: `localhost:${PORT}`,
  });

  const maxDispatcher = new MaxDispatcher();

  await startup(wsDispatcher, maxDispatcher);

  maxDispatcher.sendInit();

};

main();
