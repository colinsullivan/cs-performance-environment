import abletonLinkRedux from "abletonlink-redux"
import awakeningSequencers from "awakening-sequencers"
import supercolliderRedux from "supercollider-redux"

function create_outboard_sequencer (name) {
  return Object.assign(awakeningSequencers.create_default_sequencer(name), {
    midiOutDeviceName: "(in) SuperCollider",
    midiOutPortName: "(in) SuperCollider",
    dur: 0.5
  });
}

function create_default_state () {
  return {
    sequencers: {
      'outboardTest': create_outboard_sequencer('outboardTest')
    }
  }
}
export default function (state = create_default_state(), action) {
  state.abletonlink = abletonLinkRedux.reducer(state.abletonlink, action);
  state.supercolliderRedux = supercolliderRedux.reducer(
    state.supercolliderRedux, 
    action
  );
  state.sequencers = awakeningSequencers.reducer(state.sequencers, action);

  return state;
}

