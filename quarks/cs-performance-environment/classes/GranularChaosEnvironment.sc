GranularChaosEnvironment : PatchEnvironmentComponent {

  var <>grainEnvBuf;

  load_samples {
    arg callback;
    var sfxRoot = "SC_SAMPLES_DIR".getenv() +/+ "Recorded Sounds/Sound Effects/",
      winenv = Env.sine(4.0),
      me = this;

    /*"GranularChaosEnvironment.load_samples".postln;*/

    Buffer.read(Server.default, sfxRoot ++ "bong-1.aif", action: {
      arg buf;

      me.buf = buf;

      Buffer.sendCollection(Server.default, winenv.discretize, 1, action: {
        arg envBuf;

        me.grainEnvBuf = envBuf;

        callback.value();
      });
    });
  }

  init_patches {
    super.init_patches();

    /*"GranularChaosEnvironment.load_patch".postln;*/

    this.patch = Patch(Instr.at("cs.sfx.GranularChaos"), (
      buffer: this.buf,
      envbuf: this.grainEnvBuf,
      gate: KrNumberEditor.new(1, \gate),
      amp: KrNumberEditor.new(0.0, \amp)
      /*done_callback: {
        "done!".postln;
      },*/
    ));
  }

  init_external_controller_mappings {
    super.init_external_controller_mappings();

    /*"GranularChaosEnvironment.init_external_controller_mappings".postln;*/
    

    //this.map_controller_to_patch(
      //this.launchControlController,
      //'pg0_kn_sndA_4',
      //\pointer
    //);
    //this.map_controller_to_patch(
      //this.launchControlController,
      //'pg0_kn_sndB_4',
      //\pitch
    //);

    this.map_controller_to_patch(
      this.sixteennController,
      'sl_1',
      \pointer
    );

    this.map_controller_to_patch(
      this.sixteennController,
      'sl_2',
      \pitch
    );

    this.map_controller_to_patch(
      this.sixteennController,
      'sl_3',
      \amp
    );

  }

  init_gui {
    arg params;
    var granularButton,
      label,
      patch = this.patch,
      layout = params['layout'],
      labelWidth = 75;
  
    super.init_gui(params);

    /*"GranularChaosEnvironment.init_gui".postln;*/

    layout.flow({
      arg layout;
      ArgNameLabel("pos", layout, labelWidth);
      patch.pointer.gui(layout);
      layout.startRow();
      
      ArgNameLabel("pitch", layout, labelWidth);
      patch.pitch.gui(layout);
      layout.startRow();
      
      ArgNameLabel("amp", layout, labelWidth);
      patch.amp.gui(layout);

    });

    /*window = Window.new("Granular", Rect(*/
      /*(screenBounds.width() / 2.0) - (windowWidth / 2.0),*/
      /*(screenBounds.height() / 2.0) - (windowHeight / 2.0),*/
      /*windowWidth,*/
      /*windowHeight*/
    /*));*/

    /*layout.flow({
      arg layout;
      granularButton = Button(layout, Rect(10, 10, 100, 30)).states_([
        ["on"],
        ["off"]
      ])
      .action_({ arg granularButton;

        if (granularButton.value == 1, {
          patch.set(\gate, 1);
        }, {
          patch.set(\gate, 0);
        });

      });

    });*/
  }
}
