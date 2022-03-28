import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "common/reducers";
import {AppState} from "common/models";

export const configureStore = (
  initialState: AppState,
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
  const middlewareApplied = applyMiddleware(...middleware);
  const store = createStore(
    rootReducer,
    initialState,
    middlewareApplied
  );

  return store;
};
