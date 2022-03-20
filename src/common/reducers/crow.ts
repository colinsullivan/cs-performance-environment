import { AllActionTypes } from "common/actions";
import { CROW_DEVICE_CONNECTED } from "common/actions/crow";
import { CrowDevice } from "common/models/crow/api";

export const crowReducer = (
  state: CrowDevice[] = [],
  action: AllActionTypes
) => {
  switch (action.type) {
    case CROW_DEVICE_CONNECTED:
      const { id, serialPort } = action.payload;

      // Find crow device
      const deviceIndex = state.findIndex((d) => d.id === id);
      if (deviceIndex < 0) {
        throw new Error(`Crow device with id ${id} not found.`);
      }

      // Update serial port
      const updatedDevice = { ...state[deviceIndex], serialPort };
      const newState = [...state];
      newState[deviceIndex] = updatedDevice;
      return newState;

    default:
      return state;
  }
};
