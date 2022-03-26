public{crowId = 'B'}
public{tempo = 2.0}
public{legato = 1.0}
public{sustain = 1.0}

-- Defines the possible durations for the pitch benders
--durOptions = {
  --16,
  --8,
  --4,
  --2,
  --1,
  --3 / 4,
  --2 / 3,
  --1 / 2,
  --1 / 3,
  --1 / 4,
  --1 / 8,
  --1 / 16,
  --1 / 32,
  --1 / 64,
--};
--numDurOptions = 14

--
-- Class for tracking state of an individual fader
--
Fader = {}
function Fader:new()
  theFader = {
    faderValue = 0.0,
    faderNum = nil,

    -- When normalized value of fader is near these values, it will snap
    snapPoints = {0, 1.0},
    numSnapPoints = 2,

    -- Fader snap threshold in volts
    snapThreshold = 0.01
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
  raw = self.faderValue / 10.0

  -- For each snap point
  for i = 1, self.numSnapPoints do
    snapPoint = self.snapPoints[i]

    -- if within threshold of snap point
    dist = math.abs(raw - snapPoint)
    if dist < self.snapThreshold then

      -- snaps value
      return snapPoint
    end

  end

  return raw
end
function Fader:requestUpdate()
  if self.faderNum == nil then
    return
  end
  ii.faders.get(self.faderNum)
end
function Fader:setup(inFaderNum, inSnapPoints, inNumSnapPoints, inSnapThreshold)
  self.faderNum = inFaderNum

  if inSnapPoints and inNumSnapPoints then
    self.snapPoints = inSnapPoints
    self.numSnapPoints = inNumSnapPoints
  end

  if inSnapThreshold then
    self.snapThreshold = inSnapThreshold
  end
end

GXposeF = Fader:new()
function GXposeF:setOut(inOutputNum)
  self.outputNum = inOutputNum
end
function GXposeF:setXposeSt(inTransposeSemitones)
  self.transposeSemitones = inTransposeSemitones
end
function GXposeF:faderChanged()
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
  if public.crowId == "A" then
    gXposeFa:setup(9)
    gXposeFa:setOut(3)
    gXposeFa:setXposeSt(24)

    gXposeFb:setup(10)
    gXposeFb:setOut(3)
    gXposeFb:setXposeSt(-24)

    gXposeFc:setup(11)
    gXposeFc:setOut(3)
    gXposeFc:setXposeSt(7)
  end
  arcDurFader:setup(12)
  durF:setup(15)
  probF:setup(16)

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
  faderValue = durF:getNormalizedValue()
  inverseFaderValue = 1.0 - faderValue
  --durBeats = durOptions[math.floor(inverseFaderValue * (numDurOptions - 1))] * public.legato
  durBeats = public.sustain * faderValue
  -- tempo is in beats per second
  dur = durBeats / public.tempo

  -- starts pitchbend
  startVolts = nil
  endVolts = 0.0
  if direction == "down" then
    -- starts one octave up, bending one octave down
    startVolts = 1.0
  else
    -- starts one octave down, bending one octave up
    startVolts = -1.0
  end
  output[outputNumber].volts = startVolts
  gesture = {
    to(endVolts, dur, 'logarithmic')
  }
  output[outputNumber]( gesture )
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


--
-- Class for a random voltage generator
--
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
  numBenders = 1
  --if public.crowId == "A" then
    --numBenders = 1
  --elseif public.crowId == "B" then
    --numBenders = 1
  --end

  for n = 1, numBenders do
    benders[n] = ProbabalisticBender:new(n, faders)
  end
  
  -- Creates the random generators
  randomGenerators = {}
  numRandomGens = 0
  --if public.crowId == "A" then
    --numRandomGens = 1
    --randomGenerators[1] = RandomVoltageGenerator:new(2, 2, faders)
  --end

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
