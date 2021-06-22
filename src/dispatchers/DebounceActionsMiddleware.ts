import { Middleware } from "redux";
import { debounce } from "lodash";

const debouncedActionsTypes = ["SEQUENCER_UPDATE_MOD_SEQUENCE"];

const markAsDebounced = (action) => ({
  ...action,
  _debounced: true,
});

const isActionDebounced = (action) => action._debounced;

class DebounceActionsMiddleware {
  middleware: Middleware<unknown>;
  dispatchDebounced: (store, action) => void;

  constructor() {
    this.dispatchDebounced = debounce(
      (store, action) => store.dispatch(markAsDebounced(action)),
      200
    );
    this.middleware = (store) => (next) => (action) => {
      if (
        debouncedActionsTypes.includes(action.type) &&
        !isActionDebounced(action)
      ) {
        this.dispatchDebounced(store, action);
        return;
      }
      next(action);
    };
  }
}

export default DebounceActionsMiddleware;
