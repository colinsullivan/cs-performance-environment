SynkopaterOutboardSequencer : AwakenedSequencer {
  var pat,
    patStream,
    patchSynth;

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
        // TODO: use arp_mode to change arpeggiation pattern
        state.arp_notes[state.beat];
      }),
      // rhythmic values
      \dur, 1
    );

    ^pat.asStream();
  }
}

