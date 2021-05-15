ShakerTextureInstrument : PatchEnvironmentComponent {
  var bufManager,
    shakersSegBuf,
    lowerResonantShakersSegBuf,
    patch;

  load_samples {
    arg callback;

    bufManager = BufferManager.new((
      rootDir: "/Users/colin/Samples/Recorded Sounds/Sound Effects"
    ));

    bufManager.load_bufs([
      ["shakers-various.wav", 'shakers']
    ], {
      shakersSegBuf = bufManager.get_buffer_section(
        bufName: 'shakers',
        startSeconds: 8.809,
        endSeconds: 20.468,
        channels: [0]
      );
      lowerResonantShakersSegBuf = bufManager.get_buffer_section(
        'shakers',
        188.451,
        196.848,
        [0]
      );
      callback.value();
    });
  }

  init_patches {
    super.init_patches();
    
    this.patch = Patch("cs.sfx.ShakerTexture.ShakerTexture", (
        gate: KrNumberEditor.new(1, \gate),
        amp: KrNumberEditor.new(0.0, \amp),
        shakersSegBuf: shakersSegBuf,
        lowerResonantShakersSegBuf: lowerResonantShakersSegBuf,
        grainRate: KrNumberEditor.new(0.0, ControlSpec(-0.5, 2.0)),
        trigRate: KrNumberEditor.new(0.0, ControlSpec(0, 4.5))
      )
    );
  }
  init_external_controller_mappings {
    super.init_external_controller_mappings();

    //this.map_controller_to_patch(
      //this.launchControlController,
      //'pg0_kn_sndA_7',
      //\grainRate
    //);
    //this.map_controller_to_patch(
      //this.launchControlController,
      //'pg0_kn_sndB_7',
      //\trigRate
    //);
    this.map_controller_to_patch(
      this.sixteennController,
      'sl_6',
      \grainRate
    );
    this.map_controller_to_patch(
      this.sixteennController,
      'sl_7',
      \trigRate
    );
    this.map_controller_to_patch(
      this.sixteennController,
      'sl_8',
      \amp
    );
  }
  gui_window_title {
    ^"ShakerTexture";
  }
  init_gui {
    arg params;
    var granularButton,
      label,
      patch = this.patch,
      layout = params['layout'],
      labelWidth = 75;
  
    super.init_gui(params);

    layout.flow({
      arg layout;
      ArgNameLabel("grainRate", layout, labelWidth);
      patch.grainRate.gui(layout);
      layout.startRow();
      
      ArgNameLabel("trigRate", layout, labelWidth);
      patch.trigRate.gui(layout);
      layout.startRow();
      
      ArgNameLabel("amp", layout, labelWidth);
      patch.amp.gui(layout);

    });

  }
}
