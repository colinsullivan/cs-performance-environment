import { AnyAction, Store } from "redux";
import { abletonSessionStateUpdate } from "common/actions";

// TODO: This must be changed when building for production
//import max from "../max-api-wrapper";
import max from "./max-api-wrapper-prod";

type MaxMessageName = "SessionStateUpdate";

class MaxDispatcher {
  store: Store | undefined;
  constructor() {

    max.addHandlers({
      dispatch: (messageName: MaxMessageName, payloadJson: string) => {
        const payload = JSON.parse(payloadJson);
        let action: AnyAction;

        switch (messageName) {
          case "SessionStateUpdate":
            action = abletonSessionStateUpdate(payload);
            break;
          
          default:
            break;
        }

        if (action) {
          this.getStore().dispatch(action);
        }
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
