NoisyVoicer : VoicerEnvironmentComponent {
  init {
    arg params;

    var voicer,
      sock,
      instr = Instr("cs.percussion.Noisy.NoisyStereo"),
      specs = instr.specs,
      gui;
  
    params['numVoices'] = 1;
    params['instr'] = instr;
    
    super.init(params);
    
    this.sock.lowkey = "D2".notemidi();
    this.sock.hikey = "C8".notemidi();

  }
}
