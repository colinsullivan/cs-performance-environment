//s.options.inDevice = "UltraLite + BlackHole";
//s.options.outDevice = "UltraLite + BlackHole";
//s.options.numOutputBusChannels = 48;
//s.options.numInputBusChannels = 48;
//s.options.inDevice = "UL AVB + BlackHole";
//s.options.outDevice = "UL AVB + BlackHole";
//s.options.numOutputBusChannels = 50;
//s.options.numInputBusChannels = 52;
s.options.inDevice = "ES9 + BlackHole";
s.options.outDevice = "ES9 + BlackHole";
s.options.numOutputBusChannels = 32;
s.options.numInputBusChannels = 32;
//s.options.inDevice = "Blackhole 34ch";
//s.options.outDevice = "Blackhole 34ch";
//s.options.numOutputBusChannels = 34;
//s.options.numInputBusChannels = 34;

s.options.memSize = 1024000;
s.options.blockSize = 8;
s.options.hardwareBufferSize = 256;


API.mountDuplexOSC();
s.waitForBoot({
  SCReduxStore.getInstance().dispatch((
    type: SCRedux.actionTypes['SC_SYNTH_READY']
  ));
});
s.waitForBoot({
  var m = s.meter(),
    mBounds,
    performanceEnvironment;


  //MIDIClient.init();


  // move level meter to bottom right of screen
  mBounds = m.window.bounds;
  mBounds.left = 1440;
  mBounds.top = 900;
  m.window.setTopLeftBounds(mBounds);

  // debugging
  s.plotTree();

  performanceEnvironment = CSPerformanceEnvironment.new();
});

