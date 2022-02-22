const envDefaults = {
  REACT_APP_SYNKOPATER_MIDI_OUT_DEVICE_NAME: "aMidiDevice",
  REACT_APP_SYNKOPATER_MIDI_OUT_DEVICE_PORT: "aMidiPort",
};
export const getEnvOrError = jest.fn((envName) => {
  return envDefaults[envName];
});
