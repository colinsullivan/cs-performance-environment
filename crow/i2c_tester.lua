--function normalized_fader_value(faderValueVolts)
  --return faderValueVolts / 10.0
--end

--ii.event_raw = function (addr, cmd, data)
  --print("event_raw")
--end

ii.faders.event = function (e, value)
  print("faders.event")
  print(e.name)
  print(value)
  --normvalue = normalized_fader_value(value)

  --outputvalue = normvalue * 1.0
  --output[3].volts = outputvalue
end


function fetch_fader_values()
  ii.faders.get(11)
end

function init()
  print("Starting up...")
  -- Sweet Sixteen is doing the i2c pullup
  ii.pullup(false)
  

  metro[1].time = 1.0
  metro[1].event = fetch_fader_values
  metro[1]:start()
end

