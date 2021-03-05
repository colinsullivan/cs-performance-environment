--- two-way probabalistic clock divider
-- This takes a clock input and a -5 to +5 voltage.  Both 0 to +5V and 0 to -5V
-- represent 0% to 100% probability of clock outputs.  Positive and negative
-- voltage switches between two sets of clock dividers.
--
-- in1: clock input
-- in2: bi-polar probability
-- out1-4: divided outputs

-- when probability input is positive, the output clocks will be at these divisions
positiveDivs = {4, 8, 16, 32}
-- when probability input is negative, the output clocks will be at these divisions
negativeDivs = {3, 5, 7, 11}

-- private vars
negativeCount = {1,1,1,1}
positiveCount = {1,1,1,1}
numClockDividers = 4
function init()
    input[1].mode('change')
    input[2].mode('none')
    for n=1,numClockDividers do
        output[n].slew = 0.001
    end

end

function doDividerToss(dividerIndex, count, division, toss)
  if toss then
    output[dividerIndex].volts = count <= (division/2) and 5 or 0
  else
    output[dividerIndex].volts = 0
  end
  
end

input[1].change = function(s)
    -- chance operation
    chance = math.random()
    -- uses 4.8 to account for voltage input not going all the way to 5
    positiveToss = input[2].volts > chance*4.8
    negativeToss = input[2].volts < chance*-4.8

    for n=1,numClockDividers do
      -- divider count always happens to do the actual clock dividing
      -- This will be somewhat abrupt when switching from pos to neg
      positiveCount[n] = (positiveCount[n] % positiveDivs[n])+1
      negativeCount[n] = (negativeCount[n] % negativeDivs[n])+1

      if input[2].volts > 0 then
        doDividerToss(n, positiveCount[n], positiveDivs[n], positiveToss)
      else
        doDividerToss(n, negativeCount[n], negativeDivs[n], negativeToss)
      end

    end
end
