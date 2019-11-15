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
    lazersEnvironment;

  *new {
    ^super.new.init();
  }

  init {
    arg params;

    store = SCReduxStore.getInstance();

    //Server.default.latency = 0.9;
    Server.default.latency = 0.05;

    clockController = LinkClockController.new((
      store: store
    ));

    clockController.clock.latency = Server.default.latency;

    sequencerFactory = SCReduxSequencerFactory.getInstance();
    sequencerFactory.setStore(store);
    sequencerFactory.setClockController(clockController);

    componentFactory = PerformanceComponentFactory.getInstance();
    componentFactory.setStore(store);
    componentFactory.setClockController(clockController);

    randomHarpEnvironment = RandomHarpSamplerEnvironment.new((
      store: store,
      outputBus: 26
    ));

    runningWaterEnvironment = RunningWaterEnvironment.new((
      store: store,
      outputBus: 18
    ));

    granularChaosEnvironment = GranularChaosEnvironment.new((
      store: store,
      outputBus: 20
    ));

    shakerTextureInstr = ShakerTextureInstrument.new((
      store: store,
      outputBus: 22
    ));
    vileKickEnvironment = VileKickEnvironment.new((
      inChannel: 6,
      outputBus: 24
    ));
    wideBassEnvironment = WideBassVoicerEnvironment.new((
      inChannel: 5,
      outputBus: 28
    ));
    lazersEnvironment = RandomizedLazersEnvironment.new((
      inChannel: 7,
      outputBus: 32
    ));
  }
}
