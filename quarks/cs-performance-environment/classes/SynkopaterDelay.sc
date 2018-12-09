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
    <>delayFactorParam,
    <>delayFeedbackControl,
    <>ampAndToggleSlider;

  init {
    arg params;
    
    this.delayFactorControl = KrNumberEditor.new(1, ControlSpec(0, 2, \linear, (1.0 / 16.0)));
    this.delayFeedbackControl = KrNumberEditor.new(0.5, ControlSpec(0.0, 0.999999, \linear));

    this.ampAndToggleSlider = KrNumberEditor.new(0.0, \amp);

    super.init(params);
    
    this.delayFactorParam = InstrumentParameter.new((
      store: params['store'],
      statePath: this.getComponentStatePath() ++ ".parameters.delayFactor",
      numberEditor: this.delayFactorControl,
      componentId: this.componentId,
      parameterId: 'delayFactor'
    ));

  }

  gui_window_title {
    ^componentId.asString() ++ " delay";
  }

  init_tracks {
    arg params;
    super.init_tracks(params);

    this.inputTrack = MixerChannel.new(
      "synkopaterDelayInput",
      Server.default,
      2, 2,
      level: 1.0,
      outbus: this.outputChannel
    );

  }

  init_patches {
    arg params;
    super.init_patches(params);

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

  play_patches_on_tracks {
    this.inputTrack.playfx(this.delayPatch);
  }

  on_play {
    inputTrack.play(inputPatch);
  }

  handle_synkopation_control_changed {
    var currentBeatsPerSecond,
      sequencerDur,
      sequencerId,
      state;

    state = this.store.getState();
    sequencerId = componentState.sequencerId.asSymbol();
    currentBeatsPerSecond = this.clockController.clock.tempo;
    sequencerDur = state.sequencers.at(sequencerId)['dur'];

    this.delayPatch.delaySecs.value = (
      this.delayFactorControl.value() * (
        currentBeatsPerSecond * (1 + sequencerDur)
      )
    );

  }

  load_environment {
    arg params;
    var me = this,
      t = TempoClock.default;
    
    super.load_environment(params);
    
    this.delayFactorControl.action = {
      arg val;
      me.handle_synkopation_control_changed();
    };

    // when amplitude and toggle slider is changed
    this.ampAndToggleSlider.action = {
      arg val;

      // set volume of output
      me.outputChannel.level = val;

      // if slider is zero, and patch is playing, stop patch
      if (me.playing && val == 0, {
        me.interface.stop();
      }, {
        // if slider is non-zero and patch is stopped, start patch
        if (me.playing == false && val != 0, {
          me.interface.play();    
        });
      });
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
      this.ampAndToggleSlider.gui(layout);
      layout.startRow();

    });
  }
  init_external_controller_mappings {
    super.init_external_controller_mappings();

    if (controllerMappings != nil, {
        controllerMappings.keysValuesDo({
          arg controller, mappings;

          switch(controller,
            \launchControl, {
              if (this.launchControlController != nil, {
                "Mapping launchControl".postln();
                mappings.keysValuesDo({
                  arg controlName, property;
                  ("mapping `" + controlName + "` to this." + property).postln();
                  this.map_controller_to_property(
                    this.launchControlController,
                    controlName.asSymbol(),
                    property.asSymbol()
                  );
                });
              }, {
                "Skipping launchcontrol mappings because controller disconnected".postln();
              });
            },
            {
              ("No mapping for " + controller).postln();
            }
          );

        });
    });
    

  }
  init_launchcontrol_mappings {

  }
  init_uc33_mappings {
    //this.map_uc33_to_property(\knu1, \synkopationControlOne);
    //this.map_uc33_to_property(\knm1, \synkopationControlTwo);
    //this.map_uc33_to_property(\knl1, \delayFactorControl);
    //this.map_uc33_to_property(\knu2, \delayFeedbackControl);
    //this.map_uc33_to_property(\sl1, \ampAndToggleSlider);
  }
}
