tempo = 2

crowIDA = 'a'
crowIDB = 'b'

-- Defines which Crow is being deployed to
crowId = crowIDB

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
probFader = nil
durFader = nil
if crowId == crowIDA then
  probFader = Fader:new(14)
  durFader = Fader:new(13)
elseif crowId == crowIDB then
  probFader = Fader:new(16)
  durFader = Fader:new(15)
end

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

durOptions = {
  8,
  4,
  2,
  1.5,
  1,
  3 / 4,
  1 / 2,
  2 / 3,
  1 / 3,
  1 / 4,
  1 / 8,
  1 / 16,
  1 / 32,
};
numDurOptions = 14

function doPitchBend(durFader, outputNumber)
  -- Decides on direction of bend
  chance = math.random()
  direction = "down"
  if chance > 0.5 then
    direction = "up"
  end

  -- calculates duration of bend
  --dur = (durFader:getVolts() / 10.0) * 3.0
  faderValue = (durFader:getVolts() / 10.0)
  inverseFaderValue = 1.0 - faderValue
  durBeats = durOptions[math.floor(inverseFaderValue * (numDurOptions - 1))]
  dur = durBeats * 1.0/tempo 

  -- starts pitchbend
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
