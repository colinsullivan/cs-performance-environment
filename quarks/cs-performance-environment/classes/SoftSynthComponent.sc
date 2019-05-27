SoftSynthComponent : VoicerEnvironmentComponent {
  init {
    arg params;

    var instr = Instr("cs.synths.Soft.SoftSynth"),
      specs = instr.specs;

    params['numVoices'] = 8;
    params['instr'] = instr;

    super.init(params);

    this.voicer.mapGlobal(
      \amp,
      value: 1.0 / params['numVoices'],
      spec: ControlSpec(0.0, 2.0)
    );
    this.sock.addControl(7, \amp);
  }
}
