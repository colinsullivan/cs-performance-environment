-- Synkopater Bender
public{crowId = 'B'}
public{tempo = 2.0}
public{sustainSynkA = 1.0}
public{sustainSynkB = 1.0}

-- Defines the possible durations for the fixed pitch benders
durOptions = {
  -- 1
  16,
  -- 2
  8,
  -- 3
  4,
  -- 4
  2,
  -- 5
  1,
  -- 6
  3 / 4,
  -- 7
  2 / 3,
  -- 8
  1 / 2,
  -- 9
  1 / 3,
  -- 10
  1 / 4,
  -- 11
  1 / 8,
  -- 12
  1 / 16,
  -- 13
  1 / 32,
  -- 14
  1 / 64,
};
numDurOptions = 14

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
    snapThreshold = 0.08
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
function GXposeF:setXposeSt(inTransposeSemitonesDown, inTransposeSemitonesUp)
  self.transposeSemitonesDown = inTransposeSemitonesDown
  self.transposeSemitonesUp = inTransposeSemitonesUp
end
function GXposeF:faderChanged()
  range = self.transposeSemitonesUp - self.transposeSemitonesDown
  normalizedValue = self:getNormalizedValue()
  semitonesOut = range * normalizedValue + self.transposeSemitonesDown
  voltsOut = semitonesOut / 12
  output[self.outputNum].volts = voltsOut
end

--
-- Class for managing a collection of faders
--
FMan = {}
function FMan:new()
  -- Instantiates faders
  bendAmtF = Fader:new()
  bendAmtF:setup(12)

  v1DurF = Fader:new()
  v1DurF:setup(15)
  v1ProbF = Fader:new()
  v1ProbF:setup(16)

  synkDurF = Fader:new()
  synkDurF:setup(13)
  synkProbF = Fader:new()
  synkProbF:setup(14)

  gXposeF = GXposeF:new()
  if public.crowId == "B" then
    gXposeF:setup(9, {0, 0.5, 1.0}, 3)
    gXposeF:setOut(3)
    gXposeF:setXposeSt(-24, 24)
  end


  allFaders = {bendAmtF, synkProbF, synkDurF, gXposeF, v1ProbF, v1DurF}
  numFaders = 6

  theFaderManager = {
    bendAmtF = bendAmtF,
    synkProbF = synkProbF,
    synkDurF = synkDurF,
    gXposeF = gXposeF,
    v1DurF = v1DurF,
    v1ProbF = v1ProbF,
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
function FMan:getBendAmtFader()
  return self.bendAmtF
end
function FMan:getSynkProbFader()
  return self.synkProbF
end
function FMan:getSynkDurFader()
  return self.synkDurF
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
-- Class for a probabalistic pitch bend & modulation sweep of a single voice
--
ProbBender = {}
function ProbBender:new(inputNum, outputNum, durF, probF, bendAmtF)
  theProbBender = {
    inputNum = inputNum,
    outputNum = outputNum,
    modOutputNum = outputNum + 1,
    durF = durF,
    probF = probF,
    bendAmtF = bendAmtF,
  }
  setmetatable(theProbBender, self)
  self.__index = self
  return theProbBender
end

function ProbBender:getBendDur()
  -- calculates duration of bend
  durBeats = 0
  durF = self.durF
  faderValue = durF:getNormalizedValue()
  inverseFaderValue = 1.0 - faderValue

  -- Crow A does bends synchronized to the sustain value
  -- of the either synkopater sequencer
  if public.crowId == "A" then
    if self.inputNum == 1 then
      -- Don't understand the 0.5 here but it is working
      durBeats = public.sustainSynkA * 0.5*faderValue
    else
      durBeats = public.sustainSynkB * 0.5*faderValue
    end
  elseif public.crowId == "B" then
    -- Crow B does bends based on the lookup table above
    durBeats = durOptions[
      1 + math.ceil(
        inverseFaderValue * (numDurOptions - 1)
      )
    ]
  end
  -- tempo is in beats per second
  return durBeats / public.tempo
end

function ProbBender:doPitchBend()
  outputNumber = self.outputNum
  modOutputNum = self.modOutputNum
  -- Decides on direction of bend
  chance = math.random()
  direction = "down"
  if chance > 0.5 then
    direction = "up"
  end

  dur = self:getBendDur()

  -- starts pitchbend
  bendAmtValue = self.bendAmtF:getNormalizedValue()

  modStartVolts = 5
  modEndVolts = 0

  -- starts N octaves up, bending N octaves down
  bendStartVolts = math.floor(1.0 + bendAmtValue * 3)
  bendEndVolts = 0.0

  if direction == "up" then
    -- starts N octaves down, bending N octaves up
    bendStartVolts = -1.0 * bendStartVolts
    modStartVolts = -1.0 * modStartVolts
  end

  output[outputNumber].volts = bendStartVolts
  output[outputNumber]({
    to(bendEndVolts, dur, 'linear')
  })

  output[modOutputNum].volts = modStartVolts
  output[modOutputNum]({
    to(modEndVolts, dur, 'logarithmic')
  })

end

function ProbBender:handleNoteOn()
  -- decides to do pitchbend or not
  chance = math.random()
  probF = self.probF
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
  numBenders = 0
  if public.crowId == "A" then
    numBenders = 2
    benders[1] = ProbBender:new(1, 1, faders:getSynkDurFader(), faders:getSynkProbFader(), faders:getBendAmtFader())
    benders[2] = ProbBender:new(2, 1, faders:getSynkDurFader(), faders:getSynkProbFader(), faders:getBendAmtFader())
  elseif public.crowId == "B" then
    numBenders = 1
    benders[1] = ProbBender:new(1, 1, faders.v1DurF, faders.v1ProbF, faders:getBendAmtFader())
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
