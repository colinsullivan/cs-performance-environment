import scale from "./scale";
import { handleSetKey } from "common/actions/scale";

import { configureStore } from "common/util/mockStore";
import { createDefaultScaleState } from "common/models/scale";

describe("scale reducer", () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });
  test("handles setKey major", () => {

    const action = handleSetKey("D", "major");
    store.dispatch(action);

    const dispatchedAction = store.getActions()[0];

    const state = createDefaultScaleState();

    const newState = scale(state, dispatchedAction);

    expect(newState).toMatchObject({
      key: {
        tonic: "D",
        quality: "major"
      },
      scale: ["D", "E", "F#", "G", "A", "B", "C#"]
    });
    
  });
  test("handles setKey minor", () => {

    const action = handleSetKey("A", "minor");
    store.dispatch(action);

    const dispatchedAction = store.getActions()[0];

    const state = createDefaultScaleState();

    const newState = scale(state, dispatchedAction);

    expect(newState).toMatchObject({
      key: {
        tonic: "A",
        quality: "minor"
      },
      scale: ["A", "B", "C", "D", "E", "F", "G"]
    });
    
  });
});
