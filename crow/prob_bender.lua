function init()
  -- Sweet Sixteen is doing the i2c pullup
  ii.pullup(false)

  -- Initializes all outputs to 0
  for n=1, 4 do
    output[n].volts = 0
  end

  -- Detects noteons
  for n=1, 2 do
    input[n].mode('change', 0.1, 0.0, 'rising')
  end
end

-- Class for tracking state of an individual fader
Fader = {}
Fader.__index = Fader
function Fader:new(inFaderNum)
  theFader = {
    faderValue = 0.0,
    faderNum = inFaderNum
  }
  setmetatable(theFader, Fader)
  return theFader
end
function Fader:update(e, value)
  if e.name == self.faderNum then
    self.faderValue = value
  end
end
function Fader:getVolts()
  return self.faderValue
end
function Fader:requestUpdate()
  ii.faders.get(self.faderNum)
end


-- Instantiates faders
probFader = Fader:new(16)
--durFader = Fader:new(15)
durFader = Fader:new(14)

allFaders = {probFader, durFader}
numFaders = 2

-- Updates all faders when an incoming fader update event occurs
ii.faders.event = function(e, value)
  for n = 1, numFaders do
    allFaders[n]:update(e, value)
  end
end

function requestFaderUpdates()
  for n = 1, numFaders do
    allFaders[n]:requestUpdate()
  end
end


function doPitchBend(durFader, outputNumber)
  -- Decides on direction of bend
  chance = math.random()
  direction = "down"
  if chance > 0.5 then
    direction = "up"
  end

  -- starts pitchbend
  dur = (durFader:getVolts() / 10.0) * 3.0

  if direction == "down" then
    -- starts one octave up
    output[outputNumber].slew = 0.0
    output[outputNumber].volts = 1.0

    -- bends one octave downward
    output[outputNumber].shape = 'logarithmic'
    output[outputNumber].slew = dur
    output[outputNumber].volts = 0.0

  else
    -- starts one octave down
    output[outputNumber].slew = 0.0
    output[outputNumber].volts = -1.0

    -- bends up
    output[outputNumber].shape = 'logarithmic'
    output[outputNumber].slew = dur
    output[outputNumber].volts = 0.0
  end

end

function handleNoteOn(inputNum, durFader)
  requestFaderUpdates()

  -- decides to do pitchbend or not
  chance = math.random()
  toss = probFader:getVolts() > chance * 10.0
  if toss then
    doPitchBend(durFader, inputNum)
  end
end

-- Detects noteons and update value of faders
input[1].change = function(s)
  handleNoteOn(1, durFader)
end
input[2].change = function(s)
  handleNoteOn(2, durFader)
end

ii.faders.get(probFaderNumber)
