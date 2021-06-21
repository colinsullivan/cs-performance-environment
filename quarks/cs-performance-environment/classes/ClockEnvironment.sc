ClockEnvironment : PerformanceEnvironmentComponent {

  var beatNumberText,
    meterText,
    meterEditor,
    transportText,
    quantumText,
    quantumEditor,
    clockLatencyEditor,
    clock;

  init_gui {
    arg params;
    var layout = params['layout'],
      labelWidth = 75,
      textRect = Rect(0, 0, 100, 24);
    super.init_gui(params);

    ArgNameLabel("Beats per bar", layout, labelWidth);
    meterText = StaticText.new(layout, textRect);
    meterEditor = NumberBox.new(layout, textRect);
    meterEditor.value = clock.beatsPerBar;
    layout.startRow();

    ArgNameLabel("Quantum", layout, labelWidth);
    quantumText = StaticText.new(layout, textRect);
    quantumEditor = NumberBox.new(layout, textRect);
    quantumEditor.value = clock.quantum;
    layout.startRow();

    ArgNameLabel("Beats", layout, labelWidth);
    beatNumberText = StaticText.new(layout, textRect);
    layout.startRow();

    ArgNameLabel("Transport", layout, labelWidth);
    transportText = StaticText.new(layout, textRect);
    layout.startRow();

    ArgNameLabel("Clock Latency", layout, labelWidth);
    clockLatencyEditor = NumberBox.new(layout, textRect);
    clockLatencyEditor.value = clock.latency;
    clockLatencyEditor.decimals = 4;
    layout.startRow();


    meterEditor.action = {
      arg editor;

      var newBeatsPerBar = editor.value.asInteger();

      clock.playNextBar({
        clock.beatsPerBar = newBeatsPerBar;
      });
    };

    quantumEditor.action = {
      arg editor;

      var newQuantum = editor.value.asInteger();
      clock.playNextBar({
        clock.quantum = newQuantum;
      });
    };

    clockLatencyEditor.action = {
      arg editor;
      var newLatency = editor.value.asFloat();
      clock.latency = newLatency;
    };

  }

  on_play {
    arg params;
    super.on_play(params);
    AppClock.sched(1.0/16, {this.update_transport_text();});
  }

  update_transport_text {
    beatNumberText.string = clock.beats.asInteger();
    meterText.string = clock.beatsPerBar.asInteger();
    transportText.string = (
      (1.0 + floor(clock.beats / clock.beatsPerBar)).asInteger().asString()
      ++ "." ++ (1.0 + (0.01 * round(100 * (clock.beats % clock.beatsPerBar)))).asString()
    );
    quantumText.string = clock.quantum.asInteger();

    AppClock.sched(1.0/16, {this.update_transport_text();});
  }

}
