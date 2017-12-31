/**
 *  @class  PerformanceEnvironmentComponent   A component of a performance
 *  environment that has a GUI window.
 **/
PerformanceEnvironmentComponent : Object {
  var <>origin,
    <>uc33Controller,
    <>softStepController,
    <>abletonController,
    <>launchControlController,
    <>interface,
    <>window,
    <>init_done_callback,
    // MixerChannel instance
    <>outputChannel,
    // number
    <>outputBus,
    <>playing;

  *new {
    arg params;

    ^super.new.init(params);
  }

  create_output_channel {
    ^MixerChannel.new(
      this.gui_window_title(),
      Server.default,
      2, 2,
      outbus: this.outputBus
    );
  }

  init {
    arg params;
    var me = this;

    this.playing = false;

    if (params['outputBus'] == nil, {
      this.outputBus = 0;
    }, {
      this.outputBus = params['outputBus'];
    });
    
    this.outputChannel = this.create_output_channel();

    this.origin = params['origin'];
    this.init_done_callback = params['init_done_callback'];
 
    // initialize loading of samples
    this.load_samples({

      // when samples are finished, load interface
      me.interface = Interface({
        me.load_environment();
      }).onPlay_({
        me.on_play();
      }).onStop_({
        me.on_stop();
      });

      me.interface.gui = {
        arg layout, metaPatch;
        me.init_gui((
          window: layout.parent.parent,
          layout: layout,
          metaPatch: metaPatch
        ));
        me.init_external_controller_mappings();
      };

      {
        me.interface.gui();
        me.init_done_callback.value();
      }.defer(1);
    });
  }

  done_loading_samples {
  
  }
  
  /**
   *  Load all audio buffers required for this component.
   *  
   *  @param  Function  callback  To call when done loading samples.
   **/
  load_samples {
    arg callback;
    // subclasses should load samples before using callback
    callback.value();
  }

  init_tracks {
  
  }

  init_patches {
  
  }

  play_patches_on_tracks {
  
  }

  load_environment {
    this.init_tracks();
    this.init_patches();
    {
      this.play_patches_on_tracks();
    }.defer(1);
  }


  init_gui {
    arg params;
   
    this.window = params['window'];

    //this.window.bounds = this.window.bounds.moveToPoint(this.origin);
    this.window.name = this.gui_window_title();
  }
 
  /**
   *  Called when the play button is pressed on the interface.
   **/
  on_play {
    this.playing = true;
  }

  /**
   *  Called when the stop button is pressed on the interface.
   **/
  on_stop {
    this.playing = false;
  }

  init_external_controller_mappings {
    var uc33Port,
      softStepPort,
      launchControlPort,
      abletonPort;
    
    uc33Port = MIDIIn.findPort("UC-33 USB MIDI Controller", "Port 1");

    if (uc33Port != nil, {
      // sub-classes should use this UC33Ktl instance to assign knobs and such.
      this.uc33Controller = UC33Ktl.new(
        uc33Port.uid
      );

      this.init_uc33_mappings();
    }, {
      // sub-classes should check to see if uc33Controller is nil to determine
      // if it is currently connected.
      this.uc33Controller = nil;
    });

    softStepPort = MIDIIn.findPort("SoftStep Share", "SoftStep Share");
    
    if (softStepPort != nil, {
      this.softStepController = SoftStepKtl.new(softStepPort.uid);
      this.init_softStep_mappings();
    }, {
      this.softStepController = nil;
    });
    
    abletonPort = MIDIIn.findPort("(out) SuperCollider", "(out) SuperCollider");
    if (abletonPort != nil, {
      this.abletonController = AbletonKtl.new(abletonPort.uid);
      this.init_ableton_mappings();
    }, {
      this.abletonController = nil;
    });
    
    launchControlPort = MIDIIn.findPort("Launch Control XL", "Launch Control XL");
    if (launchControlPort != nil, {
      this.launchControlController = LaunchControlXLKtl.new(launchControlPort.uid);
      this.init_launchcontrol_mappings();
    }, {
      this.launchControlController = nil;
    });
  }

  /**
   *  Initialize mappings for specific controllers if they are present.
   **/
  init_uc33_mappings {
  
  }

  init_softStep_mappings {
  
  }

  init_ableton_mappings {
  
  }

  init_launchcontrol_mappings {

  }

  /**
   *  Returns the member variables at the provided keys.
   *
   *  @private
   *
   *  @param  {Symbol|Array}  propertyKeys -  The keys at which to get the
   *          properties.  i.e. this.<something>
   *  @param  {Object}  from - The object to get properties from.  Optional,
   *          defaults to `this`.
   **/
  pr_get_properties_from_keys {
    arg propertyKeys, from = this;
    var properties;

    if (propertyKeys.class == Symbol, {
      propertyKeys = [propertyKeys];    
    });

    properties = Array.new(propertyKeys.size());

    propertyKeys.do({
      arg propertyKey;

      properties = properties.add(from.performMsg([propertyKey]));
    });

    ^properties;
  
  }

  /**
   *  Map a property of the component (member variable) to any controller
   *  knob or slider.
   *
   *  @param  {MIDIKtl}  controller - The JITKtl controller instance
   *  @param  Symbol  The key used to identify the knob or slider on the 
   *  controller.  Ex. \sl1
   *  @param  Symbol|Array  Used as a key to identify the property of the
   *  component to control with the aforementioned controller knob.
   *  Ex: \amp.  If provided an array, knob controls all of the elements.
   *  @param  [Object]  The actual object to map to.  Defaults to `this` for
   *  mapping controller to member variables.
   **/
  map_controller_to_property {
    arg controller, controllerComponent, propertyKeys, mapTo = this;
    var properties;

    properties = this.pr_get_properties_from_keys(propertyKeys, mapTo);

    controller.mapCCS(1, controllerComponent, {
      arg ccval;

      properties.do({
        arg property;

        property.set(property.spec.map(ccval / 127));
      });

    });
  
  }
  /**
   *  Map a property of the component (member variable) to a UC-33 controller
   *  knob or slider.
   *
   *  @param  Symbol  The key used to identify the knob or slider on the 
   *  controller.  Ex. \sl1
   *  @param  Symbol|Array  Used as a key to identify the property of the
   *  component to control with the aforementioned controller knob.
   *  Ex: \amp.  If provided an array, knob controls all of the elements.
   *  @param  [Object]  The actual object to map to.  Defaults to `this` for
   *  mapping controller to member variables.
   **/
  map_uc33_to_property {
    arg controllerComponent, propertyKeys, mapTo = this;
    var properties;

    properties = this.pr_get_properties_from_keys(propertyKeys, mapTo);

    this.uc33Controller.mapCCS(1, controllerComponent, {
      arg ccval;

      properties.do({
        arg property;

        property.set(property.spec.map(ccval / 127));
      });

    });
  
  }

  /**
   *  Map an outgoing MIDI control from Ableton to a property on this
   *  component.
   *
   *  @param  {Number}  channel - MIDI channel
   *  @param  {Number}  cc - CC (as listed on the ableton interface)
   *  @param  {Symbol|Array}  propertyKeys - The property we will assign these
   *          cc messages to.
   *  @param  {Object}  mapTo - Optional
   **/
  map_ableton_cc_to_property {
    arg channel, cc, propertyKeys, mapTo = this;
    var properties, abletonCCKey;

    properties = this.pr_get_properties_from_keys(propertyKeys, mapTo);

    abletonCCKey = this.abletonController.makeCCKey(channel, cc);

    this.abletonController.mapCC(abletonCCKey, {
      arg ccval;

      properties.do({
        arg property;

        property.set(property.spec.map(ccval / 127));
      });
    });
  }

  /**
   *  Called to set title of GUI window.  Default is the name of the class
   *  of the component.
   **/
  gui_window_title {
    ^this.class.asString();
  }
}
