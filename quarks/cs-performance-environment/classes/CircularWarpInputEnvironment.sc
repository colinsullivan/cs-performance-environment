CircularWarpInputEnvironment : PatchEnvironmentComponent {

  var <>circularBuf,
    circularBufferDuration = 3.0,
    <>inputGroup,
    <>outputGroup,
    <>inPatch,
    <>outPatch;

  init {
    arg params;

    super.init(params);

    this.inputGroup = Group.new();
    this.outputGroup = Group.after(this.inputGroup);
    
  }
  
  load_samples {
    arg callback;

    var s = Server.default;

    // need to create circular buffer
    this.circularBuf = Buffer.alloc(
      s,
      s.sampleRate * circularBufferDuration,
      1
    );

    {callback.value();}.defer(1);

  }

  /**
   *  we need two patches, one for the circular input and one to affect it.
   **/
  load_patch {
    this.inPatch = Patch(Instr.at("fx.Circular.Recorder"), (
      buf: this.circularBuf,
      inChannel: 0
    ));
    
    this.outPatch = Patch(Instr.at("fx.CircularWarpInput"), (
      buf: this.circularBuf
    ));

    this.inPatch.prepareForPlay();
    this.outPatch.prepareForPlay();
  }

  init_gui {
    arg params;

    var layout = params['layout'],
      labelWidth = 50,
      outPatch = this.outPatch;

    super.init_gui(params);

    layout.flow({
      arg layout;

      ArgNameLabel("amp", layout, labelWidth);
      outPatch.amp.gui(layout);
      layout.startRow();
   
      ArgNameLabel("playbackRate", layout, labelWidth);
      outPatch.playbackRate.gui(layout);
      layout.startRow();
      
      ArgNameLabel("scrambleAmt", layout, labelWidth);
      outPatch.scrambleAmt.gui(layout);
      layout.startRow();
    });

  }

  on_play {
    this.inPatch.play(
      bus: Bus.audio(Server.default, this.outputBus),
      group: inputGroup
    );
    this.outPatch.play(
      bus: Bus.audio(Server.default, this.outputBus),
      group: outputGroup
    );
  }

  init_external_controller_mappings {
    super.init_external_controller_mappings();

    if (this.uc33Controller != nil, {
      this.map_uc33_to_patch('sl3', 'amp', this.outPatch);
    });

    if (this.softStepController != nil, {
      /*this.map_softStep_to_patch('6_pressure', ['playbackRate', 'scrambleAmt'], this.outPatch);*/
      this.map_softStep_to_patch('6_x', 'playbackRate', this.outPatch);
      this.map_softStep_to_patch('6_y', 'scrambleAmt', this.outPatch);
      /*this.map_softStep_to_patch('6_pressure', 'gate', this.outPatch);*/
    });


  }
}
