SuperSawVoicerEnvironment : VoicerEnvironmentComponent {
  init {
    arg params;

    var instr = Instr("cs.synths.SuperSaw.SuperSaw"),
      specs = instr.specs;

    params['instr'] = instr;

    super.init(params);

    this.voicer.mapGlobal(
      \cutoffFreq,
      value: 100,
      spec: specs.at(instr.argsAndIndices().at(\cutoffFreq))
    );

  }
}
