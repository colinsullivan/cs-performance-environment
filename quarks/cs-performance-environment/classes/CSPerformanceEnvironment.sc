CSPerformanceEnvironment {
  var store,
    sequencerFactory,
    randomHarpEnvironment,
    runningWaterEnvironment,
    granularChaosEnvironment;

  *new {
    ^super.new.init();
  }

  init {
    arg params;

    store = StateStore.getInstance();
    sequencerFactory = AwakenedSequencerFactory.getInstance();
    sequencerFactory.setStore(store);

    randomHarpEnvironment = RandomHarpSamplerEnvironment.new((
      outputBus: 26
    ));

    runningWaterEnvironment = RunningWaterEnvironment.new((
      outputBus: 18
    ));

    granularChaosEnvironment = GranularChaosEnvironment.new((
      outputBus: 20
    ));
    
  }
}
