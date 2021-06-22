import SCReduxSequencers from "supercollider-redux-sequencers";
import { pick } from "lodash";

import { create_performance_component } from "./performance_component";
import {
  SynkopaterPerformanceComponent,
  ARP_MODES,
  SynkopaterSequencer,
  PerformanceComponentPreset,
} from "./types";



export const sequencerIds = ["synkopaterA", "synkopaterB"];

export const create_synkopater_sequencer = (
  id: string,
  scClassName: string,
  midiChan: number,
  midiOutDeviceName: string,
  midiOutPortName: string
): SynkopaterSequencer => ({
  ...SCReduxSequencers.create_default_sequencer(id, scClassName),
  dur: 0.5,
  stretch: 1.0,
  legato: 1.0,
  offset: 0,
  notes: [96, 84, 86, 87],
  velocities: [64, 64, 64, 64],
  cc1: [64, 64, 75, 95, 105, 110, 127],
  cc74: [64, 104],
  //arp_vels: [1.0, 1.0, 1.0, 1.0],
  arpMode: ARP_MODES.UP,
  //arp_updown_current_direction: 1,
  //arp_note_index: 0,
  //numBeats: 4,
  euclideanNumHits: 4,
  euclideanTotalNumHits: 4,
  euclidBounceEnabled: false,
  euclidBounceFirstDur: 4,
  euclidBounceFirstBeats: 4,
  euclidBounceFirstBeatsMult: 1,
  euclidBounceSecondDur: 4,
  euclidBounceSecondBeats: 4,
  euclidBounceSecondBeatsMult: 1,
  secondEuclieanNumHits: 4,
  secondEuclieanTotalNumHits: 4,
  playQuant: [4, 0],
  stopQuant: [4, 0],
  propQuant: [4, 0],
  midiChan,
  midiOutDeviceName,
  midiOutPortName,
  // Delay has not yet been calculated, this is for display-only
  delaySecs: null,
  savedQuants: {},
  changesAppliedAt: 0,
  lastUpdateId: ""
});

export const create_synk_delay_component = (
  id: string,
  inputBus: number,
  outputBus: number
): SynkopaterPerformanceComponent => ({
  ...create_performance_component(id, "SynkopaterDelay"),
  sequencerId: id,
  inputBus,
  outputBus,
  parameters: {
    delayFactor: 1.0,
    delayFeedback: 0.0,
  },
  controllerMappings: {
    //launchControlController: {
    //pg0_kn_sndA_1: "delayFeedbackControl",
    //},
    pc12Controller: {
      B10_kn_C_10: "delayFeedbackControl",
    },
  },
  presets: [],
  currentPresetId: null,
  followOctatrackPattern: false,
});

export const findPresetForOctatrackPattern = (
  octatrackPatternValue: number,
  synkopaterComponent: SynkopaterPerformanceComponent
): PerformanceComponentPreset | undefined => {
  return synkopaterComponent.presets.find(
    (p: PerformanceComponentPreset) =>
      p.octatrackPatternValue === octatrackPatternValue
  );
};

export const getGlobalQuant = (
  sequencer: SynkopaterSequencer
): number | null => {
  if (
    sequencer.playQuant &&
    sequencer.stopQuant &&
    sequencer.propQuant &&
    sequencer.playQuant[0] === sequencer.stopQuant[0] &&
    sequencer.playQuant[0] === sequencer.propQuant[0]
  ) {
    return sequencer.playQuant[0];
  } else {
    return null;
  }
};

export const synkopaterToPresetProps = (
  synkopaterComponent: SynkopaterPerformanceComponent,
  synkopaterSequencer: SynkopaterSequencer
) => ({
  synkopaterSequencerProps: pick(synkopaterSequencer, [
    "dur",
    "stretch",
    "legato",
    "offset",
    "notes",
    "velocities",
    "cc1",
    "cc74",
    "arpMode",
    "euclideanNumHits",
    "euclideanTotalNumHits",
    "euclidBounceEnabled",
    "euclidBounceFirstDur",
    "euclidBounceFirstBeats",
    "euclidBounceFirstBeatsMult",
    "euclidBounceSecondDur",
    "euclidBounceSecondBeats",
    "euclidBounceSecondBeatsMult",
    "secondEuclieanNumHits",
    "secondEuclieanTotalNumHits",
  ]),
  synkopaterComponentProps: {
    ...synkopaterComponent.parameters,
  },
});

export const applyPresetToSynkopaterComponent = (
  comp: SynkopaterPerformanceComponent,
  preset: PerformanceComponentPreset
): SynkopaterPerformanceComponent => ({
  ...comp,
  parameters: {
    ...comp.parameters,
    ...preset.props.synkopaterComponentProps,
  },
});

export const applyPresetToSynkopaterSequencer = (
  seq: SynkopaterSequencer,
  preset: PerformanceComponentPreset
): SynkopaterSequencer => ({
  ...seq,
  ...preset.props.synkopaterSequencerProps,
  changesAppliedAt: new Date().getTime() / 1000,
});
