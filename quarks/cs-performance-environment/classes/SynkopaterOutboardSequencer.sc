/**
 *  @file       SynkopaterOutboardSequencer.sc
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

SynkopaterOutboardSequencer : SCReduxSequencer {
  var pat,
    notes = nil,
    euclideanNumHits = nil,
    euclideanTotalNumHits = nil,
    dur = nil,
    offset = nil,
    midinoteProxy,
    durProxy;

  initPatch {
    midinoteProxy = PatternProxy.new;
    midinoteProxy.quant = currentState.playQuant;
    durProxy = PatternProxy.new;
    durProxy.quant = currentState.playQuant;
  }

  initStream {

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

  generatePatterns {
    var noteSeq, durSeq;
    noteSeq = currentState.notes;
    durSeq = dur * Bjorklund2.new(
      euclideanNumHits,
      euclideanTotalNumHits,
    );

    if (offset > 0, {
      noteSeq = [\rest] ++ noteSeq;
      durSeq = [offset] ++ durSeq;
    });

    midinoteProxy.source = Pseq(noteSeq, inf);
    durProxy.source = Pseq(durSeq, inf);
  }

  handleStateChange {
    super.handleStateChange();

    if ((
      euclideanNumHits != currentState.euclideanNumHits
    ).or(
      euclideanTotalNumHits != currentState.euclideanTotalNumHits
    ).or(
      dur != currentState.dur
    ).or(
      offset != currentState.offset
    ).or(
      notes != currentState.notes
    ), {
      euclideanNumHits = currentState.euclideanNumHits;
      euclideanTotalNumHits = currentState.euclideanTotalNumHits;
      dur = currentState.dur;
      offset = currentState.offset;
      notes = currentState.notes;

      midinoteProxy.quant = currentState.playQuant;
      durProxy.quant = currentState.playQuant;

      this.generatePatterns();

    });
  }
}
