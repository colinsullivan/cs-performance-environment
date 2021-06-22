RunningWaterEnvironment : PatchEnvironmentComponent {

  var <>hellValueBus,
    <>hellValueLabel,
    <>hellValueUpdater,
    <>hellFreqLabel;

  /*init {
    arg params;
    super.init(params);
    
    this.hellValueBus = Bus.control(numChannels: 1);
  }*/

  load_samples {
    arg callback;

    var sfxRoot = "SC_SAMPLES_DIR".getenv() +/+ "Recorded Sounds/Sound Effects/",
      me = this;

    Buffer.read(Server.default, sfxRoot ++ "running water stream.aif", action: {
      arg buf;

      me.buf = buf;

      callback.value();
    });
  }

  init_patches {
    super.init_patches();

    this.patch = Patch(Instr.at("cs.sfx.RunningWaterStream.RunningWaterStreamAutomated"), (
      buffer: this.buf,
      gate: KrNumberEditor.new(1, \gate.asSpec()),
      useOscillator: KrNumberEditor.new(0, \gate.asSpec()),
      amp: KrNumberEditor.new(0.0, \amp)
      //hellValueBus: this.hellValueBus
    ));
  }

  init_gui {
    arg params;

    var toggleButton,
      patch = this.patch,
      layout = params['layout'],
      interface = this.interface,
      labelWidth = 50,
      me = this;

    super.init_gui(params);

    layout.flow({
      arg layout;

      ArgNameLabel("amp", layout, labelWidth);
      patch.amp.gui(layout);
      layout.startRow();

      /*ArgNameLabel("hellMin", layout, labelWidth);
      patch.hellMin.gui(layout);
      layout.startRow();*/

      ArgNameLabel("hellMax", layout, labelWidth);
      patch.hellMax.gui(layout);
      layout.startRow();

      ArgNameLabel("hellFreq", layout, labelWidth);
      patch.hellFreq.gui(layout);
      layout.startRow();
      
      /*ArgNameLabel("hellAmp", layout, labelWidth);
      patch.hellAmp.gui(layout);
      layout.startRow();*/

    });

    /*layout.flow({
      arg layout;

      toggleButton = Button(layout, Rect(10, 10, 100, 30))
        .states_([
          ["on"],
          ["off"]
        ])
        .action_({
          arg toggleButton;

          patch.set(\gate, toggleButton.value);
        });

    });
*/
    /*layout.flow({
      arg layout;

      ArgNameLabel("hellValue", layout, labelWidth);
      me.hellValueLabel = ArgNameLabel("", layout, labelWidth);
      me.hellValueLabel.background = Color.black();
      me.hellValueLabel.stringColor = Color.green();

    });

    this.hellValueUpdater = Routine.new({

      {
        {
          me.window.isClosed.not.if {

            me.hellValueBus.get({
              arg hellValue;
 
              {
                me.hellValueLabel.string = " " + hellValue.round(0.01);
              }.defer();
  
            });

            {
              var currentHellFreq = me.patch.hellFreq.value(),
                currentUseOsc = me.patch.useOscillator.value();
  
              // if frequency is set to zero
              if (currentHellFreq == 0, {
  
                  // if oscillator is still on
                  if (currentUseOsc == 1, {
                    // turn off oscillator
                    me.patch.set(\useOscillator, 0);
                  });
                
              }, {
                // frequency is not set to zero
  
                // if oscillator is off
                if (currentUseOsc == 0, {
                  // turn on oscillator
                  me.patch.set(\useOscillator, 1);
                });
              
              });
            }.defer();

          };
  
        }.defer();
  
        0.1.wait;
      }.loop();
    });

    this.hellValueUpdater.play();

    this.window.onClose = { me.hellValueUpdater.stop(); };*/

  }

  //init_external_controller_mappings {
    
    //super.init_external_controller_mappings();

    //if (this.uc33Controller != nil, {
      //this.map_uc33_to_patch(\sl3, \amp);
      //this.map_uc33_to_patch(\knl3, [\hellMax]);
      ////this.map_uc33_to_patch(\knm4, \hellMin);
      //[>this.map_uc33_to_patch(\knu4, \hellFreq);<]
    //});

    //if (this.launchControlController != nil, {
      ////this.map_controller_to_patch(this.launchControlController, \knu5, \amp);
    //});

  //}
  init_launchcontrol_mappings {
    //this.map_controller_to_patch(
      //this.launchControlController,
      //'pg0_kn_sndB_5',
      //[\hellMax]
    //);

    this.map_controller_to_patch(
      this.sixteennController,
      'sl_4',
      \hellMax
    );

    this.map_controller_to_patch(
      this.sixteennController,
      'sl_5',
      \amp
    );

  }

}
