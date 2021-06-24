/**
 *  @file       SynkopaterDelay.sc
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2017 Colin Sullivan
 *  @license    Licensed under the GPLv3 license.
 **/

SynkopaterDelay : PerformanceEnvironmentComponent {
  var <>inputTrack,
    inputPatch,
    //<>delayTrack,
    <>delayPatch,
    <>delayFactorControl,
    //<>delayFactorParam,
    <>delayFeedbackControl,
    <>ampSlider,
    prevSequencerDur;

  init {
    arg params;
    
    this.delayFactorControl = KrNumberEditor.new(1, ControlSpec(0, 8, \linear, (1.0 / 16.0)));
    this.delayFeedbackControl = KrNumberEditor.new(0.5, ControlSpec(0.0, 0.999999, \linear));

    this.ampSlider = KrNumberEditor.new(1.0, \amp);

    "SynkopaterDelay.init".postln();

    super.init(params);
    
    //this.delayFactorParam = InstrumentParameter.new((
      //store: params['store'],
      //statePath: this.getComponentStatePath() ++ ".parameters.delayFactor",
      //numberEditor: this.delayFactorControl,
      //componentId: this.componentId,
      //parameterId: 'delayFactor'
    //));

  }

  gui_window_title {
    ^componentId.asString() ++ " delay";
  }

  init_tracks {
    arg params;
    super.init_tracks(params);
    //"SynkopaterDelay.initTracks".postln();

    this.inputTrack = MixerChannel.new(
      "synkopaterDelayInput",
      Server.default,
      2, 2,
      level: this.ampSlider,
      outbus: this.outputChannel
    );

  }

  init_patches {
    arg params;
    super.init_patches(params);
    //"SynkopaterDelay.initPatches".postln();

    // because of the way MixerChannel works, we need a passthrough so
    // something gets through to the fx stage.  I tried rewriting the
    // SynkopaterDelay patch to be the "primary" patch but it was weird...
    inputPatch = Patch("cs.utility.Passthrough", (
      inputChannelNums: [componentState.inputBus, componentState.inputBus + 1]
    ));

    delayPatch = FxPatch("cs.Synkopater.SynkopaterDelay", (
      numChan: 2,
      delaySecs: KrNumberEditor.new(1.0, ControlSpec(0.0, 8.0)),
      feedbackCoefficient: this.delayFeedbackControl
    ));

  }

  on_play {
    inputTrack.play(inputPatch);
    inputTrack.playfx(delayPatch);
  }

  update_delay_time {
    var currentBeatsPerSecond;
    currentBeatsPerSecond = clock.tempo;
    if (delayPatch != nil, {
      delayPatch.delaySecs.value = (
        componentState.parameters.delayFactor * (
          currentBeatsPerSecond / prevSequencerDur
        )
      );
      this.store.dispatch((
        type: 'SYNKOPATER_DELAY_TIME_UPDATE',
        payload: (
          sequencerId: componentState.sequencerId,
          delaySecs: delayPatch.delaySecs.value
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
    //"SynkopaterDelay.handle_state_change".postln();
    sequencerDur = this.get_sequencer_dur();

    if ((sequencerDur != prevSequencerDur).or(componentState.parameters.delayFactor != prevComponentState.parameters.delayFactor), {
      prevSequencerDur = sequencerDur;
      this.update_delay_time();
    });

  }

  load_environment {
    arg params;
    var me = this,
      t = TempoClock.default;
    
    super.load_environment(params);
    
    this.delayFactorControl.action = {
      arg val;
      me.update_delay_time();
    };
  }


  init_gui {
    arg params;
    var labelWidth = 75,
      layout = params['layout'];

    super.init_gui(params);

    layout.flow({
      arg layout;
      
      //ArgNameLabel("delayFactor", layout, labelWidth);
      //this.delayFactorControl.gui(layout);
      //layout.startRow();
      
      ArgNameLabel("delayFeedback", layout, labelWidth);
      this.delayFeedbackControl.gui(layout);
      layout.startRow();

      ArgNameLabel("amp", layout, labelWidth);
      this.ampSlider.gui(layout);
      layout.startRow();

    });
  }
  //init_uc33_mappings {
    ////this.map_uc33_to_property(\knu1, \synkopationControlOne);
    ////this.map_uc33_to_property(\knm1, \synkopationControlTwo);
    ////this.map_uc33_to_property(\knl1, \delayFactorControl);
    ////this.map_uc33_to_property(\knu2, \delayFeedbackControl);
    ////this.map_uc33_to_property(\sl1, \ampSlider);
  //}
}
