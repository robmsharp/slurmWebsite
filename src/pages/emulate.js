

import React from 'react';

import { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CheckBoxOutlineBlank, ExitToApp } from '@mui/icons-material';
import Keyboard from '../components/keyboard';

import {db, storage} from '../firebaseConfig';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import loadingImage from '../icons/loadingSmall.png';
import icon_up1 from '../icons/up1.png';

import { Prompt } from 'react-router';

const Emulate = () => {

  const [wasm, setWasm] = useState();
  const [wasmByteMemoryArray, setWasmByteMemoryArray] = useState();
  const [loaded, setLoaded] = useState(false);
  const [romLoaded, setRomLoaded] = useState(false);
  const [downColor, setDownColor] = useState("primary");
  const [upColor, setUpColor] = useState("primary");
  const [leftColor, setLeftColor] = useState("primary");
  const [rightColor, setRightColor] = useState("primary");
  const [AColor, setAColor] = useState("primary");
  const [BColor, setBColor] = useState("primary");

  const canvasRef = React.useRef(null);

  function loadBootloader() {

    const bootRef = ref(storage, 'bin/bootloader.bin');

    getDownloadURL(bootRef)
    .then((url) => {
  

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      const reader = new FileReader();
        reader.onload = file => {
          console.log("here");
          const arrayBuf = file.target.result;
          const src = new Uint8Array(arrayBuf);
          
          
          wasm.loadBin(src);
          wasm.tryStart();
        }

          reader.readAsArrayBuffer(blob);
    };
    xhr.open('GET', url);
    xhr.send();}).catch((error) => {
      console.log("Could not download")
    
  });


}

  function loadRom() {

    //localStorage.setItem('rom', 'bloodlust')
    const rom = localStorage.getItem('rom');

    console.log("Rom loaded:");

    console.log(rom);

    const romRef = ref(storage, 'roms/'+rom+'.bin');

    getDownloadURL(romRef)
    .then((url) => {
  

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      const reader = new FileReader();
        reader.onload = file => {
          console.log("here");
          const arrayBuf = file.target.result;
          const src = new Uint8Array(arrayBuf);
          
          
          wasm.loadRom(src);
          wasm.tryStart();
        }

          reader.readAsArrayBuffer(blob);
    };
    xhr.open('GET', url);
    xhr.send();}).catch((error) => {
      console.log("Could not download")
    
  });


}


  function canvasRender() {

    const myMemory = wasm.get_memory()

    setWasmByteMemoryArray(myMemory);

    //Put the image data on the buffer  
    //wasm.get_some_image();
    wasm.emulateStep();

    // Get our canvas element from our index.html
    //const canvasElement = document.querySelector("canvas");

    const canvasElement = canvasRef.current;

    //This code attempts to remove error when you navigate away from the page
    if (canvasElement == null) {
      return;
    }
    
    // Set up Context and ImageData on the canvas
    const canvasContext = canvasElement.getContext("2d");
    const canvasImageData = canvasContext.createImageData(
      canvasElement.width,
      canvasElement.height
    );

    // Clear the canvas
    if (wasm.can_draw()) {
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
    }

  };

  //This is for updating canvas after loaded
  useEffect(() => {

    

    

    if (loaded === true) { draw_loop(); 
      
    }

    //loaded refers to wasm, romLoaded refers to rom and bootloader initiated downloading
    if ((loaded === true) && (romLoaded === false)) {

    loadRom();
    loadBootloader();
    setRomLoaded(true);
  }

  }, [loaded]);


  useEffect(() => {

    //Render image to canvas while loading
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var img = new Image();
    img.src = loadingImage;
    img.onload = function() {
      ctx.drawImage(img, 175, 150);
    }

    const loadWasm = async () => {

      const external = await import('external');

      setWasm(external);

      setLoaded(true);
    }

    loadWasm();

    console.log(wasm);

    console.log("loaded");

    //Unmount code
    return () => {
      document.removeEventListener('keydown', handleKeyPress); 
      document.removeEventListener('keyup', handleKeyRelease);
      setLoaded(false);
      //wasm.end_emulator();
    }  

  }, []);

  const handleKeyPress = (event) => {

    console.log("Emulator key pressed");

    event.preventDefault();

    if (loaded) {
    //console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);

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

  }
  
  const handleKeyRelease = (event) => {

    event.preventDefault();

    if (loaded) {

      //console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);
  
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

  }

  useEffect(()=> {

    //Has a key been pressed
    document.addEventListener('keydown', handleKeyPress);
  
    //Has a key been released
    document.addEventListener('keyup', handleKeyRelease);

    return () => {document.removeEventListener('keydown', handleKeyPress); 
    document.removeEventListener('keyup', handleKeyRelease);}
     
    }, [loaded]
    );

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
    <>
    
    <img id="loadingImage" src={loadingImage} hidden></img>
    <img id="icon_up1" src={icon_up1} hidden></img>
    <div className="App">
      <header className="App-header">
      
        {loaded === false && <p>Loading...</p>}
        <canvas ref={canvasRef} id="canvas" height="480" width="640" />
        <Keyboard/>
      </header>
    </div>
    </>
  );

};

export default Emulate;