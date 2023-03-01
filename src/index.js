import React from 'react';
import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { render } from "react-dom";

//ReactDOM.render(<App />, document.getElementById('root'));

import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './api/authorisationAPI';
import { MessageContextProvider } from './api/messagesAPI';
import { SnackbarContextProvider } from './api/snackbarAPI';
import { BlogContextProvider } from './api/blogAPI';
import { WelcomeContextProvider } from "./api/welcomeAPI";
import { GameContextProvider } from "./api/gamesAPI";

import { SnackbarProvider } from 'notistack';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";

//const root = ReactDOM.createRoot(document.getElementById('root'));



//const root = ReactDOM.render(<App />, document.getElementById('root'));


/*
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);*/


//const root = document.getElementById('root');
//render(<App />, root);

const myTheme = createTheme({
  typography: {
    fontFamily: 'Orbitron',
    body1: { fontFamily: "Ubuntu" },
    subtitle1: { fontFamily: "Ubuntu", fontWeight: 700 },
    subtitle2: { fontFamily: "Ubuntu", fontSize: "0.5 em" },
    subtitle3: { fontFamily: "Ubuntu", fontSize: "24px", fontWeight: 700 },
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

ReactDOM.render(
  
    <ThemeProvider theme={myTheme} >
    
    <SnackbarProvider maxSnack={3}>
    <SnackbarContextProvider>
      <AuthContextProvider>
      <GameContextProvider>
      <BlogContextProvider>
      <MessageContextProvider>
      <WelcomeContextProvider>
      <BrowserRouter>
        <App />
        </BrowserRouter>
        </WelcomeContextProvider>
        </MessageContextProvider>
        </BlogContextProvider>
        </GameContextProvider>
      </AuthContextProvider>
      </SnackbarContextProvider>
      </SnackbarProvider>
    
    </ThemeProvider>

  ,
  document.getElementById("root")
);

