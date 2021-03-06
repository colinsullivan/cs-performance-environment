import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "common/reducers";

export const configureStore = (
  initialState,
  websocketDispatcher,
  debounceActionsMiddleware,
  sequencerApplyChangesService
) => {
  const middleware = [thunk];

  if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
  }

  if (sequencerApplyChangesService) {
    middleware.push(sequencerApplyChangesService.middleware);
  }
  if (debounceActionsMiddleware) {
    middleware.push(debounceActionsMiddleware.middleware);
  }
  if (websocketDispatcher) {
    middleware.push(websocketDispatcher.middleware);
  }
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
};
