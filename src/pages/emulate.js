import React from 'react';

import { useState, useEffect, useRef } from "react";
import { Button, Popper, Fade, Typography } from '@mui/material/';

import KeyboardController from '../components/keyboardcontroller';

import { storage } from '../firebaseConfig';

import { ref, getDownloadURL } from "firebase/storage";

import loadingImage from '../icons/loadingSmall.png';

import {
  Box
} from '@mui/material/';


var upPress = false;
var upPressLast = false;
var downPress = false;
var downPressLast = false;
var leftPress = false;
var leftPressLast = false;
var rightPress = false;
var rightPressLast = false;
var aPress = false;
var aPressLast = false;
var bPress = false;
var bPressLast = false;

const Emulate = () => {

  const [wasm, setWasm] = useState();
  const [wasmByteMemoryArray, setWasmByteMemoryArray] = useState();
  const [loaded, setLoaded] = useState(false);
  const [romLoaded, setRomLoaded] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [tip, setTip] = useState("");
  const [open, setOpen] = useState(true);
  const divRef = React.useRef();

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
        xhr.send();
      }).catch((error) => {
        console.log("Could not download")

      });


  }

  function loadRom() {

    //Set the tip
    setTip(localStorage.getItem('tip'));

    //localStorage.setItem('rom', 'bloodlust')
    const rom = localStorage.getItem('rom');

    console.log("Rom loaded:");

    console.log(rom);

    const romRef = ref(storage, 'roms/' + rom + '.bin');

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
        xhr.send();
      }).catch((error) => {
        console.log("Could not download")

      });


  }


  

  function emulateKeys() {

    if (loaded) {

    if ((upPress) && (!upPressLast)) {
      wasm.keyDown(wasm.KeyEvent.UP);
    }

    if ((!upPress) && (upPressLast)) {
      wasm.keyUp(wasm.KeyEvent.UP);
    }
    //ie. update upPresslast to upPress, which can be true or false
    upPressLast=upPress;

    if ((downPress) && (!downPressLast)) {
      wasm.keyDown(wasm.KeyEvent.DOWN);
    }

    if ((!downPress) && (downPressLast)) {
      wasm.keyUp(wasm.KeyEvent.DOWN);
    }

    downPressLast=downPress;

    if ((leftPress) && (!leftPressLast)) {
      wasm.keyDown(wasm.KeyEvent.LEFT);
    }
    
    if ((!leftPress) && (leftPressLast)) {
      wasm.keyUp(wasm.KeyEvent.LEFT);
    }
    
    leftPressLast=leftPress;
    
    if ((rightPress) && (!rightPressLast)) {
      wasm.keyDown(wasm.KeyEvent.RIGHT);
    }
    
    if ((!rightPress) && (rightPressLast)) {
      wasm.keyUp(wasm.KeyEvent.RIGHT);
    }
    
    rightPressLast=rightPress;
    
    if ((aPress) && (!aPressLast)) {
      wasm.keyDown(wasm.KeyEvent.A);
    }
    
    if ((!aPress) && (aPressLast)) {
      wasm.keyUp(wasm.KeyEvent.A);
    }
    
    aPressLast=aPress;
    
    if ((bPress) && (!bPressLast)) {
      wasm.keyDown(wasm.KeyEvent.B);
    }
    
    if ((!bPress) && (bPressLast)) {
      wasm.keyUp(wasm.KeyEvent.B);
    }
    
    bPressLast=bPress;
  }
    

  }

  function canvasRender() {

    const myMemory = wasm.get_memory()

    setWasmByteMemoryArray(myMemory);


    //set the keys that have been pressed
    emulateKeys();

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

    if (loaded === true) {
      draw_loop();

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
    img.onload = function () {
      ctx.drawImage(img, 175, 150);
    }

    const loadWasm = async () => {

      const myexternal = await import('external');

      setWasm(myexternal);

      setLoaded(true);
    }

    loadWasm();

    console.log(wasm);

    console.log("Start useEffect run");

    //Unmount code
    return () => {

      setLoaded(false);
      window.location.reload();

    }

  }, []);


  
  



function draw_loop() {

  const canvasElement = canvasRef.current;

  //This code attempts to remove update until new rom is loaded
  if (canvasElement == null) {
    return;
  }

  if (loaded) {

    canvasRender();

  }



  window.requestAnimationFrame(draw_loop);

}


useEffect(() => {
  setAnchorEl(divRef.current);
}, []);
const handleClose = () => {
  setAnchorEl(null);
};

const handleClick = () => {
  setOpen(false);
};

const UPKEY = 38;
  const DOWNKEY = 40;
  const LEFTKEY = 37;
  const RIGHTKEY = 39;
  const AKEY = 65;
  const BKEY = 66;

const emulateKeyRelease = (keycode) => {

  if (loaded) {

    switch (keycode) {

      case DOWNKEY:
        downPress = false;
        break;
      case UPKEY:
        upPress=false;
        break;

      case LEFTKEY:
        leftPress=false;
        break;

      case RIGHTKEY:
        rightPress = false;
        break;

      case AKEY:
        aPress = false;
        break;

      case BKEY:
        bPress = false;
        break;

      default:
        break;
    }
  }

}

const emulateKeyPress = (keycode) => {

  console.log("press");


  if (loaded) {

    switch (keycode) {

      case DOWNKEY:
        downPress = true;
        break;
      case UPKEY:
        upPress=true;
        break;

      case LEFTKEY:
        leftPress=true;
        break;

      case RIGHTKEY:
        rightPress = true;
        break;

      case AKEY:
        aPress = true;
        break;

      case BKEY:
        bPress = true;
        break;

      default:
        break;
    }
  }

}


return (
  <>

    <img id="loadingImage" src={loadingImage} hidden></img>

    <div className="App">
      <header className="App-header">

        {loaded === false && <p>Loading...</p>}
        
        <Box 
          sx={{ border: 3 }}>
          <canvas ref={canvasRef} id="canvas" height="480" width="640" />
          
           </Box>
           <Box ref={divRef}>
           <KeyboardController emulateKeyPress={emulateKeyPress} emulateKeyRelease={emulateKeyRelease} />
           </Box>

        {tip && <Popper

          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClick}



          transition

        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                <Typography variant="body1">
                  {tip}
                </Typography>
                <Button onClick={handleClick}>Got it!</Button>
              </Box>
            </Fade>
          )}

        </Popper>}

        
        </header>
    </div>
  </>
);

};

export default Emulate;