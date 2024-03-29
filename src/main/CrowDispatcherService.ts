import SerialPort from "serialport";
import { Middleware, createStore } from "redux";

import { SYSTEM_TEMPO_CHANGED, AllActionTypes } from "common/actions";
import { getCrow, getTempo, getCrowState } from "common/selectors";
import {
  crowDeviceConnected,
  crowStateUpdated,
  CROW_DEVICE_CONNECTED,
  initializeCrowDevice,
  INITIALIZE_CROW_DEVICE,
} from "common/actions/crow";
import { getEnvOrError } from "common/util";
import { CrowState, CrowDevice } from "common/models/crow/api";

const debug = false;

const createReadlineParser = () =>
  new SerialPort.parsers.Readline({
    delimiter: "\n",
  });

const parseStringArg = (arg: string) =>
  arg.split("'").join("").split('"').join("");

class CrowDispatcherService {
  store: ReturnType<typeof createStore> | undefined;
  crowPorts: SerialPort[];
  crowPortsBySerialPath: Record<string, SerialPort>;
  middleware: Middleware<unknown>;
  constructor() {
    this.crowPorts = [];
    this.crowPortsBySerialPath = {};

    this.middleware = (store) => (next) => (action) => {
      this.handleMiddleware(store, next, action);
    };
  }
  setStore(store: ReturnType<typeof createStore>) {
    this.store = store;
  }
  getStore() {
    if (!this.store) {
      throw new Error("Store not initialized");
    }
    return this.store;
  }

  updateCrowState(crowDevice: CrowDevice, newState: CrowState) {
    if (!crowDevice.serialPort) {
      console.log("Crow serial port not ready.");
      return;
    }

    const port = this.crowPortsBySerialPath[crowDevice.serialPort];
    if (!port) {
      throw new Error("Cannot find port");
    }

    for (const key of Object.keys(newState)) {
      if (newState[key] && `${newState[key]}` !== `${crowDevice.state[key]}`) {
        this.writeLuaToPort(`public.${key} = ${newState[key]}`, port);
      }
    }
  }

  async initialize() {
    const CROW_DISABLED = getEnvOrError("CROW_DISABLED") === "1";
    if (CROW_DISABLED) {
      return;
    }
    const store = this.getStore();
    const crowDevices = getCrow(store.getState());
    const serialDevicesList = await SerialPort.list();

    const crowDeviceInfo = serialDevicesList.filter(
      (s) => s.manufacturer === "monome & whimsical raps"
    );

    if (crowDeviceInfo.length !== crowDevices.length) {
      throw new Error(
        `Expected ${crowDevices.length} crow devices but found only ${crowDeviceInfo.length}`
      );
    }

    for (const deviceInfo of crowDeviceInfo) {
      store.dispatch(initializeCrowDevice(deviceInfo.path));
    }

    store.subscribe(() => {
      const crowDevices = getCrow(store.getState());
      for (const crowDevice of crowDevices) {
        const newState = getCrowState(store.getState());
        this.updateCrowState(crowDevice, newState);
      }
    });
  }

  writeLuaToPort(lua: string, port: SerialPort) {
    if (debug) {
      console.log("writing", lua);
    }
    port.write(lua + "\n");
  }

  writeLuaToAllPorts(lua: string) {
    for (const port of this.crowPorts) {
      this.writeLuaToPort(lua, port);
    }
  }

  handleIncomingMessage(msg: string, port: string) {
    const store = this.getStore();
    // In theory Crow messages should start with ^^
    // but if Crow is printing junk then the ^^ may not be
    // the start of a line
    const crowCommandDetector = /.*\^\^.*$/;
    const crowCommandDetectorMatch = msg.match(crowCommandDetector);

    if (!crowCommandDetectorMatch) {
      if (debug) {
        console.log(`Received unknown message:`);
        console.log("msg");
        console.log(msg);
      }
      return;
    }

    const crowCommandParser = /.*\^\^(\w+)\((.*)\)\s*$/;
    const crowCommandParsed = msg.match(crowCommandParser);
    if (!crowCommandParsed) {
      throw new Error(`Error parsing msg: ${msg}`);
    }
    const crowCommandName = crowCommandParsed[1];
    const crowCommandArgs = crowCommandParsed[2].split(",");

    switch (crowCommandName) {
      case "pupdate":
        const updatedVariableName = parseStringArg(crowCommandArgs[0]);
        const updatedVariableValue = crowCommandArgs[1];
        store.dispatch(
          crowStateUpdated(port, updatedVariableName, updatedVariableValue)
        );
        break;

      case "identity":
        const id = parseStringArg(crowCommandArgs[0]);
        store.dispatch(crowDeviceConnected(id, port));
        break;

      default:
        console.log(`unknown crow command: ${msg}`);
        break;
    }
  }

  updateCrowTempo(tempo: number) {
    // Write tempo value to all crows
    this.writeLuaToAllPorts(`public.tempo = ${tempo}`);
  }

  private beginCrowInitialization(serialPortPath: string) {
    const port = this.crowPortsBySerialPath[serialPortPath];
    this.writeLuaToPort("^^init()", port);
  }

  handleMiddleware(store, next, action: AllActionTypes) {
    const CROW_DISABLED = getEnvOrError("CROW_DISABLED") === "1";
    if (CROW_DISABLED) {
      return next(action);
    }
    switch (action.type) {
      case SYSTEM_TEMPO_CHANGED:
        this.updateCrowTempo(action.payload.tempo);
        break;
      case INITIALIZE_CROW_DEVICE:
        const { serialPort } = action.payload;
        const port = new SerialPort(serialPort);
        const reader = createReadlineParser();
        port.pipe(reader);
        reader.on("data", (d) => this.handleIncomingMessage(d, serialPort));
        this.crowPorts.push(port);
        this.crowPortsBySerialPath[port.path] = port;
        this.beginCrowInitialization(port.path);
        break;

      case CROW_DEVICE_CONNECTED:
        this.updateCrowTempo(getTempo(store.getState()));
        break;
      default:
        break;
    }
    return next(action);
  }
}

export default CrowDispatcherService;
