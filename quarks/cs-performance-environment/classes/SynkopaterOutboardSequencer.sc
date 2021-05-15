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
  }

  handleStateChange {
    super.handleStateChange();

    if ((
      euclideanNumHits != currentState.euclideanNumHits
    ).or(
      euclideanTotalNumHits != currentState.euclideanTotalNumHits
    ).or(
      secondEuclieanNumHits != currentState.secondEuclieanNumHits
    ).or(
      secondEuclieanTotalNumHits != currentState.secondEuclieanTotalNumHits
    ).or(
      euclidBounceEnabled != currentState.euclidBounceEnabled
    ).or(
      euclidBounceFirstDur != currentState.euclidBounceFirstDur
    ).or(
      euclidBounceFirstBeats != currentState.euclidBounceFirstBeats
    ).or(
      euclidBounceFirstBeatsMult != currentState.euclidBounceFirstBeatsMult
    ).or(
      euclidBounceSecondDur != currentState.euclidBounceSecondDur
    ).or(
      euclidBounceSecondBeats != currentState.euclidBounceSecondBeats
    ).or(
      euclidBounceSecondBeatsMult != currentState.euclidBounceSecondBeatsMult
    ).or(
      dur != currentState.dur
    ).or(
      offset != currentState.offset
    ).or(
      notes != currentState.notes
    ), {
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

      this.updatePropQuant();
      this.generatePatterns();

    });
  }
}
