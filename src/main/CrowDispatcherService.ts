import SerialPort from "serialport";
import { Middleware } from "redux";

import { SYSTEM_TEMPO_CHANGED, AllActionTypes } from "common/actions";

class CrowDispatcherService {
  crowPort: SerialPort;
  middleware: Middleware<unknown>;
  constructor(crowSerialPath: string) {
    this.crowPort = new SerialPort(crowSerialPath);

    this.middleware = (store) => (next) => (action) => {
      this.handleMiddleware(store, next, action);
    };
  }

  writeLua(lua) {
    this.crowPort.write(lua + "\n");
  }

  handleMiddleware(store, next, action: AllActionTypes) {
    switch (action.type) {
      case SYSTEM_TEMPO_CHANGED:
        this.writeLua(`tempo = ${action.payload.tempo}`);
        break;
      
      default:
        break;
    }
    next(action);
  }
}

export default CrowDispatcherService;
