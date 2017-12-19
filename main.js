/**
 *  @file       main.js
 *
 *	@desc       Test to determine round-trip latency when using outboard
 *	synths.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import { createStore } from "redux"
import supercolliderRedux from "supercollider-redux"
import abletonLinkRedux from "abletonlink-redux"
import SCStoreController from "./ui/src/SCStoreController"
import AbletonLinkController from "./ui/src/AbletonLinkController"
import awakeningSequencers from "awakening-sequencers"

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

var rootReducer = function (state = create_default_state(), action) {
  state.abletonlink = abletonLinkRedux.reducer(state.abletonlink, action);
  state.supercolliderRedux = supercolliderRedux.reducer(
    state.supercolliderRedux, 
    action
  );
  state.sequencers = awakeningSequencers.reducer(state.sequencers, action);

  return state;
}

console.log("Creating store...");
var store = createStore(rootReducer);

console.log("Creating SCController...");
var scController = new SCController();
scController.boot().then(() => {
  console.log("Creating SCStoreController...");
  var scStoreController = new SCStoreController(store);

  //scBooted();
});


console.log("Creating AbletonLinkController...");
//var abletonLinkController = new AbletonLinkController(store, 'abletonlink');

var scBooted = function () {
  let state = store.getState();
  var lastState = {
    sequencers: {
      outboardTest: {
        isReady: state.sequencers.outboardTest.isReady
      }
    }
  };

  store.subscribe(() => {
    let state = store.getState();
    let outboardTest = state.sequencers.outboardTest;

    if (
      outboardTest.isReady != lastState.sequencers.outboardTest.isReady
    ) {
      lastState.sequencers.outboardTest.isReady = outboardTest.isReady;
      console.log("Queuing outboardTest sequencer...");

      store.dispatch(
        awakeningSequencers.actions.sequencerQueued('outboardTest')
      );
    }
  });
}



