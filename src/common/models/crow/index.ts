import { READY_STATES } from "../ready_states";
import { CrowDevice, CrowState } from "./api";

const createCrowState = (): CrowState => ({
  tempo: undefined,
});

export const createCrowDevice = (id: string, name: string): CrowDevice => ({
  id,
  name,
  readyState: READY_STATES.CONNECTING,
  state: createCrowState(),
  serialPort: undefined,
});
