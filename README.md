Website for an emulator for Slurm16. Features two roms: pocman and blooodlust.

Uses firebase to store roms, screenshots and game information.

Emulator and roms created by James Sharp. Website created by Robert Sharp.

Dependencies:

React, MUI, webassembly

To install:

npm install -force

To run:

npm run start

Wasm build instructions:

cd external

wasm-pack build --out-dir pkg

Then edit the file 'pkg/react_wasm_rust_libary.js' to append:

export * from "./interface.js";

Deployed version:

(to do)