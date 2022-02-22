function normalized_fader_value(faderValueVolts)
  return faderValueVolts / 10.0
end

ii.event_raw = function (addr, cmd, data)
  print("event_raw")
end

ii.faders.event = function (e, value)
  print("faders.event")
  print(e.name)
  print(value)
  normValue = normalized_fader_value(value)

  outputValue = normValue * 1.0
  output[3].volts = outputValue
end


function fetch_fader_values()
  ii.faders.get(11)
end

function init()
  print("Starting up...")
  -- Sweet Sixteen is doing the i2c pullup
  ii.pullup(false)
  

  metro[1].time = 0.01
  metro[1].event = fetch_fader_values
  metro[1]:start()
end

