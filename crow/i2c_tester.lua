function init()
  print("Starting up...")
  ii.pullup(false)
end

--ii.event_raw = function (addr, cmd, data)
  --print("event_raw")
--end

ii.faders.event = function (e, value)
  print("faders.event")
  print(e.name)
  print(value)
end

ii.faders.get(14)
