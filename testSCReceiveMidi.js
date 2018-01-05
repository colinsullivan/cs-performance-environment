/**
 *  @file       testSCReceiveMidi.js
 *
 *	@desc       An isolated test to see if SC launched from Node.js can
 *	receive MIDI.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

import midi from 'midi';
import easymidi from 'easymidi';
import sc from 'supercolliderjs';

const portName = "testSCReceiveMidi";

const EXTERNAL_SC = process.env.EXTERNAL_SC || false;

var output = new easymidi.Output(portName, true),
  sclangOptions = {
    debug: true
  },
  sc_booted;

sc_booted = function () {
  setTimeout(() => {
    console.log("sending cc message...");
    output.send('cc', {
      controller: 13,
      value: 64,
      channel: 0
    });

    output.close();
  }, 5000);
};

if (EXTERNAL_SC) {
  sc_booted();
} else {
  sc.lang.boot(sclangOptions).then((sclang) => {

    return sclang.interpret(`
  MIDIClient.init;
  MIDIIn.connectAll;
  s.waitForBoot({
    var testInPort,
      testInController;
    "booted!".postln();

    testInPort = MIDIIn.findPort("${portName}", "${portName}");

    if (testInPort != nil, {
      "opened test input port!".postln();

      "Creating controller...".postln();
      testInController = LaunchControlXLKtl.new(testInPort.uid);
      "Controller created.".postln();


      // upper knob 1 is channel 0, cc13
      testInController.mapCCS(1, \\knu1, {
        arg ccval;

        "ccval:".postln;
        ccval.postln;

      });
       
    }, {
      "test input port not found.".postln();
    });
  });
    `).then(sc_booted).catch((err) => {
      console.log("ERROR while setting up SC");
      console.log("err");
      console.log(err);
    })
    
  }).catch((err) => {
    throw err;
  });
}


