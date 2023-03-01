import React from "react";

import { useReducer, useState, useEffect } from 'react';

import Keyboard from './keyboard';


const KeyboardController = ({emulateKeyPress, emulateKeyRelease}) => {

  const TIMEOUT = 250;

  const keySignal = (keycode) => {

    console.log(keycode + "pressed");

  }

  //Reducer for field inputs



  const keyReducer = (state, action) => {

    if (action.type) {

      switch (action.type) {


        case 'KEYDOWN':

          if (state.hasInterval === false) {

            keySignal(action.val);

            const interval = setInterval(() => {

              keySignal(action.val);

            }, TIMEOUT);

            return { ...state, pressed: true, hasInterval: true, interval: interval };
          }
          return state;

        case 'KEYUP':
          if (state.hasInterval === true) {
            clearInterval(state.interval);
          }
          return { ...state, pressed: false, hasInterval: false, interval: null };
        default:
          return state;

      }
    }

  };

  const UPKEY = 38;
  const DOWNKEY = 40;
  const LEFTKEY = 37;
  const RIGHTKEY = 39;
  const AKEY = 65;
  const BKEY = 66;

  const OFFSET = -2;

  const UPKEYY1 = 15;
  const UPKEYY2 = UPKEYY1 + OFFSET;

  const DOWNKEYY1 = 50;
  const DOWNKEYY2 = DOWNKEYY1 + OFFSET

  const LEFTKEYY1 = 50;
  const LEFTKEYY2 = LEFTKEYY1 + OFFSET;

  const RIGHTKEYY1 = 50;
  const RIGHTKEYY2 = RIGHTKEYY1 + OFFSET;

  const AKEYY1 = 25;
  const AKEYY2 = AKEYY1 + OFFSET;

  const BKEYY1 = 50;
  const BKEYY2 = BKEYY1 + OFFSET;


  const [upKey, dispatchUpKey] = useReducer(keyReducer, {
    pressed: false,
    x: 250,

    hasInterval: false,
    interval: null,
    keycode: UPKEY,
    y1: UPKEYY1,
    y2: UPKEYY2
  });

  const [downKey, dispatchDownKey] = useReducer(keyReducer, {
    pressed: false,
    x: 250,

    hasInterval: false,
    interval: null,
    keycode: DOWNKEY,
    y1: DOWNKEYY1,
    y2: DOWNKEYY2
  });

  const [leftKey, dispatchLeftKey] = useReducer(keyReducer, {
    pressed: false,
    x: 205,

    hasInterval: false,
    interval: null,
    keycode: LEFTKEY,
    y1: LEFTKEYY1,
    y2: LEFTKEYY2
  });

  const [rightKey, dispatchRightKey] = useReducer(keyReducer, {
    pressed: false,
    x: 295,

    hasInterval: false,
    interval: null,
    keycode: RIGHTKEY,
    y1: RIGHTKEYY1,
    y2: RIGHTKEYY2
  });

  const [aKey, dispatchAKey] = useReducer(keyReducer, {
    pressed: false,
    x: 25,

    hasInterval: false,
    interval: null,
    keycode: AKEY,
    y1: AKEYY1,
    y2: AKEYY2
  });

  const [bKey, dispatchBKey] = useReducer(keyReducer, {
    pressed: false,
    x: 75,

    hasInterval: false,
    interval: null,
    keycode: BKEY,
    y1: BKEYY1,
    y2: BKEYY2
  });


  const reducerMap = {
    [UPKEY]: { dispatch: dispatchUpKey },
    [DOWNKEY]: { dispatch: dispatchDownKey },
    [LEFTKEY]: { dispatch: dispatchLeftKey },
    [RIGHTKEY]: { dispatch: dispatchRightKey },
    [AKEY]: { dispatch: dispatchAKey },
    [BKEY]: { dispatch: dispatchBKey },
  };

  

  const handleKeyPress = (event) => {

    const keycode = event.keyCode;

    event.preventDefault();



    if (keycode in reducerMap) {

      const { dispatch } = reducerMap[keycode];

      dispatch({ type: 'KEYDOWN', val: keycode });

    }

  }


  const handleMouseDown = (keycode) => {

    if (keycode in reducerMap) {

      const { dispatch } = reducerMap[keycode];

      dispatch({ type: 'KEYDOWN', val: keycode });

    }

  }

  const handleMouseUp = (keycode) => {

    if (keycode in reducerMap) {
      const { dispatch } = reducerMap[keycode];

      dispatch({ type: 'KEYUP' });
    }

  }


  const handleKeyRelease = (event) => {

    const keycode = event.keyCode;

    event.preventDefault();

    if (keycode in reducerMap) {
      const { dispatch } = reducerMap[keycode];

      dispatch({ type: 'KEYUP' });
    }

  }

  useEffect(() => {

    console.log("start");

    //Has a key been pressed
    document.addEventListener('keydown', handleKeyPress);

    //Has a key been released
    document.addEventListener('keyup', handleKeyRelease);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyRelease);

    }

  }, []
  );


  return (
    <>
      <Keyboard upKey={upKey} downKey={downKey} leftKey={leftKey} rightKey={rightKey} aKey={aKey} bKey={bKey} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} />
    </>
  );

}


export default KeyboardController;