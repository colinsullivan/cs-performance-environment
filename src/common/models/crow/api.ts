import { READY_STATES } from "../ready_states";

export interface CrowState {
  tempo: number | undefined;
}

export interface CrowDevice {
  // The internal ID of the crow
  id: string;

  // The name of crow in the system
  name: string;

  // Is this crow device ready
  readyState: READY_STATES;

  // The crow's public state
  state: CrowState;

  // The serial port for this crow
  serialPort: string | undefined;
}
