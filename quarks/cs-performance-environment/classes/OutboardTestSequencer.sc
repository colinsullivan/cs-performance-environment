// SuperCollider 3.9devBrowseSearchIndexes ▼Pattern Guide Cookbook 04: Sending MIDI - Table of contents ▼
// Tutorials/A-Practical-Guide | Streams-Patterns-Events > A-Practical-Guide
// Pattern Guide Cookbook 04: Sending MIDI
// Sending notes under pattern control to MIDI devices
// See also: Pattern Guide Cookbook 03: External Control, Pattern Guide Cookbook 05: Using Samples
// Sending MIDI out with Patterns
// Sending MIDI is the job of the MIDIOut class and the \midi event type. A MIDIOut is created to talk to a hardware device; the MIDI channel is provided when an event is played. MIDIOut's newByName makes it easier to identify a device.
// The \midi event type supports the following commands, chosen in the event by the \midicmd key: \allNotesOff, \bend, \control, \noteOff, \noteOn, \polyTouch, \program, \smpte, \songPtr, \sysex, \touch. The default is \noteOn. When playing a note (noteOn), by default the corresponding noteOff message will be sent after the note's sustain time.
// If you want to synchronize events played by a MIDI device and events played by the SuperCollider server, the MIDIOut object's latency must match the server latency. You can set the latency any time to affect all future events.
// MIDIClient.init;    // if not already done
// 
// (
//     // substitute your own device here
// var    mOut = MIDIOut.newByName("FastLane USB", "Port A").latency_(Server.default.latency);
// 
// p = Pbind(
//     \type, \midi,
//         // this line is optional b/c noteOn is the default
//         // just making it explicit here
//     \midicmd, \noteOn,
//     \midiout, mOut,    // must provide the MIDI target here
//     \chan, 0,
//         // degree is converted to midinote, not just frequency
//     \degree, Pwhite(-7, 12, inf),
//     \dur, Pwrand([0.25, Pn(0.125, 2)], #[0.8, 0.2], inf),
//     \legato, sin(Ptime(inf) * 0.5).linexp(-1, 1, 1/3, 3),
//     \amp, Pexprand(0.5, 1.0, inf)
// ).play(quant: 1);
// )
// 
// p.stop;
// Previous: Pattern Guide Cookbook 03: External Control
// Next: Pattern Guide Cookbook 05: Using Samples
// helpfile source: /usr/local/share/SuperCollider/HelpSource/Tutorials/A-Practical-Guide/PG_Cookbook04_Sending_MIDI.schelp
// link::Tutorials/A-Practical-Guide/PG_Cookbook04_Sending_MIDI::

OutboardTestSequencer : AwakenedSequencer {
  var pat,
    specs;
  initPatch {

    ^false;
  }

  initStream {
    specs = (
          'dur': ControlSpec(0, 4, step: 1.0/16.0)
        );
    pat = Pbind(
     \type, \midi,
     \midicmd, \noteOn,
     \midiout, midiOut,
     \chan, 0,
      \midinote, Pseq([96, 84, 84, 84], inf),
      // rhythmic values
      \dur, Pseq([Pfuncn({
        specs['dur'].map(currentState.dur)
      }, 4)], inf)
    );

    ^pat.asStream();
  }
}

