SmoothBassVoicerEnvironment : VoicerEnvironmentComponent {
  
  init {
    arg params;

    var voicer,
      sock,
      dubBass = Instr("cs.synths.SmoothAndWideBass"),
      dubBassSpecs = dubBass.specs,
      gui;

    params['numVoices'] = 1;
    params['instr'] = dubBass;

    super.init(params);

    this.voicer.mapGlobal(
      \rateMultiplier,
      spec: dubBassSpecs.at(dubBass.argsAndIndices().at(\rateMultiplier)),
      value: 2.0
    );

    this.voicer.portaTime = 0;

    this.voicer.mapGlobal(\amp, value: 0.0);
    this.sock.addControl(7, \amp);
    this.sock.addControl(15, \rateMultiplier, 2.0);

  }

}
