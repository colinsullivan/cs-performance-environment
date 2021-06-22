import sequencers from "./sequencers";
import { Sequencers } from "./types";
import { create_synkopater_sequencer } from "common/models/synkopater";
import { TRANSPOSE_DIRECTION } from "common/models/types";
import {
  synkopater_transposed,
  sequencer_update_mod,
  sequencer_update_mod_length,
  sequencerChangesAppliedTimeout,
  sequencer_toggle_euclid_bounce
} from "common/actions";
import { create_default_state } from "common/reducers";

const allState = create_default_state();
describe("sequencers", () => {
  const sequencerId = "one";
  let state: Sequencers;
  beforeEach(() => {
    state = {
      [sequencerId]: create_synkopater_sequencer(sequencerId, "One", 0, "MidiOutDevice", "MidiOutDevicePort"),
    };
  });
  test("handles transposing up", () => {
    state[sequencerId].notes = [20, 21, 22, 23];

    const action = synkopater_transposed(sequencerId, TRANSPOSE_DIRECTION.UP);
    const newState = sequencers(state, action, allState);
    expect(newState).not.toEqual(state);
    expect(newState[sequencerId].notes).toEqual([32, 33, 34, 35]);
  });
  test("handles transposing down", () => {
    state[sequencerId].notes = [20, 21, 22, 23];

    const action = synkopater_transposed(sequencerId, TRANSPOSE_DIRECTION.DOWN);
    const newState = sequencers(state, action, allState);
    expect(newState).not.toEqual(state);
    expect(newState[sequencerId].notes).toEqual([8, 9, 10, 11]);
  });

  test("handles not transposing past zero", () => {
    state[sequencerId].notes = [8, 9, 10, 11];

    const action = synkopater_transposed(sequencerId, TRANSPOSE_DIRECTION.DOWN);
    const newState = sequencers(state, action, allState);
    expect(newState).toEqual(state);
  });

  test("handles updating modulation sequence", () => {
    const newVelocities = [64, 84, 94, 104];
    state[sequencerId].velocities = [64, 64, 64, 64];
    const action = sequencer_update_mod(
      sequencerId,
      "velocities",
      newVelocities
    );
    const newState = sequencers(state, action, allState);
    expect(newState).not.toEqual(state);
    expect(newState[sequencerId].velocities).toEqual(newVelocities);
  });

  test("Errors if updating modulation sequence out of bounds", () => {
    const newVelocities = [64, 84, 94, 150];
    state[sequencerId].velocities = [64, 64, 64, 64];
    const action = sequencer_update_mod(
      sequencerId,
      "velocities",
      newVelocities
    );
    expect(() => sequencers(state, action, allState)).toThrow();
  });

  test("Errors if trying to set to a new length", () => {
    const newVelocities = [64, 84, 94];
    state[sequencerId].velocities = [64, 64, 64, 64];
    const action = sequencer_update_mod(
      sequencerId,
      "velocities",
      newVelocities
    );
    expect(() => sequencers(state, action, allState)).toThrow();
  });

  test("Sets mod sequence to a larger length", () => {
    state[sequencerId].cc1 = [64, 64, 64, 84];
    const action = sequencer_update_mod_length(sequencerId, "cc1", 6);
    const newState = sequencers(state, action, allState);
    expect(newState).not.toEqual(state);
    expect(newState[sequencerId].cc1).toEqual([64, 64, 64, 84, 84, 84]);
  });

  test("sets mod sequence to a smaller length", () => {
    state[sequencerId].cc1 = [64, 64, 64, 84];
    const action = sequencer_update_mod_length(sequencerId, "cc1", 2);
    const newState = sequencers(state, action, allState);
    expect(newState).not.toEqual(state);
    expect(newState[sequencerId].cc1).toEqual([64, 64]);
  });

  test("sets changesAppliedAt", () => {
    const action = sequencerChangesAppliedTimeout(sequencerId);
    const newState = sequencers(state, action, allState);
    expect(newState).not.toEqual(state);
    expect(newState[sequencerId].changesAppliedAt).toEqual(action.payload.timestamp);
  });

  test("turning on euclid bounce copies current seq settings", () => {
    state[sequencerId].euclidBounceEnabled = false;
    state[sequencerId].dur = 8;
    state[sequencerId].euclideanNumHits = 8;
    state[sequencerId].euclideanTotalNumHits = 16;
    const action = sequencer_toggle_euclid_bounce(sequencerId);
    const newState = sequencers(state, action, allState);

    expect(newState).not.toEqual(state);
    expect(newState[sequencerId]).toStrictEqual({
      ...state[sequencerId],
      euclidBounceEnabled: !state[sequencerId].euclidBounceEnabled,
      euclidBounceFirstDur: 8,
      euclidBounceSecondDur: 8,
      secondEuclieanNumHits: 8,
      secondEuclieanTotalNumHits: 16
    })
  });
 
  test("turning off euclid bounce does not change seq settings", () => {

    state[sequencerId].euclidBounceEnabled = true;
    state[sequencerId].dur = 8;
    state[sequencerId].euclideanNumHits = 8;
    state[sequencerId].euclideanTotalNumHits = 16;
    const action = sequencer_toggle_euclid_bounce(sequencerId);
    const newState = sequencers(state, action, allState);

    expect(newState).not.toEqual(state);
    expect(newState[sequencerId]).toStrictEqual({
      ...state[sequencerId],
      euclidBounceEnabled: !state[sequencerId].euclidBounceEnabled,
    })
  })
});
