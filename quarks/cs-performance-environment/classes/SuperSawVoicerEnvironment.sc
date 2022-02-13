SuperSawVoicerEnvironment : VoicerEnvironmentComponent {
  init {
    arg params;

    var instr = Instr("cs.synths.SuperSaw.SuperSawOsc"),
      specs = instr.specs;

    params['instr'] = instr;

    super.init(params);
  }
}
