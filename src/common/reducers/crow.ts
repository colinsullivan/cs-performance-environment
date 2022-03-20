import { AllActionTypes } from "common/actions";
import { CROW_DEVICE_CONNECTED, CROW_STATE_UPDATED } from "common/actions/crow";
import {
  findCrowDeviceIndexById,
  findCrowDeviceIndexByPort,
} from "common/models/crow";
import { CrowDevice } from "common/models/crow/api";
import { READY_STATES } from "common/models/ready_states";

export const crowReducer = (
  state: CrowDevice[] = [],
  action: AllActionTypes
) => {
  switch (action.type) {
    case CROW_DEVICE_CONNECTED: {
      const { id, serialPort } = action.payload;

      // Find crow device
      const deviceIndex = findCrowDeviceIndexById(state, id);

      // Update serial port
      const updatedDevice = {
        ...state[deviceIndex],
        serialPort,
        readyState: READY_STATES.OPEN,
      };
      const newState = [...state];
      newState[deviceIndex] = updatedDevice;
      return newState;
    }
    case CROW_STATE_UPDATED: {
      const newState = [...state];

      const deviceIndex = findCrowDeviceIndexByPort(
        state,
        action.payload.serialPort
      );

      const device = state[deviceIndex];
      const updatedDevice = {
        ...device,
        state: {
          ...device.state,
          [action.payload.updatedVariableName]:
            action.payload.updatedVariableValue,
        },
      };

      newState[deviceIndex] = updatedDevice;

      return newState;
    }

    default:
      return state;
  }
};
