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
  var inputPatch,
    <>delayFeedbackControl,
    <>ampControl,
    prevSequencerDur;

  init {
    arg params;
    
    this.delayFeedbackControl = KrNumberEditor.new(0.5, ControlSpec(0.0, 0.999999, \linear));

    this.ampControl = KrNumberEditor.new(1.0, \amp);

    "SynkopaterDelay.init".postln();

    super.init(params);

  }

  gui_window_title {
    ^componentId.asString() ++ " delay";
  }

  init_patches {
    arg params;
    super.init_patches(params);

    inputPatch = Patch("cs.Synkopater.SynkopaterDelayWithInput", (
      inputChannelNums: [componentState.inputBus, componentState.inputBus + 1],
      numChan: 2,
      delaySecs: KrNumberEditor.new(1.0, ControlSpec(0.0, 8.0)),
      feedbackCoefficient: this.delayFeedbackControl,
      amp: this.ampControl
    ));

  }

  on_play {
    this.outputChannel.play(inputPatch);
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
    //"SynkopaterDelay.handle_state_change".postln();
    sequencerDur = this.get_sequencer_dur();

    if ((sequencerDur != prevSequencerDur).or(componentState.parameters.delayFactor != prevComponentState.parameters.delayFactor), {
      prevSequencerDur = sequencerDur;
      this.update_delay_time();
    });

  }

  init_gui {
    arg params;
    var labelWidth = 75,
      layout = params['layout'];

    super.init_gui(params);

    layout.flow({
      arg layout;
      
      ArgNameLabel("delayFeedback", layout, labelWidth);
      this.delayFeedbackControl.gui(layout);
      layout.startRow();

      ArgNameLabel("ampControl", layout, labelWidth);
      this.ampControl.gui(layout);
      layout.startRow();

    });
  }
}
