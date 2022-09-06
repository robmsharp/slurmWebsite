import React from "react"; 
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Welcome from './pages/welcome';
import Games from './pages/games';
import MainHeader from './components/mainheader';
import ChooseGameType from './pages/chooseGameType';
import Desktop from './pages/desktop';
import Contact from './pages/contact';
import Emulate from './pages/emulate';
import db from './firebaseConfig';
import {useState, useEffect} from 'react';
import icon_up1 from './icons/up1.png';
import icon_up2 from './icons/up2.png';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { collection, query, where, getDocs } from "firebase/firestore";
import Footer from './components/footer.js';

import Arcade from './fonts/ARCADE.TTF';

import {Box
} from '@mui/material/';


const myTheme = createTheme({
  typography: {fontFamily: 'Orbitron'},
  palette: {
    mode: 'dark',
    primary: {
      main: '#0f790f',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#141414',
      paper: '#263469',
    },
  },
  
});

function App() {
  
  const [loading, setLoading] = useState(false);

  const [up, setUp] = useState(false);

  document.addEventListener('keydown', function (event) {

    
    //console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);

    

  if (event.key === "ArrowUp") {
    setUp(true);
    
  }


  });

  document.addEventListener('keyup', function (event) {

    
    //console.log(`Key: ${event.key} with keycode ${event.keyCode} has been released`);

    if (event.key === "ArrowUp") {
    setUp(false);
    
  }
});

  useEffect(()=> {

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let up1 = document.getElementById("icon_up1");
    let up2 = document.getElementById("icon_up2");
    if (up) {
      ctx.drawImage(up2, 50, 50);}
      else {
    ctx.drawImage(up1, 50, 50);}
  }, [up]
  );

  return (
    <>
    <ThemeProvider theme={myTheme} >
    <CssBaseline enableColorScheme />
    <Box sx={{minHeight: 800}}>
    <img id="icon_up1" src={icon_up1} hidden></img>
    <img id="icon_up2" src={icon_up2} hidden></img>
      <canvas id="myCanvas" width="200" height="200" hidden></canvas>

      <MainHeader/>
      <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/games" component={Games} />
          <Route path="/choosegametype" component={ChooseGameType} />
          <Route path="/desktop" component={Desktop} />
          <Route path="/contact" component={Contact} />
          <Route path="/emulate" component={Emulate} />
        </Switch>
    
    
    
    </Box>
    <Footer/>
    </ThemeProvider>
    </>
  );
}

export default App;
