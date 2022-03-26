import SerialPort from "serialport";

console.log("Hello");

const main = () => {
  const crowPort = new SerialPort("/dev/tty.usbmodem346F367835381");
  const readlineParser = new SerialPort.parsers.Readline({
    delimiter: "\n"
  });
  crowPort.pipe(readlineParser);

  readlineParser.on("data", (d) => {
    const crowCommandParser = /^\^\^(\w+)\((.*)\)$/;
    const crowCommandMatch = d.match(crowCommandParser);

    if (!crowCommandMatch) {
      console.log(`Received unknown message: '${d}'`);
      return;
    }

    const crowCommandName = crowCommandMatch[1];
    const crowCommandArgs = crowCommandMatch[2].split(",");

    switch (crowCommandName) {
      case 'pupdate':
        const updatedVariableName = crowCommandArgs[0];
        const updatedVariableValue = crowCommandArgs[1];
        console.log("updatedVariableName");
        console.log(updatedVariableName);
        console.log("updatedVariableValue");
        console.log(updatedVariableValue);
        break;

      case 'identity':
        const id = crowCommandArgs[0];
        console.log("id");
        console.log(id);
        break;
      
      default:
        console.log(`unknown crow command: ${d}`);
        break;
    }
  });

  //crowPort.write("public.tempo = 4\n");
  crowPort.write("^^init()");
};

main();
