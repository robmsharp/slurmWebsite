import React, {useContext, useState } from "react";

import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, CircularProgress
  } from '@mui/material/';

import GameContext from '../api/gamesAPI';
import GamesList from '../components/gamesList';

import { collection, query, where, getDocs } from "firebase/firestore";
import SnackbarContext from "../api/snackbarAPI";
import AuthContext from "../api/authorisationAPI";

import {db, storage} from '../firebaseConfig';
  
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import ScrollTop from '../components/scrollTop';


import NoteAddIcon from '@mui/icons-material/NoteAdd';

const Games = () => {

  //Load the games Context
  const gameCtx = useContext(GameContext);
  const snackCtx = useContext(SnackbarContext);
  const authCtx = useContext(AuthContext);

  const handleOpenCreate = () => {

    console.log("game create");

  }
  
    return (
    <>
    <Toolbar id="back-to-top-anchor" />
    <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Select the game you would like to play</Typography>
    
    {gameCtx.denied === false && gameCtx.loaded === true && authCtx.isLoggedIn && <Button variant="contained" startIcon={<NoteAddIcon />} onClick={handleOpenCreate} sx={{ m: 2 }}>Create new game</Button>}
  

    <Container>
    {gameCtx.denied === false && gameCtx.loaded === false && <><Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography><CircularProgress /></>
      }
        {gameCtx.denied === true && <Typography>Access denied.</Typography>}
    {gameCtx.denied === false && gameCtx.loaded === true && <GamesList gamesData={gameCtx.games}/>}

    </Container>
    <ScrollTop anchor="#back-to-top-anchor"/>    
        </>
    );
};

export default Games;