import {combineReducers} from 'redux'
import abletonLinkRedux from "abletonlink-redux"
import awakeningSequencers from "awakening-sequencers"
import supercolliderRedux from "supercollider-redux"

function create_outboard_sequencer (id, type) {
  return Object.assign(awakeningSequencers.create_default_sequencer(id, type), {
    midiOutDeviceName: "minilogue",
    midiOutPortName: "SOUND",
    dur: 0.5
  });
}

export function create_default_state () {
  return {
    abletonlink: abletonLinkRedux.create_default_state(),
    sequencers: {
      'synkopaterA': create_outboard_sequencer(
        'synkopaterA',
        'SynkopaterOutboardSequencer'
      )
    }
  }
}

export default combineReducers({
  [abletonLinkRedux.DEFAULT_MOUNT_POINT]: abletonLinkRedux.reducer,
  [supercolliderRedux.DEFAULT_MOUNT_POINT]: supercolliderRedux.reducer,
  sequencers: awakeningSequencers.reducer
});
