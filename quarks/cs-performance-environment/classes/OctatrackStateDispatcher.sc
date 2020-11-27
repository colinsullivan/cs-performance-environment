OctatrackStateDispatcher {
  var store,
    programChangeListener;
  *new {
    arg params;
    ^super.new.init(params);
  }
  init {
    arg params;
    var midiPort = MIDIIn.findPort(params['midiInDeviceName'], params['midiInPortName']);
      

    store = params['store'];

    // Listens for program change messages
    programChangeListener = MIDIFunc.program({
      arg val;
      this.handleProgramMessage(val);
    }, params['midiInChannel'], midiPort.uid);

  }

  handleProgramMessage {
    arg val;

    store.dispatch((
      type: "OCTATRACK_PATTERN_UPDATED",
      payload: (
        programChangeValue: val
      )
    ));
  }
}
