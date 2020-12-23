import sequencers from './sequencers';
import { Sequencers } from './types';
import { create_synkopater_sequencer } from 'common/models/synkopater';
import { TRANSPOSE_DIRECTION } from 'common/models/types';
import { synkopater_transposed } from 'common/actions';

describe("sequencers", () => {;
  const sequencerId = 'one';
  let state : Sequencers;
  beforeEach(() => {
    state = {
      [sequencerId]: create_synkopater_sequencer(sequencerId, 'One', 0)
    };
  })
  test("handles transposing up", () => {

    state[sequencerId].notes = [20, 21, 22, 23];

    const action = synkopater_transposed(sequencerId, TRANSPOSE_DIRECTION.UP);
    const newState = sequencers(state, action);
    expect(newState).not.toEqual(state);
    expect(newState[sequencerId].notes).toEqual([32, 33, 34, 35]);
    
  });
  test("handles transposing down", () => {

    state[sequencerId].notes = [20, 21, 22, 23];

    const action = synkopater_transposed(sequencerId, TRANSPOSE_DIRECTION.DOWN);
    const newState = sequencers(state, action);
    expect(newState).not.toEqual(state);
    expect(newState[sequencerId].notes).toEqual([8, 9, 10, 11]);
    
  });

  test("handles not transposing past zero", () => {
    state[sequencerId].notes = [8, 9, 10, 11];

    const action = synkopater_transposed(sequencerId, TRANSPOSE_DIRECTION.DOWN);
    const newState = sequencers(state, action);
    expect(newState).toEqual(state);
  });

});
