import fs from "fs"

import esbuild from "esbuild"

const handleError = () => {
  console.log("An error occurred while building");
  process.exit(1);
};

const main = () => {
  // Copies supercollider startup file
  fs.copyFile("src/main/sclang_init.sc", "build/main/sclang_init.sc", (err) => {
    if (err) {
      console.log(err);
      handleError();
    }
  });

  // Copies serialport module bindings
  fs.copyFile("node_modules/serialport/node_modules/@serialport/bindings/build/Release/bindings.node", "build/main/bindings.node", (err) => {
    if (err) {
      console.log(err);
      handleError();
    }
  });

  // Builds the server-side app
  esbuild.buildSync({
    entryPoints: ["src/main.ts"],
    outfile: "build/main.js",
    tsconfig: "server.tsconfig.json",
    platform: "node",
    target: "node15",
    bundle: true,
    sourcemap: true,
  });
}

main();
