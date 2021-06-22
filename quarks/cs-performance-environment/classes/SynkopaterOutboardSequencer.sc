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
    velocities = nil,
    cc1 = nil,
    cc74 = nil,
    euclideanNumHits = nil,
    euclideanTotalNumHits = nil,
    euclidBounceEnabled = nil,
    euclidBounceFirstDur = nil,
    euclidBounceFirstBeats = nil,
    euclidBounceSecondDur = nil,
    euclidBounceSecondBeats = nil,
    euclidBounceFirstBeatsMult = nil,
    euclidBounceSecondBeatsMult = nil,
    secondEuclieanNumHits = nil,
    secondEuclieanTotalNumHits = nil,
    dur = nil,
    offset = nil,
    midinoteProxy,
    durProxy,
    ampProxy,
    cc1Proxy,
    cc74Proxy,
    proxies,
    changesAppliedAt;

  initPatch {
    midinoteProxy = PatternProxy.new;
    durProxy = PatternProxy.new;
    ampProxy = PatternProxy.new;
    cc1Proxy = PatternProxy.new;
    cc74Proxy = PatternProxy.new;
    proxies = [midinoteProxy, durProxy, ampProxy, cc1Proxy, cc74Proxy];
    proxies.do({
      arg theProxy;
      theProxy.clock = clock;
    });

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
    proxies.do({
      arg theProxy;
      theProxy.quant = currentState.propQuant;
    });
  }

  initStream {

    // TODO: This should not crash if requested MIDI port does not exist

    var notesPat, cc1Pat, cc74Pat;
    notesPat = Pbind(
      \type, \midi,
      \midiout, this.midiOut,
      \chan, this.getStateSlice().midiChan,
      \midinote, midinoteProxy,
      // rhythmic values
      \dur, durProxy,

      // midi note velocity
      \amp, ampProxy,

      \stretch, Pfunc({
        this.getStateSlice().stretch;
      }),
      \legato, Pfunc({
        this.getStateSlice().legato;
      })
    );

    cc1Pat = Pbind(
      \type, \midi,
      \midiout, this.midiOut,
      \chan, this.getStateSlice().midiChan,
      \dur, durProxy,
      \midicmd, \control,
      \ctlNum, 1,
      \control, cc1Proxy
    );

    cc74Pat = Pbind(
      \type, \midi,
      \midiout, this.midiOut,
      \chan, this.getStateSlice().midiChan,
      \dur, durProxy,
      \midicmd, \control,
      \ctlNum, 74,
      \control, cc74Proxy
    );

    pat = Ppar([
      notesPat,
      cc1Pat,
      cc74Pat
    ]);

    ^pat.asStream();
  }

  getEuclidDurs {
    arg k, n, theDur;
    ^(
      theDur * Bjorklund2.new(k, n)
    );
  }

  getEuclidDursForDuration {
    arg k, n, beats, theDur;
    var euclidDurs, durSeq, sum;

    euclidDurs = this.getEuclidDurs(k, n, theDur);
    durSeq = [];
    sum = 0;
    // Takes first portion of first euclidean rhythm up to `bounceFirstBeats`.
    // Loops if necesary.
    while({ sum < beats }, {
      euclidDurs.do({
        arg dur;
        var remainingDur;

        if (sum + dur <= beats, {
          sum = sum + dur;
          durSeq = durSeq.add(dur);
        }, {
          remainingDur = beats - sum;
          if (remainingDur > 0, {
            // This is the last step, just adds a note to fill the remaining
            // duration.
            sum = sum + remainingDur;
            durSeq = durSeq.add(remainingDur);
          });
        });
      });
    });

    ^durSeq;
  }

  generatePatterns {
    var noteSeq, durSeq;
    noteSeq = currentState.notes;

    if (euclidBounceEnabled, {

      durSeq = this.getEuclidDursForDuration(
        euclideanNumHits,
        euclideanTotalNumHits,
        euclidBounceFirstBeats * euclidBounceFirstBeatsMult,
        euclidBounceFirstDur
      ) ++ this.getEuclidDursForDuration(
        secondEuclieanNumHits,
        secondEuclieanTotalNumHits,
        euclidBounceSecondBeats * euclidBounceSecondBeatsMult,
        euclidBounceSecondDur
      );


    }, {
      durSeq = this.getEuclidDurs(
        euclideanNumHits,
        euclideanTotalNumHits,
        dur
      );
    });

    if (offset > 0, {
      noteSeq = [\rest] ++ noteSeq;
      durSeq = [offset] ++ durSeq;
    });

    midinoteProxy.source = Pseq(noteSeq, inf);
    durProxy.source = Pseq(durSeq, inf);

    // MIDI note velocities are calculated via amp, so put them back into [0, 1]
    // so they can be converted back to [0, 127] by the pattern...
    ampProxy.source = Pseq(velocities / 127.0, inf);

    cc1Proxy.source = Pseq(cc1, inf);
    cc74Proxy.source = Pseq(cc74, inf);

  }

  handleStateChange {
    super.handleStateChange();

    if (changesAppliedAt != currentState.changesAppliedAt, {
      changesAppliedAt = currentState.changesAppliedAt;
      euclideanNumHits = currentState.euclideanNumHits;
      euclideanTotalNumHits = currentState.euclideanTotalNumHits;
      secondEuclieanNumHits = currentState.secondEuclieanNumHits;
      secondEuclieanTotalNumHits = currentState.secondEuclieanTotalNumHits;
      euclidBounceEnabled = currentState.euclidBounceEnabled;
      euclidBounceFirstDur = currentState.euclidBounceFirstDur;
      euclidBounceFirstBeats = currentState.euclidBounceFirstBeats;
      euclidBounceFirstBeatsMult = currentState.euclidBounceFirstBeatsMult;
      euclidBounceSecondDur = currentState.euclidBounceSecondDur;
      euclidBounceSecondBeats = currentState.euclidBounceSecondBeats;
      euclidBounceSecondBeatsMult = currentState.euclidBounceSecondBeatsMult;

      dur = currentState.dur;
      offset = currentState.offset;
      notes = currentState.notes;
      velocities = currentState.velocities;
      cc1 = currentState.cc1;
      cc74 = currentState.cc74;

      this.updatePropQuant();
      this.generatePatterns();

    });
  }
}
