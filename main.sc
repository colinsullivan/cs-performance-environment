/**
 *  @file       main.sc
 *
 *	@desc       SC entry point for validating outboard synth latency.
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

 (
   var store, sequencers;

MIDIClient.init;
   API.mountDuplexOSC();
  s.options.inDevice = "JackRouter";
  s.options.outDevice = "JackRouter";

   s.boot();

   s.waitForBoot({
      store = StateStore.getInstance();

      sequencers = IdentityDictionary.new();

      store.subscribe({
        var state = store.getState();

        if ((state.sequencers != nil) && (state.sequencers.outboardTest != nil) && (sequencers['outboardTest'] == nil), {
          sequencers['outboardTest'] = OutboardTestSequencer.new((store: store, sequencerId: 'outboardTest'));
        });
      });
   });

   "s.latency:".postln;
   s.latency.postln;
 )
