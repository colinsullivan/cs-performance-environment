import SerialPort from "serialport";

const main = async () => {
  const serialports = await SerialPort.list();

  console.log("serialports");
  console.log(serialports);
};

main();
