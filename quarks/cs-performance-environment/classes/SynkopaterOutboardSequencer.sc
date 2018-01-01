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
  var pat;

  initStream {

    pat = Pbind(
      \type, \midi,
      \midiout, this.midiOut,
      //\midicmd, \noteOn,
      \chan, 0,
      \midinote, Pfunc({
        /**
         *  state.beat increments from 0 to numBeats - 1
         *  use it to iterate through the arp_notes list
         **/
        var state = this.getStateSlice();
        state.arp_notes[state.arp_note_index];
      }),
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
}

