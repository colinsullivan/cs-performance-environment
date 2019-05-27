HardSineVoicerComponent : VoicerEnvironmentComponent {
  init {
    arg params;

    var voicer,
      sock,
      instr = Instr("cs.synths.HardSine"),
      specs = instr.specs,
      gui;

    params['numVoices'] = 3;
    params['instr'] = instr;

    super.init(params);

    this.voicer.mapGlobal(
      \octaveMultiplier,
      spec: specs.at(instr.argsAndIndices().at(\octaveMultiplier)),
      value: 2.0
    );

    this.voicer.mapGlobal(
      \amp,
      spec: \amp,
      value: 1.0 / params['numVoices']
    );

    this.sock.addControl(15, \octaveMultiplier, 2.0);
  }
}
