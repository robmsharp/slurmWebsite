import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './pages/welcome';
import Games from './pages/games';
import Admin from './pages/admin';
import MainHeader from './components/mainheader';
import ChooseGameType from './pages/chooseGameType';
import Desktop from './pages/desktop';
import Contact from './pages/contact';
import Emulate from './pages/emulate';
import NotFound from './pages/notFound';
import Blog from './pages/blog';
import Messages from './pages/messages';
import { useEffect } from "react";
import Keyboard from './components/keyboard';

import db from './firebaseConfig';

import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { collection, query, where, getDocs } from "firebase/firestore";
import Footer from './components/footer.js';

import Arcade from './fonts/ARCADE.TTF';
import { useHistory } from 'react-router-dom';

import {
  Box
} from '@mui/material/';



const myTheme = createTheme({
  typography: {
    fontFamily: 'Orbitron',
    body1: { fontFamily: "Ubuntu" },
    subtitle1: { fontFamily: "Ubuntu", fontWeight: 700 },
    subtitle2: { fontFamily: "Ubuntu", fontSize: "0.5 em" },
    h2: {
      fontSize: '24px',
      '@media (min-width:1000px)': {
        fontSize: '2.4rem',
      }
    },
  },
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
    
      
        <CssBaseline enableColorScheme />
        <Box sx={{ minHeight: 800 }}>


          <MainHeader />
          <Switch>
            <Route exact path="/"> {<Redirect to="/welcome" />} </Route>
            <Route path="/welcome" component={Welcome} />
            <Route path="/games" component={Games} />
            <Route path="/admin" component={Admin} />
            <Route path="/contact" component={Contact} />
            <Route path="/emulate" component={Emulate} />
            <Route path="/keyboard" component={Keyboard} />
            <Route path="/blog" component={Blog} />
            <Route path="/messages" component={Messages} />
            <Route path="*" component ={NotFound} />
          </Switch>



        </Box>
        <Footer />
      
     
    </>
  );
}

export default App;
