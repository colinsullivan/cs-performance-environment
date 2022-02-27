/**
 *  @file       CSPerformanceEnvironment.sc
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

CSPerformanceEnvironment {
  var store,
    sequencerFactory,
    componentFactory,
    clockController,
    randomHarpEnvironment,
    runningWaterEnvironment,
    granularChaosEnvironment,
    shakerTextureInstr,
    vileKickEnvironment,
    wideBassEnvironment,
    lazersEnvironment,
    clockEnvironment,
    octatrackStateDispatcher,
    supersawVoicerEnvironment;

  *new {
    ^super.new.init();
  }

  init {
    arg params;

    store = SCReduxStore.getInstance();

    //Server.default.latency = 0.9;
    Server.default.latency = 0.33;
    //Server.default.latency = 0.0;

    clockController = LinkClockController.new((
      store: store
    ));

    //clockController.clock.latency = Server.default.latency + 0.2;
    //clockController.clock.latency = Server.default.latency + 0.0426;
    //clockController.clock.latency = Server.default.latency;
    //clockController.clock.latency = 0.46;
    //clockController.clock.latency = 0.0213 + Server.default.latency;
    clockController.clock.latency = -0.19;
    //clockController.clock.latency = 0;

    sequencerFactory = SCReduxSequencerFactory.getInstance();
    sequencerFactory.setStore(store);
    sequencerFactory.setClock(clockController.clock);

    componentFactory = PerformanceComponentFactory.getInstance();
    componentFactory.setStore(store);
    componentFactory.setClock(clockController.clock);

    runningWaterEnvironment = RunningWaterEnvironment.new((
      store: store,
      outputBus: 20,
      origin: [0, -500],
      clock: clockController.clock,
      store: store
    ));
    granularChaosEnvironment = GranularChaosEnvironment.new((
      store: store,
      outputBus: 22,
      origin: [0, -150],
      clock: clockController.clock,
      store: store
    ));
    shakerTextureInstr = ShakerTextureInstrument.new((
      store: store,
      outputBus: 24,
      origin: [0, -750],
      clock: clockController.clock,
      store: store
    ));
    randomHarpEnvironment = RandomHarpSamplerEnvironment.new((
      store: store,
      outputBus: 26,
      origin: [0, -1000],
      clock: clockController.clock,
      store: store
    ));
    //vileKickEnvironment = VileKickEnvironment.new((
      //inChannel: 6,
      //outputBus: 24
    //));
    wideBassEnvironment = WideBassVoicerEnvironment.new((
      inChannel: 0,
      outputBus: 28
    ));
    //lazersEnvironment = RandomizedLazersEnvironment.new((
      //inChannel: 7,
      //outputBus: 32
    //));
    supersawVoicerEnvironment = SuperSawVoicerEnvironment.new((
      inChannel: 4,
      outputBus: 30
    ));

    clockEnvironment = ClockEnvironment.new((
      'origin': [0, 0],
      clock: clockController.clock,
      store: store
    ));

    octatrackStateDispatcher = OctatrackStateDispatcher.new((
      store: store,
      //midiInDeviceName: "micro lite",
      //midiInPortName: "Port 1",

      //midiInDeviceName: "UltraLite AVB",
      //midiInPortName: "MIDI In",

      //midiInDeviceName: "Faderfox PC12",
      //midiInPortName: "Faderfox PC12",

      midiInDeviceName: "ES-9",
      midiInPortName: "MIDI In",

      midiInChannel: 15
    ));
  }
}
