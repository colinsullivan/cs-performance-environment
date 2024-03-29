import { AnyAction, Middleware, Store } from "redux";
import maxApi from "max-api";

import {
  parseJsonOrNull,
  parseAbletonTrackStateUpdatePayload,
} from "common/util/parsing";
import {
  ABLETON_LINK_DISABLE,
  ABLETON_LINK_ENABLE,
  ABLETON_TRANSPORT_PAUSE,
  ABLETON_TRANSPORT_PLAY,
  ABLETON_UPDATE_TEMPO,
  ABLETON_UPDATE_TRACK,
  AbletonSessionStateUpdate,
  abletonSessionStateUpdate,
  abletonTrackStateUpdate,
} from "common/actions";
import {
  AbletonTrack,
  AbletonDeviceParameter,
  AbletonDeviceParamNames,
  allAbletonDeviceParamNames,
} from "common/models";

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
          const messageArgs: Array<string | number> = [
            "cs/update_track_state",
            track.id,
            track.mute,
          ];

          const deviceParamsToUpdate: AbletonDeviceParamNames[] =
            allAbletonDeviceParamNames;
          for (const deviceParamName of deviceParamsToUpdate) {
            const deviceParam: AbletonDeviceParameter = track[deviceParamName];
            messageArgs.push(deviceParam.id, deviceParam.value);
          }

          maxApi.outlet(...messageArgs);

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
            if (payload) {
              action = abletonSessionStateUpdate(payload);
            }
            break;

          case "trackStateUpdate":
            {
              const track = parseAbletonTrackStateUpdatePayload(payloadJson);
              if (track) {
                action = abletonTrackStateUpdate(track);
              }
            }
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
  }

  sendInit() {
    maxApi.outlet("cs/init");
  }
}

export default MaxDispatcher;
