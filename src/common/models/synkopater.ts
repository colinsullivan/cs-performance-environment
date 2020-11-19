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
  midiChan,
  // Delay has not yet been calculated, this is for display-only
  delaySecs: null,
});

export type SynkopaterPerformanceComponent = PerformanceComponent & {
  sequencerId: string;
  inputBus: number;
  outputBus: number;
  parameters: object;
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
