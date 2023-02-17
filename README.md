Website for an emulator for Slurm16. Features two roms: pocman and blooodlust.

<img width="773" alt="screen6" src="https://user-images.githubusercontent.com/39394881/219535976-fd3343c5-a99b-40a8-b228-45d92eadc7f1.png">
![screen3](https://user-images.githubusercontent.com/39394881/219535993-2a17fb25-3c44-4bd5-b06a-c3a1d00e3edc.png)
![screen2](https://user-images.githubusercontent.com/39394881/219536003-93d90336-2162-4ffe-968b-7e9ac417e412.png)
![screen1](https://user-images.githubusercontent.com/39394881/219536006-88017dd6-44c6-43b6-af6b-4a2992a391e2.png)



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
