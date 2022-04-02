import { AbletonTrackStateUpdate } from "common/actions";

export const parseJsonOrNull = <T>(payloadJson: string): T | null => {
  try {
    const payload = JSON.parse(payloadJson) as T;
    return payload;
  } catch (e) {
    console.log(`Error parsing payload: ${payloadJson}`);
    console.log(e);
    return null;
  }
};

export const parseAbletonTrackStateUpdatePayload = (
  payloadJson: string
): AbletonTrackStateUpdate["payload"] | null => {
  const payload =
    parseJsonOrNull<AbletonTrackStateUpdate["payload"]>(payloadJson);

  if (payload) {
    // If any track parameters are uninitialized ('*'), ignore event
    const track = payload.track;

    for (const key of Object.keys(track)) {
      if (track[key] === "*") {
        return null;
      }
    }

    return payload;
  }
  return null;
};
