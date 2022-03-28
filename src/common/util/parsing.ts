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
