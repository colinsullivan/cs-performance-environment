import SCReduxSequencers, {
  SCReduxSequencer,
} from "supercollider-redux-sequencers";
import {
  create_performance_component,
  PerformanceComponent,
} from "./performance_component";

export enum ARP_MODES {
  UP = "UP",
  DOWN = "DOWN",
  UPDOWN = "UPDOWN",
}

export enum TRANSPOSE_DIRECTION {
  UP = 1,
  DOWN = -1
};

export type SynkopaterSequencer = SCReduxSequencer & {
  dur: number;
  stretch: number;
  legato: number;
  offset: number;
  notes: number[];
  arpMode: ARP_MODES;
  euclideanNumHits: number;
  euclideanTotalNumHits: number;
  midiChan: number;
  delaySecs: number | null;
};

// Defines which keys can be set direction with the SEQUENCER_STATE_UPDATED action
export type SequencerParamKeys = 'dur' | 'stretch' | 'legato' | 'offset' | 'euclideanTotalNumHits' | 'euclideanNumHits';

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
  playQuant: [4, 0],
  stopQuant: [4, 0],
  propQuant: [4, 0],
  midiChan,
  // Delay has not yet been calculated, this is for display-only
  delaySecs: null,
});

export type SynkopaterPerformanceComponent = PerformanceComponent & {
  sequencerId: string;
  inputBus: number;
  outputBus: number;
  parameters: {
    delayFactor: number,
    delayFeedback: number
  };
};

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
});
