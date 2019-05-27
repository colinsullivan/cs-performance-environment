RhodesVoicerEnvironment : VoicerEnvironmentComponent {
  var <>uc33Controller;

  init {
    arg params;

    params['numVoices'] = 8;
    params['instr'] = Instr("fm.Rhodes");
    params['inChannel'] = 1;

    super.init(params);

  }

  init_external_controller_mappings {

    var uc33Port;

    super.init_external_controller_mappings();
  
    // volume control from ableton
    this.sock.addControl(7, \amp);

    uc33Port = MIDIIn.findPort("UC-33 USB MIDI Controller", "Port 1");

    if (uc33Port != nil, {
      this.uc33Controller = VoicerMIDISocket(
        [
          MIDIClient.sources.indexOf(uc33Port),
          // slider 5
          4
        ],
        this.voicer
      );

      this.uc33Controller.addControl(7, \amp);
    });

  }
}
