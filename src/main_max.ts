import maxApi from "max-api";

import { loadEnv } from "common/util/environment";

loadEnv();

maxApi.addHandlers({
  dispatch: (actionType: string, payloadJson: string) => {
    const payload = JSON.parse(payloadJson);
    console.log("dispatch");
    console.log("actionType");
    console.log(actionType);
    console.log("payload");
    console.log(payload);

  }
});

const handleStateChange = () => {
  console.log("handleStateChange");
    //const state = this.getStore().getState();

    //try {
      //await max.setDict("cs/state", state);
    //} catch (e) {
      //console.log("Error setting cs/state");
      //console.log("e");
      //console.log(e);
    //}
    //try {
      //await max.outlet("cs/state_changed");
      //console.log("debug");
    //} catch (e) {
      //console.log("Error sending change notification");
      //console.log("e");
      //console.log(e);
    //}
};

console.log("Hello max!");
