import React from "react"; 
import {List, ListItem, ListItemText, Modal, Box, Typography, TextField, Container, Card, Button} from '@mui/material/';

import {useState, useEffect} from 'react';
import icon_up1 from '../icons/squareupkey1.png';
import icon_up2 from '../icons/squareupkey2.png';

import icon_down1 from '../icons/squaredownkey1.png';
import icon_down2 from '../icons/squaredownkey2.png';

import icon_left1 from '../icons/squareleftkey1.png';
import icon_left2 from '../icons/squareleftkey2.png';

import icon_right1 from '../icons/squarerightkey1.png';
import icon_right2 from '../icons/squarerightkey2.png';

import icon_a1 from '../icons/akey1.png';
import icon_a2 from '../icons/akey2.png';

import icon_b1 from '../icons/bkey1.png';
import icon_b2 from '../icons/bkey2.png';

const Keyboard = () => {
    const [keys, setKeys] = useState([
        {code: "up", icon1: "icon_up1", icon2: "icon_up2", x: 250, y:15, keycode: 38, pressed: false}, 
        {code: "down", icon1: "icon_down1", icon2: "icon_down2", x: 250, y: 50, keycode: 40, pressed: false}, 
        {code: "left", icon1: "icon_left1", icon2: "icon_left2", x: 205, y: 50, keycode: 37, pressed: false}, 
        {code: "right", icon1: "icon_right1", icon2: "icon_right2", x: 295, y: 50, keycode: 39, pressed: false}, 
        {code: "a", icon1: "icon_a1", icon2: "icon_a2", x: 25, y: 25, keycode: 65, pressed: false}, 
        {code: "b", icon1: "icon_b1", icon2: "icon_b2", x: 75, y: 50, keycode: 66, pressed: false}]);

    const handleKeyPress = (event) => {
    
        event.preventDefault();

        setKeys((prevresult)=>prevresult.map((item) => {
            if (item.keycode == event.keyCode) {
                return {...item, pressed: true};}
            else {
                return item;
            }    
        }));

    }

    const handleKeyRelease = (event) => {

        event.preventDefault();

        setKeys((prevresult)=>prevresult.map((item) => {
            if (item.keycode == event.keyCode) {
                return {...item, pressed: false};}
            else {
                return item;
            }    
        }));

        
    
    }
    
    useEffect(()=> {

    //Has a key been pressed
    document.addEventListener('keydown', handleKeyPress);
  
    //Has a key been released
    document.addEventListener('keyup', handleKeyRelease);
      
    return () => {document.removeEventListener('keydown', handleKeyPress); 
    document.removeEventListener('keyup', handleKeyRelease);}

    }, [keys]
    );

    useEffect(()=> {

        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");

        keys.map((item) => {
            const icon1 = document.getElementById(item.icon1);
            const icon2 = document.getElementById(item.icon2);

            if (item.pressed==true) {
                ctx.drawImage(icon2, item.x, item.y);
            }
            else {
                ctx.drawImage(icon1, item.x, item.y);
            }});       
    
        }, [keys]
        );

    return (
        <>
        <img id="icon_up1" src={icon_up1} hidden></img>
        <img id="icon_up2" src={icon_up2} hidden></img>
        <img id="icon_down1" src={icon_down1} hidden></img>
        <img id="icon_down2" src={icon_down2} hidden></img>
        <img id="icon_left1" src={icon_left1} hidden></img>
        <img id="icon_left2" src={icon_left2} hidden></img>
        <img id="icon_right1" src={icon_right1} hidden></img>
        <img id="icon_right2" src={icon_right2} hidden></img>
        <img id="icon_a1" src={icon_a1} hidden></img>
        <img id="icon_a2" src={icon_a2} hidden></img>
        <img id="icon_b1" src={icon_b1} hidden></img>
        <img id="icon_b2" src={icon_b2} hidden></img>
        <canvas id="myCanvas" width="400" height="200"></canvas>
        </>
    );

};

export default Keyboard;