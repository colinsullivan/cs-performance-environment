import fs from "fs-extra";

import esbuild from "esbuild";

const main = async () => {
  // Copies supercollider startup file
  await fs.copy(
    "src/main/sclang_init.sc",
    "build/main/sclang_init.sc",
  );

  // Copies serialport module bindings
  await fs.copy(
    "node_modules/serialport/node_modules/@serialport/bindings/build/Release/bindings.node",
    "build/bindings.node",
  );

  // Copies supercollider-js quark
  await fs.copy(
    "node_modules/@supercollider/lang/lib/supercollider-js",
    "build/supercollider-js",
  );

  const serverOptionsCommon: esbuild.BuildOptions = {
    tsconfig: "server.tsconfig.json",
    platform: "node",
    target: "node16",
    bundle: true,
    sourcemap: true,
  };

  // Builds the server-side app
  esbuild.buildSync({
    ...serverOptionsCommon,
    entryPoints: ["src/main.ts"],
    outfile: "build/main.js",
  });

  // Builds the max app
  esbuild.buildSync({
    ...serverOptionsCommon,
    entryPoints: ["src/main_max.ts"],
    outfile: "build/main_max.js",
    external: ["max-api"]
  })
};

main();
