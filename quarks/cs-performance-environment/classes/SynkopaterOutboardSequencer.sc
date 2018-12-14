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
    notes = nil,
    euclideanNumHits = nil,
    euclideanTotalNumHits = nil,
    dur = nil,
    midinoteProxy,
    durProxy;

  initPatch {
    midinoteProxy = PatternProxy.new;
    midinoteProxy.quant = currentState.playQuant;
    durProxy = PatternProxy.new;
    durProxy.quant = currentState.playQuant;
  }

  initStream {

    midinoteProxy.source = Pseq(currentState.notes, inf);

    pat = Pbind(
      \type, \midi,
      \midiout, this.midiOut,
      //\midicmd, \noteOn,
      \chan, this.getStateSlice().midiChan,
      \midinote, midinoteProxy,
      // rhythmic values
      \dur, durProxy,
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

    if (notes != currentState.notes, {
      notes = currentState.notes;
      midinoteProxy.quant = currentState.playQuant;
      midinoteProxy.source = Pseq(currentState.notes, inf);
    });

    if ((
      euclideanNumHits != currentState.euclideanNumHits
    ).or(
      euclideanTotalNumHits != currentState.euclideanTotalNumHits
    ).or(
      dur != currentState.dur
    ), {
      euclideanNumHits = currentState.euclideanNumHits;
      euclideanTotalNumHits = currentState.euclideanTotalNumHits;
      dur = currentState.dur;
      durProxy.quant = currentState.playQuant;
      durProxy.source = dur * Pbjorklund2.new(
        euclideanNumHits,
        euclideanTotalNumHits,
        inf
      );

    });


  }
}
