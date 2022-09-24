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
import Keyboard from './pages/keyboard';
import db from './firebaseConfig';

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
  
  
 

  return (
    <>
    <ThemeProvider theme={myTheme} >
    <CssBaseline enableColorScheme />
    <Box sx={{minHeight: 800}}>
    

      <MainHeader/>
      <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/games" component={Games} />
          <Route path="/choosegametype" component={ChooseGameType} />
          <Route path="/desktop" component={Desktop} />
          <Route path="/contact" component={Contact} />
          <Route path="/emulate" component={Emulate} />
          <Route path="/keyboard" component={Keyboard} />
        </Switch>
    
    
    
    </Box>
    <Footer/>
    </ThemeProvider>
    </>
  );
}

export default App;
