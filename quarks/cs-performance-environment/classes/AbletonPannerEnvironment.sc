AbletonPannerEnvironment : PerformanceEnvironmentComponent {
  var <>decoder, <>panners, <>ambisonicsChannel;

  create_output_channel {
    ^MixerChannel.new(
      this.gui_window_title(),
      Server.default,
      2, 2,
      outbus: 0
    );
  }

  init {
    arg params;

    var panningResponder,
      ambisonicsChannelDef,
      initResponder;

    /**
     *  Stereo decoders
     **/
    // Cardioids at 131 deg
    //this.decoder = FoaDecoderMatrix.newStereo(131/2 * pi/180, 0.5);
    // UHJ (kernel)
    //decoder = FoaDecoderKernel.newUHJ();
    // synthetic binaural (kernel)
    this.decoder = FoaDecoderKernel.newSpherical();
    // KEMAR binaural (kernel)
    //decoder = FoaDecoderKernel.newCIPIC();

		ambisonicsChannelDef = MixerChannelDef(\ambisonics, 3, 3,
			fader: SynthDef("mixers/ambisonics", {
						arg busin, busout, level, pan;
						var w, x, y, out;
						#w, x, y = In.ar(busin, 3);
						out = [w, x, y];
						ReplaceOut.ar(busin, out);
						Out.ar(busout, out);
					}),
			controls: (level: (spec: \amp, value: 0.75),
						pan: \bipolar
			)
		);
    this.ambisonicsChannel = MixerChannel.newFromDef(
      this.gui_window_title() ++ "_ambisonics",
      \ambisonics,
      Server.default,
      outbus: 8
    );

    /**
     *  2D decoders
     **/
    // psycho optimised quad
    //this.decoder = FoaDecoderMatrix.newQuad(k: 'dual');
    //decoder = FoaDecoderMatrix.newQuad(pi/6, 'dual')          // psycho optimised narrow quad
    //decoder = FoaDecoderMatrix.new5_0                         // 5.0
    //decoder = FoaDecoderMatrix.newPanto(6, k: 'dual')         // psycho optimised hex
    

    this.panners = ();

    panningResponder = OSCdef.new('panningResponder', {
      arg msg;

      this.handle_pan_message((
        trackId: msg[1],
        azimuth: msg[2],
        elevation: msg[3],
        distance: msg[4]
      ));

    }, '/cs/from_ableton/panner_update', recvPort: 6666);

    initResponder = OSCdef.new('initResponder', {
      arg msg;

      this.handle_init_message((
        trackId: msg[1]
      ));
    }, '/cs/from_ableton/panner_init', recvPort: 6666);
    
    super.init(params);
  }

  handle_init_message {
    
    arg params;
    var panner,
      trackId;

    trackId = params['trackId'];

    if (this.panners.at(trackId) == nil, {
      ("Creating a new panner for ableton track" + trackId + "...").postln();

      panner = Patch(Instr.at("cs.utility.AbletonPanner"), (
        bus: 12,
        azimuth: KrNumberEditor.new(0.0, \bipolar),
        distance: KrNumberEditor.new(0.5, \unipolar),
        decoder: this.decoder
      ));

      panner.prepareForPlay();

      this.panners[trackId] = panner;
    }, {
      ("Warning: Duplicate init message received.").postln();
    });

  }

  handle_pan_message {
    arg params;
    var panner;

    "handle_pan_message".postln();

    panner = this.panners[params['trackId']];

    if (panner == nil, {
      ("Warning!  Panner with id =" + params['trackId'] + "not found!").postln();
    });

    panner.set('distance', params['distance']);
    panner.set('azimuth', params['azimuth']);
  }

  load_environment {
  }

  on_play {
    this.panners.do({
      arg panner, i;

      this.ambisonicsChannel.play(panner);
    });
  }

}
