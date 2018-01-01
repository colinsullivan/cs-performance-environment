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
    sequencerFactory = AwakenedSequencerFactory.getInstance();
    sequencerFactory.setStore(store);

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

    synkopaterDelay = SynkopaterDelay.new((
      store: store,
      sequencerId: 'synkopaterA',
      inputBus: 10,
      outputBus: 10
    ));
    synkopaterDelay = SynkopaterDelay.new((
      store: store,
      sequencerId: 'synkopaterB',
      inputBus: 12,
      outputBus: 12
    ));
    
  }
}
