export const INITIALIZE_CROW_DEVICE = "INITIALIZE_CROW_DEVICE";
export interface InitializeCrowDevice {
  type: typeof INITIALIZE_CROW_DEVICE;
  payload: {
    serialPort: string;
  };
}
export const initializeCrowDevice = (serialPort: string) => ({
  type: INITIALIZE_CROW_DEVICE,
  payload: {
    serialPort,
  },
});

export const CROW_DEVICE_CONNECTED = "CROW_DEVICE_CONNECTED";
export interface CrowDeviceConnected {
  type: typeof CROW_DEVICE_CONNECTED;
  payload: {
    id: string;
    serialPort: string;
  };
}
export const crowDeviceConnected = (id: string, serialPort: string) => ({
  type: CROW_DEVICE_CONNECTED,
  payload: {
    id,
    serialPort,
  },
});

export const CROW_STATE_UPDATED = "CROW_STATE_UPDATED";
export interface CrowStateUpdated {
  type: typeof CROW_STATE_UPDATED;
  payload: {
    serialPort: string;
    updatedVariableName: string;
    updatedVariableValue: string;
  };
}
export const crowStateUpdated = (
  serialPort: string,
  updatedVariableName: string,
  updatedVariableValue: string
) => ({
  type: typeof CROW_STATE_UPDATED,
  payload: {
    serialPort,
    updatedVariableName,
    updatedVariableValue,
  },
});
