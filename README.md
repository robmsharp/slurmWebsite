Wasm build instructions:



cd /Users/robertsharp/Desktop/2022/react/react-canvas/slurmWebsite/external 

After:

cd external

wasm-pack build --out-dir pkg

append:

export * from "./interface.js";




Alternate:

wasm-pack build --out-dir web --target web
