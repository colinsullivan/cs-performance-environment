ArcGenerator = {}
function ArcGenerator:new(inputNum, outputNum, faders)
  theArcGenerator = {
    inputNum = inputNum,
    outputNum = outputNum,
    faders = faders
  }
  setmetatable(theArcGenerator, self)
  self.__index = self
  return theArcGenerator
end
function ArcGenerator:handleNoteOn()
  f = self.faders:getArcDurFader()
  -- https://www.wolframalpha.com/input/?i=x%5E3+x+from+0+to+1.5
  time = 3.0 * math.pow(1.2 * f:getNormalizedValue(), 3)
  o = self.outputNum
  output[o].volts = 0
  arc = {
    to( 5, time / 2.0 ),
    to( 0, time / 2.0 )
  }
  output[o](arc)
end

  -- Creates the arc generators
  arcGenerators = {}
  numArcs = 0
  if crowId == crowIDA then
    numArcs = 1
    arcGenerators[1] = ArcGenerator:new(2, 4, faders)
  elseif crowId == crowIDB then
    numArcs = 2
    arcGenerators[1] = ArcGenerator:new(1, 3, faders)
    arcGenerators[2] = ArcGenerator:new(2, 4, faders)
  end
      for i = 1, numArcs do
        if arcGenerators[i].inputNum == n then
          arcGenerators[i]:handleNoteOn()
        end
      end
