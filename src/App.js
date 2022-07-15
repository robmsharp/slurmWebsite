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

function App() {

  const [wasm, setWasm] = useState();
  const [wasmByteMemoryArray, setWasmByteMemoryArray] = useState();
  const [loaded, setLoaded] = useState(false);
  const [downColor, setDownColor] = useState("primary");

  function canvasRender() {

    const myMemory = wasm.get_memory()

    setWasmByteMemoryArray(myMemory);

    //Put the image data on the buffer  
    wasm.get_some_image();

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

    if (loaded === true) { canvasRender(); draw_loop();}

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

    console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);

    if (event.key === "ArrowDown") {
    setDownColor("error");}
    if (loaded) {wasm.set_center(0,1); canvasRender(); wasm.passBin("myWord");}

  });

  document.addEventListener('keyup', function (event) {

    console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);

    if (event.key === "ArrowDown") {
    setDownColor("primary");
    
  }


  });

  function draw_loop() {

    if (loaded) {
      wasm.set_center(1, 0);
      canvasRender();
    }
    window.requestAnimationFrame(draw_loop);
  
  }

  return (
    <div className="App">
      <header className="App-header">
        {loaded === false && <p>Loading...</p>}
        <canvas id="canvas" height="200" width="320" />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" endIcon={<ArrowBackIcon />}>
            Left
          </Button>
          <Button variant="contained" endIcon={<ArrowForwardIcon />}>
            Right
          </Button>
          <Button variant="contained" duration="longest" color={downColor} endIcon={<ArrowDownwardIcon />}>
            Down
          </Button>
          <Button variant="contained" endIcon={<ArrowUpwardIcon />}>
            Up
          </Button>
          <Button variant="contained">
            Fire Z
          </Button>
        </Stack>

      </header>
    </div>
  );
}


export default App;
