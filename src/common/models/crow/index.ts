import { READY_STATES } from "../ready_states";
import { CrowDevice, CrowState } from "./api";

const createCrowState = (): CrowState => ({
  tempo: undefined,
  sustainSynkA: undefined,
  sustainSynkB: undefined,
});

export const createCrowDevice = (id: string, name: string): CrowDevice => ({
  id,
  name,
  readyState: READY_STATES.CONNECTING,
  state: createCrowState(),
  serialPort: undefined,
});

export const findCrowDeviceIndexById = (state: CrowDevice[], id: string) => {
  const deviceIndex = state.findIndex((d) => d.id === id);
  if (deviceIndex < 0) {
    throw new Error(`Crow device with id ${id} not found.`);
  }
  return deviceIndex;
};

export const findCrowDeviceIndexByPort = (state: CrowDevice[], devicePort: string) => {
  const deviceIndex = state.findIndex((d) => d.serialPort === devicePort);
  if (deviceIndex < 0) {
    throw new Error(`Crow device with port ${devicePort} not found.`);
  }
  return deviceIndex;
};

export const findCrowDeviceIndexByName = (state: CrowDevice[], name: string) => {
  const deviceIndex = state.findIndex((d) => d.name === name);
  if (deviceIndex < 0) {
    throw new Error(`Crow device with port ${name} not found.`);
  }
  return deviceIndex;
};
