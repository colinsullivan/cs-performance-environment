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
    shakerTextureInstr;

  *new {
    ^super.new.init();
  }

  init {
    arg params;

    store = StateStore.getInstance();

    Server.default.latency = 0;

    clockController = LinkClockController.new((
      store: store
    ));

    sequencerFactory = AwakenedSequencerFactory.getInstance();
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

  }
}
