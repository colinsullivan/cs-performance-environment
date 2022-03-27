import {AbletonSession, AbletonState} from "./api";


export const createAbletonSession = (): AbletonSession => ({
  linkEnabled: false,
  isPlaying: false,
  tempo: 60.0
});

export const createAbletonState = (): AbletonState => ({
  session: createAbletonSession()
});
