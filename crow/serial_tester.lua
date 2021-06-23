tempo = 120

function printTempo()
  print("Tempo: ")
  print(tempo)
end

function init()
  print("Starting up...")
  ii.pullup(false)

  metro[1].event = printTempo
  metro[1].time = 1
  metro[1]:start()
end
