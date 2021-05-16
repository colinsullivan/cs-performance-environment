import { handleSetKey } from "./scale";

import { configureStore } from "common/util/mockStore";

describe("scale actions", () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  test("handleSetKey creates tonalJS object", () => {

    const action = handleSetKey("D", "major");
    store.dispatch(action);

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toMatchObject([{
      type: "SET_KEY",
      payload: {
        tonic: "D",
        quality: "major",
        tonalJSKey: {
          tonic: "D",
          type: "major",
          keySignature: "##"
        }
      }
    }])
    
  });
});
