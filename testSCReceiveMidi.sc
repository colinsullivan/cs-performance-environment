/**
 *  @file       testSCReceiveMidi.sc
 *
 *	@desc       To demonstrate that when running with an external SC, midi works
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/


MIDIClient.init;
MIDIIn.connectAll;
s.waitForBoot({
  var testInPort,
    testInController;
  "booted!".postln();

  testInPort = MIDIIn.findPort("testSCReceiveMidi", "testSCReceiveMidi");

  if (testInPort != nil, {
    "opened test input port!".postln();
    "testInPort.uid:".postln;
    testInPort.uid.postln;

    "Creating controller...".postln();
    testInController = LaunchControlXLKtl.new(testInPort.uid);
    "Controller created.".postln();


    // upper knob 1 is channel 0, cc13
    testInController.mapCCS(1, \knu1, {
      arg ccval;

      "ccval:".postln;
      ccval.postln;

    });
  }, {
    "test input port not found.".postln();
  });
});
