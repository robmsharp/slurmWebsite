import * as wasm from "./react_wasm_rust_library_bg.wasm";
export {get_memory, loadRom, loadBin, tryStart, emulateStep, keyUp, keyDown, can_draw, set_draw_false};

let cachegetUint8Memory = null;

let cachegetUint8Memory3 = null;

let cachegetUint8Memory4 = null;

function set_draw_false() {
  variableStart = false;
}

function can_draw() {
  return variableStart;
}

  function get_memory() {

	if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;

  };

let variableStart = false;

let rom = null;
let bin = null;
let romLoaded = false;
let binLoaded = false;

let myEmulator = null;

function emulateStep() {

    if (myEmulator) {

    wasm.wasmemulator_step_forward(myEmulator);
    
    }

}

function keyDown(keyCode) {

  //console.log("Sending keycode:");
  //console.log(keyCode);
  
  if (myEmulator) {

  wasm.wasmemulator_update_key(myEmulator, true, keyCode);

  }

}

function keyUp(keyCode) {

  if (myEmulator) {

  wasm.wasmemulator_update_key(myEmulator, false, keyCode);

  }

}

function tryStart() {

  //if (variableStart === false) {
  
    if ((romLoaded) && (binLoaded)) {
      variableStart = true;
      console.log(bin, rom);
      console.log(bin.length);
      console.log(rom.length);

      
      let binLength = 0;
      let romLength = 0;

      
      const binptr = wasm.__wbindgen_malloc(bin.length);
      cachegetUint8Memory3 = new Uint8Array(wasm.memory.buffer);
      cachegetUint8Memory3.set(bin, binptr);
      binLength = bin.length;

      const romptr = wasm.__wbindgen_malloc(rom.length);
      cachegetUint8Memory4 = new Uint8Array(wasm.memory.buffer);
      cachegetUint8Memory4.set(rom, romptr);
      romLength = rom.length;

      myEmulator = wasm.wasmemulator_new();

      wasm.wasmemulator_start_emulator(myEmulator, binptr, binLength, romptr, romLength);
      
      //To fast forward the red screen
      //wasm.wasmemulator_step_fast(myEmulator);
    }
} 
//}

function loadRom(input) {
  romLoaded = true;
  rom = input;
    
  }

  function loadBin(input) {
  binLoaded = true;
    bin = input;
      
    }

  wasm.__wbindgen_start();