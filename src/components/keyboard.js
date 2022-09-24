import React from "react"; 
import {List, ListItem, ListItemText, Modal, Box, Typography, TextField, Container, Card, Button} from '@mui/material/';

import {useState, useEffect} from 'react';
import icon_up1 from '../icons/up1.png';
import icon_up2 from '../icons/up2.png';

const Keyboard = () => {
    const [keys, setKeys] = useState([
        {code: "up", icon1: "icon_up1", icon2: "icon_up2", x: 50, y:25, keycode: 38, pressed: false}, 
        {code: "down", icon1: "icon_up1", icon2: "icon_up2", x: 50, y: 50, keycode: 40, pressed: false}, 
        {code: "left", icon1: "icon_up1", icon2: "icon_up2", x: 25, y: 50, keycode: 37, pressed: false}, 
        {code: "right", icon1: "icon_up1", icon2: "icon_up2", x: 75, y: 50, keycode: 39, pressed: false}, 
        {code: "a", icon1: "icon_up1", icon2: "icon_up2", x: 200, y: 50, keycode: 65, pressed: false}, 
        {code: "b", icon1: "icon_up1", icon2: "icon_up2", x: 225, y: 50, keycode: 66, pressed: false}]);

    const handleKeyPress = (event) => {
    
        event.preventDefault();
  
        //console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);

        const result = keys.map((item) => {
            if (item.keycode == event.keyCode) {
                return {...item, pressed: true};}
            else {
                return item;
            }    
        });

        setKeys(result);

    }

    const handleKeyRelease = (event) => {

        event.preventDefault();

        //console.log(`Key: ${event.key} with keycode ${event.keyCode} has been released`);

        const result = keys.map((item) => {
            if (item.keycode == event.keyCode) {
                return {...item, pressed: false};}
            else {
                return item;
            }    
        });

        setKeys(result);
        //console.log(result);
    
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
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.fillStyle = "blue";
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        

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
        <canvas id="myCanvas" width="400" height="200"></canvas>
        </>
    );

};

export default Keyboard;