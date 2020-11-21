//s.options.inDevice = "UltraLite + BlackHole";
//s.options.outDevice = "UltraLite + BlackHole";
//s.options.numOutputBusChannels = 48;
//s.options.numInputBusChannels = 48;
s.options.inDevice = "UL AVB + BlackHole";
s.options.outDevice = "UL AVB + BlackHole";
s.options.numOutputBusChannels = 52;
s.options.numInputBusChannels = 50;

s.options.memSize = 1024000;
s.options.blockSize = 8;

s.waitForBoot({
  var m = s.meter(),
    mBounds,
    performanceEnvironment;

  MIDIClient.init();
  MIDIIn.connectAll();

  // move level meter to bottom right of screen
  mBounds = m.window.bounds;
  mBounds.left = 1440;
  mBounds.top = 900;
  m.window.setTopLeftBounds(mBounds);

  // debugging
  s.plotTree();
  
  performanceEnvironment = CSPerformanceEnvironment.new();
});

