import { AbletonSession } from "common/models/ableton/api";

export const ABLETON_SESSION_STATE_UPDATE = "ABLETON_SESSION_STATE_UPDATE";
export interface AbletonSessionStateUpdate {
  type: typeof ABLETON_SESSION_STATE_UPDATE;
  payload: AbletonSession;
}

export const abletonSessionStateUpdate = (
  payload: AbletonSession
): AbletonSessionStateUpdate => ({
  type: ABLETON_SESSION_STATE_UPDATE,
  payload,
});
