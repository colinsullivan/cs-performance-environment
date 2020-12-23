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
    durProxy = PatternProxy.new;
    midinoteProxy.clock = clock;
    durProxy.clock = clock;

    durProxy.condition = {
      arg value, count;
      // This method is called once the dur is changed.
      // If we aren't on an integer multiple, resets the sequence.  This can
      // happen when the dur is set to 0.666 for instance, then the sequence
      // may forever be offset 2/3 of a beat.  This resets the sequence,
      // then on the next call of `durProxy.condition`, the proxy will take
      // the new dur values.
      if (clock.beats - floor(clock.beats) > 0, {
        midinoteProxy.reset;
        durProxy.reset;
        false;    
      }, {
        true;
      });
    };
    this.updatePropQuant();
  }

  updatePropQuant {
    midinoteProxy.quant = currentState.propQuant;
    durProxy.quant = currentState.propQuant;
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

      this.updatePropQuant();
      this.generatePatterns();

    });
  }
}
