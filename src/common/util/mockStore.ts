import { default as createStore } from "redux-mock-store";
import thunk from "redux-thunk";

export const configureStore = (initialState) => {
  const middleware = [thunk];

  const mockStore = createStore(middleware);

  return mockStore(initialState);
};
