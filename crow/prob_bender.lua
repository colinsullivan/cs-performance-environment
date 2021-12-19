tempo = 2

crowIDA = 'a'
crowIDB = 'b'

-- Defines which Crow is being deployed to
crowId = crowIDB


-- Defines the possible durations for the pitch benders
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

-- Calibration for all faders
faderActualMinVolts = 0.031
faderActualMaxVolts = 9.959

--
-- Class for tracking state of an individual fader
--
Fader = {}
function Fader:new()
  theFader = {
    faderValue = 0.0,
    faderNum = nil
  }
  setmetatable(theFader, self)
  self.__index = self
  return theFader
end
function Fader:faderChanged()
end
function Fader:update(e, value)
  if e.name == self.faderNum then
    if self.faderValue ~= value then
      self.faderValue = value
      self:faderChanged()
    end
  end
end
function Fader:getVolts()
  return self.faderValue
end
function Fader:getNormalizedValue()
  return (self.faderValue - faderActualMinVolts) / (faderActualMaxVolts - faderActualMinVolts)
end
function Fader:requestUpdate()
  ii.faders.get(self.faderNum)
end
function Fader:setup(inFaderNum)
  self.faderNum = inFaderNum
end

GlobalXposeFader = Fader:new()
function GlobalXposeFader:setOutputNum(inOutputNum)
  self.outputNum = inOutputNum
end
function GlobalXposeFader:setTransposeSemitones(inTransposeSemitones)
  self.transposeSemitones = inTransposeSemitones
end
function GlobalXposeFader:faderChanged()
  normalizedValue = self:getNormalizedValue()
  semitonesOut = self.transposeSemitones * normalizedValue
  voltsOut = semitonesOut / 12
  output[self.outputNum].volts = voltsOut
end

--
-- Class for managing a collection of faders
--
FaderManager = {}
function FaderManager:new()
  -- Instantiates faders
  probFader = Fader:new()
  durFader = Fader:new()
  globalXposeFaderOne = GlobalXposeFader:new()
  globalXposeFaderTwo = GlobalXposeFader:new()
  if crowId == crowIDA then
    durFader:setup(13)
    probFader:setup(14)

    globalXposeFaderOne:setup(9)
    globalXposeFaderOne:setOutputNum(3)
    globalXposeFaderOne:setTransposeSemitones(24)

    globalXposeFaderTwo:setup(10)
    globalXposeFaderTwo:setOutputNum(3)
    globalXposeFaderTwo:setTransposeSemitones(-24)

  elseif crowId == crowIDB then
    durFader:setup(15)
    probFader:setup(16)

    globalXposeFaderOne:setup(11)
    globalXposeFaderOne:setOutputNum(3)
    globalXposeFaderOne:setTransposeSemitones(7)

    globalXposeFaderTwo:setup(12)
    --globalXposeFaderTwo:setOutputNum
  end

  allFaders = {probFader, durFader, globalXposeFaderOne, globalXposeFaderTwo}
  numFaders = 4

  theFaderManager = {
    probFader = probFader,
    durFader = durFader,
    globalXposeFaderOne = globalXposeFaderOne,
    globalXposeFaderTwo, globalXposeFaderTwo,
    numFaders = numFaders,
    allFaders = allFaders
  }
  setmetatable(theFaderManager, self)
  self.__index = self
  return theFaderManager
end
function FaderManager:handleFaderEvent(e, value)
-- Sends update event to all faders when an incoming fader update event occurs
  for n = 1, numFaders do
    allFaders[n]:update(e, value)
  end
end
function FaderManager:requestFaderUpdates()
-- Requests an update for all faders
  for n = 1, numFaders do
    allFaders[n]:requestUpdate()
  end
end
function FaderManager:getProbFader()
  return self.probFader
end
function FaderManager:getDurFader()
  return self.durFader
end
function FaderManager:getGlobalXposeOne()
  return self.globalXposeFaderOne
end
function FaderManager:getGlobalXposeTwo()
  return self.globalXposeFaderTwo
end
function FaderManager:setup()
  
  -- Sends all incoming fader events to the fader manager
  ii.faders.event = function(e, value)
    self:handleFaderEvent(e, value)
  end

  -- Request fader updates repeatedly fast for all faders
  metro[1].time = 0.01
  metro[1].event = function() self:requestFaderUpdates() end
  metro[1]:start()
end

--
-- Class for a probabalistic pitch bend of a single voice
--
ProbabalisticBender = {}
function ProbabalisticBender:new(inputNum, faders)
  theProbabalisticBender = {
    inputNum = inputNum,
    faders = faders
  }
  setmetatable(theProbabalisticBender, self)
  self.__index = self
  return theProbabalisticBender
end
function ProbabalisticBender:doPitchBend()
  outputNumber = self.inputNum
  -- Decides on direction of bend
  chance = math.random()
  direction = "down"
  if chance > 0.5 then
    direction = "up"
  end

  -- calculates duration of bend
  durFader = self.faders:getDurFader()
  --dur = (durFader:getVolts() / 10.0) * 3.0
  faderValue = durFader:getNormalizedValue()
  inverseFaderValue = 1.0 - faderValue
  durBeats = durOptions[math.floor(inverseFaderValue * (numDurOptions - 1))]
  dur = durBeats * 1.0/tempo 

  -- starts pitchbend
  output[outputNumber].shape = 'logarithmic'
  if direction == "down" then
    -- starts one octave up
    output[outputNumber].slew = 0.0
    output[outputNumber].volts = 1.0

    -- bends one octave downward
    output[outputNumber].slew = dur
    output[outputNumber].volts = 0.0
  else
    -- starts one octave down
    output[outputNumber].slew = 0.0
    output[outputNumber].volts = -1.0

    -- bends up
    output[outputNumber].slew = dur
    output[outputNumber].volts = 0.0
  end
end
function ProbabalisticBender:handleNoteOn()
  -- decides to do pitchbend or not
  chance = math.random()
  probFader = self.faders:getProbFader()
  durFader = self.faders:getDurFader()
  toss = probFader:getVolts() > chance * 10.0
  if toss then
    self:doPitchBend()
  end
end
function ProbabalisticBender:setup()

  n = self.inputNum
  -- When input changes, call handleNoteOn
  input[n].change = function(s)
    self:handleNoteOn()
  end
  input[n].mode('change', .5, 0.0, 'rising')
end


function init()
  print("startup")

  -- Sweet Sixteen is doing the i2c pullup
  ii.pullup(false)
  
  -- Initializes all outputs to 0
  for n=1, 4 do
    output[n].volts = 0
  end
  
  -- Creates the fader manager
  faders = FaderManager:new()

  -- Creates the benders
  benders = {}
  for n = 1, 2 do
    benders[n] = ProbabalisticBender:new(n, faders)
    benders[n]:setup()
  end

  faders:setup()

  -- debugging
  --metro[2].time = 1
  --metro[2].event = function()
    --print(input[2].volts)
  --end
  --metro[2]:start()

end

