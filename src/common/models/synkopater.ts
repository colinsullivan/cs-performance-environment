import SCReduxSequencers from "supercollider-redux-sequencers";
import { pick } from "lodash";

import { create_performance_component } from "./performance_component";
import {
  SynkopaterPerformanceComponent,
  ARP_MODES,
  SynkopaterSequencer,
  PresetProps,
} from "./types";

// Defines which keys can be set direction with the SEQUENCER_STATE_UPDATED action
export type SequencerParamKeys =
  | "dur"
  | "stretch"
  | "legato"
  | "offset"
  | "euclideanTotalNumHits"
  | "euclideanNumHits";

export const create_synkopater_sequencer = (
  id: string,
  scClassName: string,
  midiChan: number
): SynkopaterSequencer => ({
  ...SCReduxSequencers.create_default_sequencer(id, scClassName),
  dur: 0.5,
  stretch: 1.0,
  legato: 1.0,
  offset: 0,
  notes: [96, 84, 86, 87],
  //arp_vels: [1.0, 1.0, 1.0, 1.0],
  arpMode: ARP_MODES.UP,
  //arp_updown_current_direction: 1,
  //arp_note_index: 0,
  //numBeats: 4,
  euclideanNumHits: 4,
  euclideanTotalNumHits: 4,
  playQuant: [4, 4],
  stopQuant: [4, 4],
  propQuant: [4, 4],
  midiChan,
  // Delay has not yet been calculated, this is for display-only
  delaySecs: null,
  presets: [],
});

export const create_synkopater_component = (
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
    launchControlController: {
      pg0_kn_pan_1: "delayFeedbackControl",
    },
  },
  presets: [],
  currentPresetId: null,
});

export const getGlobalQuant = (sequencer: SynkopaterSequencer): number => {
  if (
    sequencer.playQuant[0] === sequencer.stopQuant[0] &&
    sequencer.playQuant[0] === sequencer.propQuant[0]
  ) {
    return sequencer.playQuant[0];
  }
  throw new Error("Sequencer has different quants for play and props...");
};

export const synkopaterComponentToPresetProps = (
  comp: SynkopaterPerformanceComponent
): PresetProps => ({
  ...comp.parameters,
});

export const synkopaterSequencerToPresetProps = (
  seq: SynkopaterSequencer
): PresetProps =>
  pick(seq, [
    "dur",
    "stretch",
    "legato",
    "offset",
    "notes",
    "arpMode",
    "euclideanNumHits",
    "euclideanTotalNumHits",
    "playQuant",
    "stopQuant",
    "propQuant",
  ]);
