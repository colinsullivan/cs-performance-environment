SequencedGranularEnvironment : PatchEnvironmentComponent {

  var <>grainEnvBuf;
  
  load_samples {
    arg callback;
    var sfxRoot = "/Volumes/Secondary/Samples/Recorded Sounds/Sound Effects/",
      winenv = Env.sine(4.0),
      me = this;

    "SequencedGranularEnvironment.load_samples".postln;

    /*Buffer.read(Server.default, sfxRoot ++ "outdoors_crickets_train-passing_nice-stereo.aif", action: {*/
    Buffer.read(Server.default, sfxRoot ++ "plane-flying-overhead-jet-good.aif", action: {
      arg buf;

      me.buf = buf;

      Buffer.sendCollection(Server.default, winenv.discretize, 1, action: {
        arg envBuf;

        me.grainEnvBuf = envBuf;

        callback.value();
      });
    });
  }


  load_patch {
    super.load_patch();

    "SequencedGranularEnvironment.load_patch".postln;

    this.patch = Patch(Instr.at("sfx.GranularChaos"), (
      buffer: this.buf,
      envbuf: this.grainEnvBuf,
      /*gate: KrNumberEditor.new(0, \gate.asSpec())*/
      /*done_callback: {
        "done!".postln;
      },*/
    ));
    this.patch.prepareForPlay();
  }

  load_gui {
    arg layout, metaPatch;
    var patch = this.patch;

    patch.pointer.gui(layout);
    patch.pitch.gui(layout);
    patch.amp.gui(layout);
  
  }
}
