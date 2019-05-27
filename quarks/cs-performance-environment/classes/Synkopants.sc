Synkopants : PerformanceEnvironmentComponent {
  var <>bufManager,
    <>ampAndToggleSlider,
    <>elements;

  init {
    arg params;

    this.elements = [

      SamplerSynkopantsElement.new((
        parent: this,
        bufKey: \kick,
        name: "kick",
        layoutRow: 1
      )),

      SamplerSynkopantsElement.new((
        parent: this,
        bufKey: \snare01,
        name: "snare 1",
        layoutRow: 1
      )),
      
      SamplerSynkopantsElement.new((
        parent: this,
        bufKey: \pitched01,
        name: "pitched 1",
        layoutRow: 2
      )),
      
      SamplerSynkopantsElement.new((
        parent: this,
        bufKey: \pitched02,
        name: "pitched 2",
        layoutRow: 2
      )),
      
      SamplerSynkopantsElement.new((
        parent: this,
        bufKey: \pitched03,
        name: "pitched 3",
        layoutRow: 2
      )),

      OrganicPercussionSynkopantsElement.new((
        parent: this,
        name: "one",
        freq: "A4".notemidi().midicps(),
        layoutRow: 3
      )),

      OrganicPercussionSynkopantsElement.new((
        parent: this,
        name: "two",
        freq: "A5".notemidi().midicps(),
        layoutRow: 3
      )),

      OrganicPercussionSynkopantsElement.new((
        parent: this,
        name: "three",
        freq: "A6".notemidi().midicps(),
        layoutRow: 3
      ))
    
    ];

    this.ampAndToggleSlider = KrNumberEditor.new(0.0, \amp);
    
    //  create the buffer manager that will load the samples we need for this
    //  patch.
    this.bufManager = BufferManager.new().init((
      rootDir: "/Users/colin/Samples/Recorded Sounds/Sound Effects/"
    ));

    super.init(params);
  }

  load_samples {
    arg callback;

    this.bufManager.load_bufs([
      ["susans_coffee_hits/crunchy.wav", \crunchy],
      ["susans_coffee_hits/low.wav", \low],
      ["susans_coffee_hits/pitched-01.wav", \pitched01],
      ["susans_coffee_hits/pitched-02.wav", \pitched02],
      ["susans_coffee_hits/pitched-03.wav", \pitched03],
      ["susans_coffee_hits/snare-01.wav", \snare01],
      ["susans_coffee_hits/snare-02.wav", \snare02],
      ["susans_coffee_hits/kick.wav", \kick]
    ], callback);

  }

  /**
   *  For each element, make sure patch is created.
   */
  init_patches {
    super.init_patches();


    this.elements.do({
      arg element;

      element.init_patch();
    });

  }

  /**
   *  For each element, make sure patch output is routed to our channel.
   */
  play_patches_on_tracks {
    super.play_patches_on_tracks();

    this.elements.do({
      arg element;

      this.outputChannel.addPatch(element.patch);
    });
  }

  load_environment {
    var me = this;

    super.load_environment();

    
    // when amplitude and toggle slider is changed
    this.ampAndToggleSlider.action = {
      arg val;

      // set volume of master output (affecting all elements)
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

    this.elements.do({
      arg element;

      element.load_environment();
    });

  }


  on_play {
    
    this.elements.do({
      arg element;

      element.on_play();
    });
    
    super.on_play();

  }

  init_gui {
    arg params;
    
    var layout = params['layout'],
      labelWidth = 120,
      me = this,
      currentLayoutRow = 0;

    super.init_gui(params);

    //layout.view.keyUpAction = {
      //arg view, char, modifiers, unicode, keycode, key;

      //if (keycode == 122, {
        //this.elements[0].numNotes.gui.focus(true);
      //});

      //"keycode:".postln;
      //keycode.postln;


    //};

    layout.flow({
      arg layout;

      ArgNameLabel("amp", layout, labelWidth);
      this.ampAndToggleSlider.gui(layout);
      layout.startRow();
    });

    currentLayoutRow = currentLayoutRow + 1;
    layout.startRow();

    this.elements.do({
      arg element;

      var elementLayoutRow = element.layoutRow;

      if (elementLayoutRow != currentLayoutRow, {
        layout.startRow();
        currentLayoutRow = currentLayoutRow + 1;
      });

      layout.flow({
        arg layout;

        element.init_gui((
          layout: layout,
          labelWidth: labelWidth
        ));

      });

    });


  }

  init_uc33_mappings {
    super.init_uc33_mappings();

    //this.map_uc33_to_property(\knu5, \numNotes);
    //this.map_uc33_to_property(\knm5, \phaseEnvModulator);
    //this.map_uc33_to_property(\sl5, \ampAndToggleSlider);
  }

}
