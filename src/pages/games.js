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

import GameDialog from '../components/gameDialog';

import NoteAddIcon from '@mui/icons-material/NoteAdd';

const Games = () => {

  //Load the games Context
  const gameCtx = useContext(GameContext);
  const snackCtx = useContext(SnackbarContext);
  const authCtx = useContext(AuthContext);

  const [openDialog, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [instruction, setInstruction] = useState('');

  const [imageDataArray, setImageDataArray] = useState({ 
    "location1": 1, "include1": false, "location2": 1, "include2": false,  "location3": 1, "include3": false });

  const [imageIndexArray, setImageIndexArray] = useState([1, 2, 3]);
  const [lastImageIndex, setLastImageIndex] = useState(3);

  const handleOpenCreate = () => {

    setInstruction('Fill out the details of the blog entry and upload images.');
    setTitle('Create new entry');
    setOpen(true);

  }

  const addImageSlot = () => {

    setImageIndexArray((prevArray) => [...prevArray, lastImageIndex + 1]);

    setImageDataArray(prev => ({ ...prev, ["include".concat(lastImageIndex + 1)]: false }));

    setLastImageIndex(prev => prev + 1);

  }
  
  const handleCreate = async (data) => {
    //const success = await blogCtx.createEntry(data);

    //Close the dialog upon successful creation
    /*if (success) {
      snackCtx.notifyLevel("Blog entry created.", "success");
      setOpen(false);
    }
    else {
      snackCtx.notifyLevel("Unable to create blog entry.", "error");
    }*/
  }

  const handleClose = () => {
    setOpen(false);
  }

  const cantCreate = (reason) => {
    if (reason === "image") {
      snackCtx.notifyLevel("Creating blog entry with image requires a fully uploaded image", "error");
    }

    if (reason === "missing title") {
      snackCtx.notifyLevel("Creating blog entry requires a title", "error");
    }


    if (reason === "missing text") {
      snackCtx.notifyLevel("Creating blog entry requires text", "error");
    }

  }

  const handleImageUpload = (index, file) => {
    
    //blogCtx.uploadImage(file, index, setImageDataArray);
    
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


    <GameDialog title={title} instruction={instruction} openDialog={openDialog} handleClose={handleClose}
        handleImageUpload={handleImageUpload}
        cantCreate={cantCreate} handleCreate={handleCreate}
        imageDataArray={imageDataArray}
        setImageDataArray={setImageDataArray}
        imageIndexArray={imageIndexArray}
        setImageIndexArray={setImageIndexArray}
        lastImageIndex={lastImageIndex}
        setLastImageIndex={setLastImageIndex}
        addImageSlot={addImageSlot}


      />



        </>
    );
};

export default Games;