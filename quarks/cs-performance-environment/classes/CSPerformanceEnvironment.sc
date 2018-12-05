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
    synkopaterDelay;

  *new {
    ^super.new.init();
  }

  init {
    arg params;

    store = StateStore.getInstance();

    clockController = ReduxTempoClockController.new((
      store: store
    ));

    sequencerFactory = AwakenedSequencerFactory.getInstance();
    sequencerFactory.setStore(store);
    sequencerFactory.setClockController(clockController);

    componentFactory = PerformanceComponentFactory.getInstance();
    componentFactory.setStore(store);

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

  }
}
