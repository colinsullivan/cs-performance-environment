export const parseJsonOrError = <T>(payloadJson: string): T => {
  try {
    const payload = JSON.parse(payloadJson) as T;
    return payload;
  } catch (e) {
    console.log(`Error parsing payload: ${payloadJson}`);
    throw e;
  }
};
