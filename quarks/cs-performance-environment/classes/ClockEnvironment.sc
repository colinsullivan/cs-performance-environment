ClockEnvironment : PerformanceEnvironmentComponent {

  var <>interface,
    <>clockFace,
    <>midiClockOut,
    <>window,
    <>origin;

  start {
    clockFace.play();
  }

  stop {
    clockFace.stop();
  }

  handle_reset_button_pressed {
    clockFace.cursecs = 0.0;
  }

  request_tempo_update {
    var tempoRequest;

    tempoRequest = NetAddr.new("127.0.0.1", 6667);
    tempoRequest.sendMsg("/cs/to_ableton/request_tempo_update");
    tempoRequest.disconnect();
  }

  init {
    arg params;

    var window,
      startPauseButton,
      resetButton,
      clockFace,
      me = this,
      tempoResponder,
      serverStatusButton,
      transportButton,
      cursor = (x: 0, y: 0),
      buttonPadding = 15;

    this.origin = params['origin'];

    //super.init(params);
    
    /**
     *  Send clock to Ableton
     **/
    midiClockOut = MIDIClockOut(
      "(in) SuperCollider Clock",
      "(in) SuperCollider Clock",
      TempoClock.default
    );

    /**
     *  Receive tempo updates from Ableton.
     **/
    tempoResponder = OSCdef.new('clockTempoResponder', {
      arg msg;

      var bpm = msg[1];

      Tempo.bpm = bpm;

    }, '/cs/from_ableton/tempo_update', recvPort: 6666);

    /**
     *  Request initial tempo update from ableton
     **/
    this.request_tempo_update();

    Tempo.default.gui();

    clockFace = ClockFace.new();
    this.clockFace = clockFace;
    window = clockFace.window();
    window.bounds.height = window.bounds.height + 50;

    cursor.x = 10;
    cursor.y = 80;

    startPauseButton = Button(window, Rect(cursor.x, cursor.y, 100, 30))
      .states_([
        ["start"],
        ["stop"]
      ])
      .action_({
        arg startPauseButton;

        if (startPauseButton.value == 1, {
          me.start();
        }, {
          me.stop();
        });

      });

    cursor.x = cursor.x + startPauseButton.bounds.width + buttonPadding;

    resetButton = Button(window, Rect(cursor.x, cursor.y, 100, 30))
      .states_([
        ["reset"]
      ])
      .action_({
        arg resetButton;

        me.handle_reset_button_pressed(resetButton);
      });

    cursor.x = cursor.x + resetButton.bounds.width + buttonPadding;

    serverStatusButton = Button(window, Rect(cursor.x, cursor.y, 50, 30))
      .states_([
        ["status"]
      ])
      .action_({
        Server.default().plotTree();
      });

    cursor.x = cursor.x + serverStatusButton.bounds.width + buttonPadding;

    transportButton = Button(window, Rect(cursor.x, cursor.y, 100, 30))
      .states_([
        ["transport start"],
        ["transport stop"]
      ])
      .action_({
        arg transportButton;

        if (transportButton.value == 1, {
          me.midiClockOut.play();        
              
        }, {
          me.midiClockOut.stop();
        });


      });

    this.window = window;
    window.bounds = window.bounds.moveToPoint(this.origin);

    {this.init_done_callback.value()}.defer(2);
  }

}
