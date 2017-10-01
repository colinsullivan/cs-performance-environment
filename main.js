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
import sc from 'supercolliderjs';
import supercolliderRedux from "supercollider-redux"
import abletonLinkRedux from "abletonlink-redux"
import SCStoreController from "./SCStoreController"
import AbletonLinkController from "./AbletonLinkController"
import awakeningSequencers from "awakening-sequencers"

const EXTERNAL_SC = process.env.EXTERNAL_SC;

function create_default_state () {
  return {
    sequencers: {
      'outboardTest': awakeningSequencers.create_default_sequencer(
        'outboardTest'
      )
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

console.log("Creating SCStoreController...");
var scStoreController = new SCStoreController(store);

console.log("Creating AbletonLinkController...");
var abletonLinkController = new AbletonLinkController(store, 'abletonlink');

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

if (EXTERNAL_SC) {
  scBooted();
} else {
  console.log("Booting SuperCollider...");
  var sclangInstance = null;
  sc.lang.boot().then((sclang) => {
    console.log("sclang booted.");
    sclangInstance = sclang;

    scBooted();

    sclangInstance.executeFile(__dirname + '/main.sc').catch((err) => {
      if (err) {
        console.log("ERROR while executing main.sc");
        console.log("err");
        console.log(err);
      }
    });
  });
}


