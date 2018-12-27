RandomHarpSamplerEnvironment : PerformanceEnvironmentComponent {

  // the segments of the buffer we want to play
  var <>bufSegments,
    // attack and release times for each segment
    <>attackTime,
    <>releaseTime,
    // a single voicer which will have voices for each segment
    <>voicer,
    // the buffer
    <>buf,
    // master probability control
    <>probability,
    // master frequency control (wait time between)
    <>waitTime,
    // probability of playing pluck in reverse
    <>reverseProbability,
    <>willPlayNext,
    <>playerRoutine;

  init {
    arg params;
    var specs;

    super.init(params);

    specs = params.atFail('specs', { Dictionary.new() });

    this.bufSegments = [
      (
        start: 0,
        end: 7.2,
        gain: 1.0
      ),
      /*(
        start: 8.2,
        end: 13.0,
        gain: 1.2
      ),*/
      ( 
        start: 14.1,
        end: 17.3,
        gain: 1.4
      ),
      (
        start: 17.4,
        end: 20.5,
        gain: 1.8
      ),
      (
        start: 20.5,
        end: 24.7,
        gain: 1.8
      ),
      (
        start: 24.91,
        end: 35,
        gain: 2.4
      )
    ];

    this.attackTime = 0.1;
    this.releaseTime = 0.1;

    this.bufSegments.do({
      arg bufSegment;

      // gains are relative to all of the segments playing simultaneously
      bufSegment['gain'] = (1.0 / this.bufSegments.size()) * bufSegment['gain'];

      // end time less release time so it doesn't fade into next segment
      bufSegment['end'] = bufSegment['end'] - this.releaseTime;
    });

    this.voicer = nil;

    this.probability = KrNumberEditor.new(
      0.0,
      specs.atFail('probability', { ControlSpec(0.0, 1.0) })
    );
    this.waitTime = KrNumberEditor.new(
      2.5,
      specs.atFail('waitTime', { ControlSpec(2.5, 0.1, \exp) })
    );
    this.reverseProbability = KrNumberEditor.new(
      0.0,
      specs.atFail('reverseProbability', { \unipolar })
    );

    this.willPlayNext = false;

  }
  load_samples {
    arg callback;
    var sfxRoot = "/Users/colin/Samples/Recorded Sounds/Sound Effects/",
      me = this;

    Buffer.read(Server.default, sfxRoot ++ "harp-plucks-04_long.aif", action: {
      arg envBuf;

      me.buf = envBuf;

      callback.value();
    });
  }

  play_next_pluck {

    var nextBufSegment,
      playbackRate;

    if (1.0.rand() < this.probability.value(), {
      nextBufSegment = this.bufSegments.choose();

      playbackRate = 1.0;

      if (1.0.rand() < this.reverseProbability.value(), {
        playbackRate = -1.0;    
      });
      
      // play
      this.voicer.trigger1(0, 1, [
        \playbackRate, playbackRate,
        \startTime, nextBufSegment['start'],
        \endTime, nextBufSegment['end'],
        \gain, nextBufSegment['gain']
      ]);
    });
  }

  load_environment {
    var me = this;
    super.load_environment();

    this.voicer = Voicer.new(
      16,
      Instr.at("cs.sfx.PlayBufSegment"),
      [
        \buf, this.buf,
        \attackTime, this.attackTime,
        \releaseTime, this.releaseTime
      ],
      target: this.outputChannel
    );

    this.playerRoutine = Routine.new({
      loop {
        me.play_next_pluck(); 

        me.waitTime.value().wait();
      }
    });

  }

  on_play {
    this.playerRoutine.play();
  }

  on_stop {
    this.playerRoutine.stop();
  }

  init_gui {
    arg params;

    var layout = params['layout'],
      labelWidth = 80,
      me = this;

    super.init_gui(params);

    layout.flow({
      arg layout;

      ArgNameLabel("prob", layout, labelWidth);
      me.probability.gui(layout);
      layout.startRow();
      
      ArgNameLabel("wait", layout, labelWidth);
      me.waitTime.gui(layout);
      layout.startRow();
      
      ArgNameLabel("reverse prob", layout, labelWidth);
      me.reverseProbability.gui(layout);
      layout.startRow();
      
    });
  }

  //init_uc33_mappings {
    //super.init_uc33_mappings();

    //this.map_uc33_to_property(\knu3, [\probability, \waitTime]);
    //this.map_uc33_to_property(\knm3, \reverseProbability);
  //}

  //init_ableton_mappings {
    //super.init_ableton_mappings();

    ////this.map_ableton_cc_to_property(0, 20, \probability);
    ////this.map_ableton_cc_to_property(0, 21, \waitTime);
    ////this.map_ableton_cc_to_property(0, 22, \reverseProbability);

  //}

  init_launchcontrol_mappings {
    this.map_controller_to_property(this.launchControlController, 'pg0_kn_sndA_6', [\probability, \waitTime]);
    this.map_controller_to_property(this.launchControlController, 'pg0_kn_sndB_6', \reverseProbability);
  }



}
