SuperSawVoicerEnvironment : VoicerEnvironmentComponent {
  var cutoffFreqControl,
    instr,
    filtInstr,
    filtPatch,
    voiceBus,
    voiceGroup,
    filterGroup;

  init {
    arg params;

    instr = Instr("cs.synths.SuperSaw.Voice");
    filtInstr = Instr("cs.synths.SuperSaw.Filter");
    filtPatch;
    voiceBus = Bus.audio(numChannels: 2);
    voiceGroup = Group.new();
    filterGroup = Group.after(voiceGroup);

    params['instr'] = instr;
    params['instrArgs'] = (
      // Defines level of each voice in the polyphony
      amp: -24.0.dbamp()
    );
    params['voiceBus'] = voiceBus;
    params['voiceTarget'] = voiceGroup;

    super.init(params);

  }

  init_patches {
    arg params;
    super.init_patches(params);
    cutoffFreqControl = this.voicer.mapGlobal(
      \cutoffFreq,
      value: 500,
      spec: filtInstr.specs.at(filtInstr.argsAndIndices().at(\cutoffFreq))
    );
    this.sock.addControl(1, \cutoffFreq);

    this.voicer.mapGlobal(
      \detune,
      value: 0.75,
      spec: instr.specs.at(instr.argsAndIndices().at(\detune))
    );
    this.sock.addControl(74, \detune);

    filtPatch = Patch(filtInstr, (
      bus: voiceBus.index,
      cutoffFreq: cutoffFreqControl,
    ));
    filtPatch.play(group: filterGroup, bus: params['outputBus']);

    this.voicer.mapGlobal(
      \mix,
      value: 0.75,
      spec: instr.specs.at(instr.argsAndIndices().at(\mix))
    );
    this.sock.addControl(73, \detune);
  }
}
