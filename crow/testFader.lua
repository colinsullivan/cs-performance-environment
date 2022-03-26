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

function update()
  testFader:requestUpdate()

  val = testFader:getNormalizedValue()
  print(val)
end

function init()
  testFader = Fader:new()
  testFader:setup(16)

  ii.faders.event = function(e, value)
    testFader:update(e, value);
  end

  metro[1].event = update
  metro[1].time = 0.1
  metro[1]:start()

end
