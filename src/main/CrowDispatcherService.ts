import SerialPort from "serialport";
import { Middleware } from "redux";

import { SYSTEM_TEMPO_CHANGED } from "common/actions";

const CROW_SERIAL_PATH = process.env.CROW_SERIAL_PATH;

class CrowDispatcherService {
  crowPort: SerialPort;
  middleware: Middleware<unknown>;
  constructor() {
    if (!CROW_SERIAL_PATH) {
      throw new Error("Expected CROW_SERIAL_PATH environment variable");
    }
    this.crowPort = new SerialPort(CROW_SERIAL_PATH as string);

    this.middleware = (store) => (next) => (action) => {
      this.handleMiddleware(store, next, action);
    };
  }

  writeLua(lua) {
    this.crowPort.write(lua + "\n");
  }

  handleMiddleware(store, next, action) {
    switch (action.type) {
      case SYSTEM_TEMPO_CHANGED:
        this.writeLua(`tempo = ${action.tempo}`);
        break;
      
      default:
        break;
    }
    next(action);
  }
}

export default CrowDispatcherService;
