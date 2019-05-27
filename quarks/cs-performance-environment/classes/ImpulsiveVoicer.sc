ImpulsiveVoicer : VoicerEnvironmentComponent {
  init {
    arg params;

    var instr = Instr("cs.percussion.Impulsive"),
      specs = instr.specs;

    params['numVoices'] = 3;
    params['instr'] = instr;

    super.init(params);
    
    this.voicer.mapGlobal(\amp, value: 1.0, spec: ControlSpec(0.0, 2.0));
    this.sock.addControl(7, \amp);
  }
}
