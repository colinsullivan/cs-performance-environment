import { Middleware } from "redux";

const debouncedActionsTypes = ["SEQUENCER_UPDATE_MOD_SEQUENCE"];

class DebounceActionsMiddleware {
  middleware: Middleware<unknown>;
  dispatchDebounced: (store, action) => void;

  constructor() {
    this.dispatchDebounced = debounce(
      (store, action) => store.dispatch(action),
      200
    );
    this.middleware = (store) => (next) => (action) => {
      if (debouncedActionsTypes.includes(action.type)) {
        this.dispatchDebounced(store, action);
        return null;
      }
      return next(action);
    };
  }
}

export default DebounceActionsMiddleware;
