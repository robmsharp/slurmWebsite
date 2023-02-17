Website for an emulator for Slurm16. Features two roms: pocman and blooodlust. Admin user is able to upload new games, view contact messages and customise the welcome screen information.

![screen1](https://user-images.githubusercontent.com/39394881/219536186-18a01ead-22a1-479d-8ee2-8e9a64b2db62.png)

<img width="773" alt="screen6" src="https://user-images.githubusercontent.com/39394881/219535976-fd3343c5-a99b-40a8-b228-45d92eadc7f1.png">

![screen2](https://user-images.githubusercontent.com/39394881/219536280-c0818b27-c690-469b-9a03-4f2cc4e9d8c4.png)

![screen3](https://user-images.githubusercontent.com/39394881/219536298-453ad6f6-69c8-4f66-8b13-544e2b0cebce.png)


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

https://slurm16-9621b.web.app
