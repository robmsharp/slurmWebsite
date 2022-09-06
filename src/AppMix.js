import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import Welcome from './pages/welcome';
import Games from './pages/games';
import MainHeader from './components/mainheader';
import ChooseGameType from './pages/chooseGameType';
import Desktop from './pages/desktop';
import Contact from './pages/contact';
import Emulate from './pages/emulate';

function App() {

  const [wasm, setWasm] = useState();
  const [wasmByteMemoryArray, setWasmByteMemoryArray] = useState();
  const [loaded, setLoaded] = useState(false);
  const [downColor, setDownColor] = useState("primary");
  const [upColor, setUpColor] = useState("primary");
  const [leftColor, setLeftColor] = useState("primary");
  const [rightColor, setRightColor] = useState("primary");
  const [AColor, setAColor] = useState("primary");
  const [BColor, setBColor] = useState("primary");

  function canvasRender() {

    const myMemory = wasm.get_memory()

    setWasmByteMemoryArray(myMemory);

    //Put the image data on the buffer  
    //wasm.get_some_image();
    wasm.emulateStep();

    // Get our canvas element from our index.html
    const canvasElement = document.querySelector("canvas");

    // Set up Context and ImageData on the canvas
    const canvasContext = canvasElement.getContext("2d");
    const canvasImageData = canvasContext.createImageData(
      canvasElement.width,
      canvasElement.height
    );

    // Clear the canvas
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

    const outputPointer = wasm.get_output_buffer_pointer();
    
    const imageDataArray = myMemory.slice(
      outputPointer,
      outputPointer + canvasElement.width * canvasElement.height * 4
    );
    

    // Set the values to the canvas image data
    canvasImageData.data.set(imageDataArray);

    // Place the new generated checkerboard onto the canvas
    canvasContext.putImageData(canvasImageData, 0, 0);

  };

  //This is for updating canvas after loaded
  useEffect(() => {

    if (loaded === true) { draw_loop(); 
      
    }

  }, [loaded]);


  useEffect(() => {

    const loadWasm = async () => {

      const external = await import('external');

      setWasm(external);

      setLoaded(true);
    }

    loadWasm();

    console.log(wasm);

    console.log("loaded");

  }, []);

  document.addEventListener('keydown', function (event) {

    if (loaded) {
    console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);

    if (event.key === "ArrowDown") {
    setDownColor("error");
    wasm.keyDown(wasm.KeyEvent.DOWN);
  }

  if (event.key === "ArrowUp") {
    setUpColor("error");
    wasm.keyDown(wasm.KeyEvent.UP);
  }

  if (event.key === "ArrowLeft") {
    setLeftColor("error");
    wasm.keyDown(wasm.KeyEvent.LEFT);
  }

  if (event.key === "ArrowRight") {
    setRightColor("error");
    wasm.keyDown(wasm.KeyEvent.RIGHT);
  }

  if (event.key === "a") {
    setAColor("error");
    wasm.keyDown(wasm.KeyEvent.A);
  }

  if (event.key === "b") {
    setBColor("error");
    wasm.keyDown(wasm.KeyEvent.B);
  }
}  
  });

  document.addEventListener('keyup', function (event) {

    if (loaded) {

    console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);

    if (event.key === "ArrowDown") {
    setDownColor("primary");
    wasm.keyUp(wasm.KeyEvent.DOWN);
    
  }

  if (event.key === "ArrowUp") {
    setUpColor("primary");
    wasm.keyUp(wasm.KeyEvent.UP);
  }

  if (event.key === "ArrowLeft") {
    setLeftColor("primary");
    wasm.keyUp(wasm.KeyEvent.LEFT);
  }

  if (event.key === "ArrowRight") {
    setRightColor("primary");
    wasm.keyUp(wasm.KeyEvent.RIGHT);
  }

  if (event.key === "a") {
    setAColor("primary");
    wasm.keyUp(wasm.KeyEvent.A);
  }

  if (event.key === "b") {
    setBColor("primary");
    wasm.keyUp(wasm.KeyEvent.B);
  }

}
  });

  function draw_loop() {

    if (loaded) {
      
      canvasRender();

    }
    window.requestAnimationFrame(draw_loop);
  
  }

  const selectRom = (event) => {
    
    const file = event.target.files[0];
    console.log(file);

    const reader = new FileReader();
        reader.onload = file => {
          console.log("here");
          const arrayBuf = file.target.result;
          const src = new Uint8Array(arrayBuf);
          
          
          wasm.loadRom(src);
          wasm.tryStart();
        }

          reader.readAsArrayBuffer(file);  
  }

  const selectBin = (event) => {
    
    const file = event.target.files[0];
    console.log(file);

    const reader = new FileReader();
        reader.onload = file => {
          console.log("here");
          const arrayBuf = file.target.result;
          const src = new Uint8Array(arrayBuf);
          
          wasm.loadBin(src);
          wasm.tryStart();
        }

          reader.readAsArrayBuffer(file);  
  }

  return (
    <div className="App">
      <header className="App-header">
        {loaded === false && <p>Loading...</p>}
        <Welcome></Welcome>
        <Games></Games>
        <canvas id="canvas" height="480" width="640" />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color={leftColor} endIcon={<ArrowBackIcon />}>
            Left
          </Button>
          <Button variant="contained" color={rightColor} endIcon={<ArrowForwardIcon />}>
            Right
          </Button>
          <Button variant="contained" color={downColor} endIcon={<ArrowDownwardIcon />}>
            Down
          </Button>
          <Button variant="contained" color={upColor} endIcon={<ArrowUpwardIcon />}>
            Up
          </Button>
          <Button variant="contained" color={AColor}>
            A
          </Button>
          <Button variant="contained" color={BColor}>
            B
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
        <Button variant="contained" component="label">
        Select Bootloader
        <input id="bininput" hidden accept="file_extension, .bin" multiple type="file" onChange={selectBin}/>
      </Button>

      <Button variant="contained" component="label">
        Select Game
        <input id="rominput" hidden accept="file_extension, .bin" multiple type="file" onChange={selectRom}/>
      </Button>
      </Stack>

      </header>
    </div>
  );
}


export default App;
