public{tempo = 2}
public{crowId = 'c'}

-- Defines the possible durations for the pitch benders
durOptions = {
  16,
  8,
  4,
  2,
  1,
  3 / 4,
  2 / 3,
  1 / 2,
  1 / 3,
  1 / 4,
  1 / 8,
  1 / 16,
  1 / 32,
  --1 / 64,
};
numDurOptions = 13

--
-- Class for tracking state of an individual fader
--
Fader = {}
function Fader:new()
  theFader = {
    faderValue = 0.0,
    faderNum = nil,
    fMin = 0.031,
    fMax = 9.959
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
  return (self.faderValue - self.fMin) / (self.fMax - self.fMin)
end
function Fader:requestUpdate()
  if self.faderNum == nil then
    return
  end
  ii.faders.get(self.faderNum)
end
function Fader:setup(inFaderNum, fMin, fMax)
  self.faderNum = inFaderNum
  self.fMin = fMin
  self.fMax = fMax
end

GXposeF = Fader:new()
function GXposeF:setOut(inOutputNum)
  self.outputNum = inOutputNum
end
function GXposeF:setXposeSt(inTransposeSemitones)
  self.transposeSemitones = inTransposeSemitones
end
function GXposeF:faderChanged()
  -- TODO: Snap to zero
  normalizedValue = self:getNormalizedValue()
  semitonesOut = self.transposeSemitones * normalizedValue
  voltsOut = semitonesOut / 12
  output[self.outputNum].volts = voltsOut
end

--
-- Class for managing a collection of faders
--
FMan = {}
function FMan:new()
  -- Instantiates faders
  probF = Fader:new()
  durF = Fader:new()
  gXposeFa = GXposeF:new()
  gXposeFb = GXposeF:new()
  gXposeFc = GXposeF:new()
  arcDurFader = Fader:new()
  if public.crowId == crowIDA then
    gXposeFa:setup(9, 0.05188, 9.965)
    gXposeFa:setOut(3)
    gXposeFa:setXposeSt(24)

    gXposeFb:setup(10, 0.06897, 9.9816)
    gXposeFb:setOut(3)
    gXposeFb:setXposeSt(-24)

    gXposeFc:setup(11, 0.0, 9.940)
    gXposeFc:setOut(3)
    gXposeFc:setXposeSt(7)
  end
  arcDurFader:setup(12, 0.0, 9.922)
  durF:setup(15, 0.0396, 9.953)
  probF:setup(16, 0.0201, 9.957)

  allFaders = {probF, durF, gXposeFa, gXposeFb, gXposeFc, arcDurFader}
  numFaders = 6

  theFaderManager = {
    probF = probF,
    durF = durF,
    arcDurFader = arcDurFader,
    gXposeFa = gXposeFa,
    gXposeFb = gXposeFb,
    gXposeFc = gXposeFc,
    numFaders = numFaders,
    allFaders = allFaders
  }
  setmetatable(theFaderManager, self)
  self.__index = self
  return theFaderManager
end
function FMan:handleFaderEvent(e, value)
-- Sends update event to all faders when an incoming fader update event occurs
  for n = 1, numFaders do
    allFaders[n]:update(e, value)
  end
end
function FMan:requestFaderUpdates()
-- Requests an update for all faders
  for n = 1, numFaders do
    allFaders[n]:requestUpdate()
  end
end
function FMan:getProbFader()
  return self.probF
end
function FMan:getDurFader()
  return self.durF
end
function FMan:getArcDurFader()
  return self.arcDurFader
end
function FMan:setup()
  
  -- Sends all incoming fader events to the fader manager
  ii.faders.event = function(e, value)
    self:handleFaderEvent(e, value)
  end

  -- Request fader updates repeatedly fast for all faders
  metro[1].time = 0.1
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
  durF = self.faders:getDurFader()
  --dur = (durF:getVolts() / 10.0) * 3.0
  faderValue = durF:getNormalizedValue()
  inverseFaderValue = 1.0 - faderValue
  durBeats = durOptions[math.floor(inverseFaderValue * (numDurOptions - 1))]
  dur = durBeats * 1.0/public.tempo 

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
  probF = self.faders:getProbFader()
  durF = self.faders:getDurFader()
  toss = probF:getVolts() > chance * 10.0
  if toss then
    self:doPitchBend()
  end
end

RandomVoltageGenerator = {}
function RandomVoltageGenerator:new(inputNum, outputNum, faders)
  theRandomVoltageGenerator = {
    inputNum = inputNum,
    outputNum = outputNum,
    faders = faders
  }
  setmetatable(theRandomVoltageGenerator, self)
  self.__index = self
  return theRandomVoltageGenerator
end
function RandomVoltageGenerator:handleNoteOn()
  randVolts = math.random() * 10.0 - 5.0
  n = self.outputNum
  output[n].volts = randVolts
end

function init()
  -- Sweet Sixteen is doing the i2c pullup
  ii.pullup(false)
  
  -- Initializes all outputs to 0
  for n=1, 4 do
    output[n].volts = 0
  end
  
  -- Creates the fader manager
  faders = FMan:new()
  faders:setup()

  ---- Creates the benders
  benders = {}
  numBenders = 0
  if public.crowId == crowIDA then
    numBenders = 1
  elseif public.crowId == crowIDB then
    numBenders = 2
  end

  for n = 1, numBenders do
    benders[n] = ProbabalisticBender:new(n, faders)
  end
  
  -- Creates the random generators
  randomGenerators = {}
  numRandomGens = 0
  if public.crowId == crowIDA then
    numRandomGens = 1
    randomGenerators[1] = RandomVoltageGenerator:new(2, 2, faders)
  end

  for n = 1, 2 do
    input[n].mode('change', .5, 0.0, 'rising')
    input[n].change = function(s)
      for i = 1, numBenders do
        if benders[i].inputNum == n then
          benders[i]:handleNoteOn()
        end
      end

      for i = 1, numRandomGens do
        if randomGenerators[i].inputNum == n then
          randomGenerators[i]:handleNoteOn()
        end
      end
    end
  end
end
