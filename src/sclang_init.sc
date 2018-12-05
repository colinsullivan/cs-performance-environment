MIDIClient.init;
MIDIIn.connectAll;
API.mountDuplexOSC();
s.options.inDevice = "JackRouter";
s.options.outDevice = "JackRouter";
s.options.numOutputBusChannels = 48;
s.options.numInputBusChannels = 48;
s.options.memSize = 8192 * 2 * 2 * 2;
s.options.blockSize = 8;

s.waitForBoot({
  var m = s.meter(),
    mBounds,
    performanceEnvironment;
  // move level meter to bottom right of screen
  mBounds = m.window.bounds;
  mBounds.left = 1440;
  mBounds.top = 900;
  m.window.setTopLeftBounds(mBounds);
  performanceEnvironment = CSPerformanceEnvironment.new();
});

