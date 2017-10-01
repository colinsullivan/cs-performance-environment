OutboardTestSequencer : AwakenedSequencer {
  var pat,
    patStream,
    patchSynth;

  initPatch {
    // define a simple synth
    patch = Patch({
      arg freq, amp = 0.0;
      var out;
      out = SinOsc.ar(freq, 0, amp) * EnvGen.kr(Env.linen(0.001, 0.05, 0.3), doneAction: 2);
      [out, out];
    });
    patch.prepareForPlay();
    patchSynth = patch.asSynthDef().add();
    ^patch
  }

  initStream {

    pat = Pbind(
      // the name of the SynthDef to use for each note
      \instrument, patchSynth.name,
      \midinote, Pseq([96, 84, 84, 84], inf),
      // rhythmic values
      \dur, 1
    );

    ^pat.asStream();
  }
}

