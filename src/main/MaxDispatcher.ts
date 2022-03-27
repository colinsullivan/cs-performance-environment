import max from "max-api"
import { Store } from "redux";

class MaxDispatcher {
  store: Store | undefined;
  constructor() {
    //super();

    max.addHandlers({
      dispatch: (actionType: string, payloadJson: string) => {
        const payload = JSON.parse(payloadJson);
        console.log("dispatch");
        console.log("actionType");
        console.log(actionType);
        console.log("payload");
        console.log(payload);

      }
    });
  }

  getStore () {
    if (!this.store) {
      throw new Error("Store not ready");
    }
    return this.store;
  }

  private async handleStateChange () {
    const state = this.getStore().getState();

    try {
      await max.setDict("cs/state", state);
    } catch (e) {
      console.log("Error setting cs/state");
      console.log("e");
      console.log(e);
    }
    try {
      await max.outlet("cs/state_changed");
      console.log("debug");
    } catch (e) {
      console.log("Error sending change notification");
      console.log("e");
      console.log(e);
    }
  }

  setStore(inStore: Store) {
    this.store = inStore;

    this.store.subscribe(() => this.handleStateChange());
  }
}

export default MaxDispatcher;
