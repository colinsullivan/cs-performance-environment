/**
 *  @file       SynkopaterDelayQuad.sc
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

SynkopaterDelayQuad : PerformanceEnvironmentComponent {
  var inputPatch,
    <>delayFeedbackControl,
    <>pingPongAmountControl,
    <>ampControl,
    prevSequencerDur,
    quadDelayBuffer;

  *getMaximumDelaySeconds {
    ^10.0;
  }
  init {
    arg params;
    
    this.delayFeedbackControl = KrNumberEditor.new(0.5, ControlSpec(0.0, 0.999999, \linear));
    this.pingPongAmountControl = KrNumberEditor.new(0.0, \unipolar);

    delayFeedbackControl = KrNumberEditor.new(0.5, ControlSpec(0.0, 0.999999, \linear));
    ampControl = KrNumberEditor.new(1.0, \amp);
    pingPongAmountControl = KrNumberEditor.new(0.0, \unipolar);

    //"SynkopaterDelayQuad.init".postln();

    super.init(params);

  }

  gui_window_title {
    ^componentId.asString() ++ " delay";
  }

  load_samples {
    arg onDone;
    Buffer.alloc(
      Server.default,
      SynkopaterDelayQuad.getMaximumDelaySeconds() * Server.default.sampleRate,
      4,
      {
        arg buf;
        quadDelayBuffer = buf;
        AppClock.sched(0.0, {
          Stethoscope.new(Server.default, 4, bufnum: buf.bufnum);
        });
        onDone.value();
      }
    );
  }

  init_patches {
    arg params;
    super.init_patches(params);

    inputPatch = Patch("cs.Synkopater.SynkopaterDelayQuadWithInput", (
      inputChannelNums: [componentState.inputBus, componentState.inputBus + 1],
      numChan: 2,
      delaySecs: KrNumberEditor.new(1.0, ControlSpec(0.0, 8.0)),
      feedbackCoefficient: delayFeedbackControl,
      pingPongAmount: pingPongAmountControl,
      amp: ampControl,
      bufnum: quadDelayBuffer.bufnum
    ));

  }

  on_play {
    //this.outputChannel.play(inputPatch);
    inputPatch.play(bus: this.outputBus);
  }

  update_delay_time {
    var currentBeatsPerSecond;
    currentBeatsPerSecond = clock.tempo;
    if (inputPatch != nil, {
      inputPatch.delaySecs.value = (
        componentState.parameters.delayFactor / currentBeatsPerSecond
      );
      this.store.dispatch((
        type: 'SYNKOPATER_DELAY_TIME_UPDATE',
        payload: (
          sequencerId: componentState.sequencerId,
          delaySecs: inputPatch.delaySecs.value
        )
      ));
    });
  }

  get_sequencer_dur {
    var sequencerId,
      state,
      sequencerDur,
      prevComponentState = componentState;
    sequencerId = componentState.sequencerId.asSymbol();
    state = this.store.getState();
    sequencerDur = state.sequencers.at(sequencerId)['dur'];
    ^sequencerDur;
  }

  handle_state_change {
    var sequencerDur,
      prevComponentState = componentState;
    super.handle_state_change();
    sequencerDur = this.get_sequencer_dur();

    if ((sequencerDur != prevSequencerDur).or(componentState.parameters.delayFactor != prevComponentState.parameters.delayFactor), {
      prevSequencerDur = sequencerDur;
      this.update_delay_time();
    });

  }

  //load_environment {
    //arg params;
    //var me = this,
      //t = TempoClock.default;
    
    //super.load_environment(params);
    
  //}

  init_gui {
    arg params;
    var labelWidth = 75,
      layout = params['layout'];

    super.init_gui(params);

    layout.flow({
      arg layout;
      
      ArgNameLabel("delayFeedback", layout, labelWidth);
      delayFeedbackControl.gui(layout);
      layout.startRow();

      ArgNameLabel("pingPongAmount", layout, labelWidth);
      pingPongAmountControl.gui(layout);
      layout.startRow();

      ArgNameLabel("ampControl", layout, labelWidth);
      ampControl.gui(layout);
      layout.startRow();

    });
  }
}
