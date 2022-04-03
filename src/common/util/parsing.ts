import { AbletonTrack } from "common/models";

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

const areAnyValuesAsterisk = (obj: Record<string, unknown>) => {
    for (const val of Object.values(obj)) {
      if (val === "*") {
        return true;
      }
    }
  return false;
}

export const parseAbletonTrackStateUpdatePayload = (
  payloadJson: string
): AbletonTrack | null => {
  const track = parseJsonOrNull<AbletonTrack>(payloadJson);

  if (track) {
    // If any track parameters are uninitialized ('*'), ignore event
    if (areAnyValuesAsterisk(track as unknown as Record<string, unknown>)) {
      return null;
    }
    for (const val of Object.values(track)) {
      if (typeof val === "object") {
        if (areAnyValuesAsterisk(val)) {
          return null;
        }
      }
    }

    // If any of the track's device parameters are uninitialized, ignore event

    return track;
  }
  return null;
};
