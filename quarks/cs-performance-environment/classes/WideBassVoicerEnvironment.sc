WideBassVoicerEnvironment : VoicerEnvironmentComponent {
  init {
    arg params;

    var instr = Instr("cs.fm.WideBass"),
      specs = instr.specs;

    params['monoPortaVoicer'] = true;
    params['instr'] = instr;
    params['instrArgs'] = (
      'useSustain': 0
    );

    super.init(params);

    this.voicer.mapGlobal(
      \toneModulatorGainMultiplier,
      value: 0.0,
      spec: specs.at(instr.argsAndIndices().at(\toneModulatorGainMultiplier))
    );
    this.sock.addControl(1, \toneModulatorGainMultiplier);
    
    this.voicer.mapGlobal(
      \toneModulatorLFOAmount,
      value: 0.0,
      spec: specs.at(instr.argsAndIndices().at(\toneModulatorLFOAmount))
    );
    this.sock.addControl(74, \toneModulatorLFOAmount);

    this.voicer.mapGlobal(
      \toneModulatorLFORate,
      value: 0.0,
      spec: specs.at(instr.argsAndIndices().at(\toneModulatorLFORate))
    );
    this.sock.addControl(75, \toneModulatorLFORate);
    
    this.voicer.portaTime = 0.2;

    // pitch bend one octave in either direction
    this.sock.addControl(\pb, \pb, 1, 12);
  }
}
