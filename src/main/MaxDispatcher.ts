import { AnyAction, Middleware, Store } from "redux";
import maxApi from "max-api";

import { parseJsonOrNull } from "common/util/parsing";
import {
  ABLETON_LINK_DISABLE,
  ABLETON_LINK_ENABLE,
  ABLETON_TRANSPORT_PAUSE,
  ABLETON_TRANSPORT_PLAY,
  ABLETON_UPDATE_TEMPO,
  ABLETON_UPDATE_TRACK,
  AbletonSessionStateUpdate,
  AbletonTrackStateUpdate,
  abletonSessionStateUpdate,
  abletonTrackStateUpdate,
} from "common/actions";
import { AbletonTrack } from "common/models";

type MaxMessageName = "sessionStateUpdate" | "trackStateUpdate";

class MaxDispatcher {
  store: Store | undefined;
  middleware: Middleware<unknown>;

  constructor() {
    this.middleware = (store) => (next) => (action: AnyAction) => {
      switch (action.type) {
        case ABLETON_LINK_ENABLE:
          maxApi.outlet(
            "cs/set_property",
            "live_set",
            "is_ableton_link_enabled",
            1
          );
          break;

        case ABLETON_LINK_DISABLE:
          maxApi.outlet(
            "cs/set_property",
            "live_set",
            "is_ableton_link_enabled",
            0
          );
          break;

        case ABLETON_TRANSPORT_PLAY:
          maxApi.outlet("cs/set_property", "live_set", "is_playing", 1);
          break;

        case ABLETON_TRANSPORT_PAUSE:
          maxApi.outlet("cs/set_property", "live_set", "is_playing", 0);
          break;

        case ABLETON_UPDATE_TEMPO:
          maxApi.outlet(
            "cs/set_property",
            "live_set",
            "tempo",
            action.payload.tempo
          );
          break;

        case ABLETON_UPDATE_TRACK:
          const track: AbletonTrack = action.payload.track;

          maxApi.outlet("cs/set_property_by_id", track.volume.id, "value", track.volume.value);
          break;

        default:
          break;
      }
      return next(action);
    };
  }

  private addHandlers() {
    const store = this.getStore();
    maxApi.addHandlers({
      dispatch: (messageName: string, payloadJson: string) => {
        const maxMessageName = messageName.trim() as MaxMessageName;
        let action: AnyAction;
        let payload: unknown;

        switch (maxMessageName) {
          case "sessionStateUpdate":
            payload =
              parseJsonOrNull<AbletonSessionStateUpdate["payload"]>(
                payloadJson
              );
            if (!payload) {
              return;
            }
            action = abletonSessionStateUpdate(payload);
            break;

          case "trackStateUpdate":
            payload =
              parseJsonOrNull<AbletonTrackStateUpdate["payload"]>(payloadJson);
            if (!payload) {
              return;
            }
            action = abletonTrackStateUpdate(payload);
            break;

          default:
            console.log("default");
            break;
        }

        if (action) {
          store.dispatch(action);
        }
      },
    });
  }

  getStore() {
    if (!this.store) {
      throw new Error("Store not ready");
    }
    return this.store;
  }

  private async handleStateChange() {
    const state = this.getStore().getState();

    try {
      await maxApi.setDict("cs/state", state);
    } catch (e) {
      console.log("Error setting cs/state");
      console.log("e");
      console.log(e);
    }
    try {
      await maxApi.outlet("cs/state_changed");
      console.log("debug");
    } catch (e) {
      console.log("Error sending change notification");
      console.log("e");
      console.log(e);
    }
  }

  setStore(inStore: Store) {
    this.store = inStore;

    this.addHandlers();
    this.store.subscribe(() => this.handleStateChange());
    maxApi.outlet("cs/init");
  }
}

export default MaxDispatcher;
