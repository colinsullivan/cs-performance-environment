/**
 *  @file       SynkopaterOutboardSequencer.sc
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

SynkopaterOutboardSequencer : AwakenedSequencer {
  var pat,
    last_arp_notes = nil,
    midinoteProxy;

  initPatch {
    midinoteProxy = PatternProxy.new;
    midinoteProxy.quant = currentState.playQuant;
  }

  initStream {

    midinoteProxy.source = Pseq(currentState.arp_notes, inf);

    pat = Pbind(
      \type, \midi,
      \midiout, this.midiOut,
      //\midicmd, \noteOn,
      \chan, 0,
      \midinote, midinoteProxy,
      // rhythmic values
      \dur, Pfunc({
        this.getStateSlice().dur;
      }),
      \stretch, Pfunc({
        this.getStateSlice().stretch;
      }),
      \legato, Pfunc({
        this.getStateSlice().legato;
      })
    );

    ^pat.asStream();
  }

  handleStateChange {
    super.handleStateChange();

    if (last_arp_notes != currentState.arp_notes, {
      last_arp_notes = currentState.arp_notes;
      midinoteProxy.quant = currentState.playQuant;
      midinoteProxy.source = Pseq(currentState.arp_notes, inf);
    });

  }
}
