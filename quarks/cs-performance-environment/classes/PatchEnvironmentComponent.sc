PatchEnvironmentComponent : PerformanceEnvironmentComponent {

  var <>buf,
    <>patch;


  init {
    arg params;
    
    super.init(params);

    /*"PatchEnvironmentComponent.init".postln;*/

    
  }

  on_play {
    //this.patch.play(bus: Bus.audio(Server.default, this.outputBus));
    this.outputChannel.play(this.patch);
    /*this.patch.playToMixer(this.outputChannel);*/
  }

  load_environment {
    this.load_patch();
  }

  load_patch {
    /*"PatchEnvironmentComponent.load_samples".postln;*/
    // subclasses should instantiate Patch objects here and call prepareForPlay
  }

  /**
   *  Map a property of the patch to a controller knob or slider.
   *
   *  @param  {MKtlDevice}  controller - The controller instance.
   *  @param  {Symbol}  elementKey - The knob or slider on the
   *  controller.  Ex: 'sl1'.
   *  @param  Symbol|Array  Used as a key or keys to identify the property of
   *  the patch to control with the aforementioned controller knob.  Ex: \amp.
   **/
  map_controller_to_patch {
    // mapTo has a different default than in parent class
    arg controller, elementKey, propertyKeys, mapTo = this.patch;

    this.map_controller_to_property(
      controller,
      elementKey,
      propertyKeys,
      mapTo
    );

  }


}
