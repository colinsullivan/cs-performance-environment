VileKickEnvironment : VoicerEnvironmentComponent {
  init {
    arg params;

    var voicer,
      sock,
      vileKickInstr = Instr("cs.percussion.VileKick"),
      vileKickSpecs = vileKickInstr.specs,
      gui;
  
    params['numVoices'] = 1;
    params['instr'] = vileKickInstr;

    super.init(params);
    
    this.sock.lowkey = "C0".notemidi();
    this.sock.hikey = "C2".notemidi();

  }
}
