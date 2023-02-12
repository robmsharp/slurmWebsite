import React, { useContext, useState, useReducer } from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, CircularProgress, Dialog, DialogTitle
} from '@mui/material/';

import GameContext from '../api/gamesAPI';
import GamesList from '../components/gamesList';

import { collection, query, where, getDocs } from "firebase/firestore";
import SnackbarContext from "../api/snackbarAPI";
import AuthContext from "../api/authorisationAPI";

import { db, storage } from '../firebaseConfig';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import ScrollTop from '../components/scrollTop';

import GameDialog from '../components/gameDialog';

import NoteAddIcon from '@mui/icons-material/NoteAdd';


import useImage from '../hooks/useImage';

const Games = () => {

  //Load the games Context
  const gameCtx = useContext(GameContext);
  const snackCtx = useContext(SnackbarContext);
  const authCtx = useContext(AuthContext);

  //For game being published or not
  const [publish, setPublish] = useState(false);

  //Reducer for field inputs
  const textReducer = (state, action) => {

    let inputName = '';

    console.log(action.type);

    switch (action.type) {
      case 'TITLE_INPUT':
        inputName = 'title';
        break;
      case 'SHORT_DESCRIPTION_INPUT':
        inputName = 'short description';
        break;
      case 'LONG_DESCRIPTION_INPUT':
        inputName = 'long description';
        break;
      //Tip is not required  
      case 'TIP_INPUT':
          return { value: action.val, isValid: true, helperText: '' }
          break;  
      case 'RESET':
        return { value: '', isValid: null, helperText: '' };
      default:
        return { value: '', isValid: false, helperText: 'Something went wrong' };

    }


    if (action.val.trim() === '') {
      return { value: action.val, isValid: false, helperText: 'You must include a '.concat(inputName) };
    }
    else {
      return { value: action.val, isValid: true, helperText: '' }
    }

  };

  //Title field

  const [titleState, dispatchTitle] = useReducer(textReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  //Tip field

  const [tipState, dispatchTip] = useReducer(textReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  //Short description field

  const [SDState, dispatchSD] = useReducer(textReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  //Long description field

  const [LDState, dispatchLD] = useReducer(textReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  //Delete dialog states
  const [gameKey, setGameKey] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');

  //Uploading the game file
  const [gameFilePercentage, setGameFilePercentage] = useState(0);
  const [gameFilename, setGameFilename] = useState('');

  //Open the dialog
  const [openDialog, setOpen] = useState(false);
  //Title of dialog
  const [dialogTitle, setDialogTitle] = useState('');
  //Instruction of dialog
  const [instruction, setInstruction] = useState('');
  //Button of dialog
  const [dialogButton, setDialogButton] = useState('');

  //Initial data
  //Format of data:
  //key, [fileName, imageURL, include, percent, position, mandatory]
  const initialData = ["cover image", [null, null, true, -1, -1, true]];

  //Image data
  const [data, getData, addImageSlot, updatePercentage, updateImageURL, updateFileName, updateInclude, updatePosition, toggleInclude, resetData] = useImage(
    1, "screenshot",
    new Map([initialData])
  );

  //Functions

  //Uploads the file to database
  //Updates the game file percentage
  const handleGameFileUpload = (filename, selectedFile) => {

    console.log("file uploaded:" + filename);
    //TO DO

  };

  //Reset the values
  const resetAllValues = () => {

    setGameFilePercentage(0);
    setPublish(false);
    dispatchTitle({ type: "RESET", val: null });
    dispatchSD({ type: "RESET", val: null });
    dispatchLD({ type: "RESET", val: null });
    dispatchTip({ type: "RESET", val: null });
    resetData(new Map([initialData]));
  }

  //Load the values
  const loadValues = (gameKey) => {

    //Find the matching game
    const gameData = gameCtx.games.find(game => game.id === gameKey);

    setGameFilePercentage(100);
    setGameFilename(gameData.rom + ".bin");
    dispatchTitle({ type: "TITLE_INPUT", val: gameData.name });
    dispatchSD({ type: "SHORT_DESCRIPTION_INPUT", val: gameData.shortDescription });
    dispatchLD({ type: "LONG_DESCRIPTION_INPUT", val: gameData.longDescription });
    dispatchTip({ type: "TIP_INPUT", val: gameData.tip });

    setPublish(gameData.live);
    
    //Set the cover image
    resetData(gameData.images);

  }

  //Open the dialog for creating a new game
  const handleOpenCreate = () => {

    setInstruction('Fill out the details of the game entry and upload images.');
    setDialogTitle('Create new game');
    setDialogButton('Create');

    //Reset all values
    resetAllValues();

    setOpen(true);

  }

  //Open the dialog for editing an existing game
  const handleOpenEdit = (gameKey) => {

    setInstruction('Edit the details of the game entry and upload images.');
    setDialogTitle('Edit existing game');
    setDialogButton('Save');

    //Reset all values
    loadValues(gameKey);

    setOpen(true);

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

  /*const cantCreate = (reason) => {
    if (reason === "image") {
      snackCtx.notifyLevel("Creating blog entry with image requires a fully uploaded image", "error");
    }

    if (reason === "missing title") {
      snackCtx.notifyLevel("Creating blog entry requires a title", "error");
    }


    if (reason === "missing text") {
      snackCtx.notifyLevel("Creating blog entry requires text", "error");
    }

  }*/

  const verifyData = () => {



  }

  const handleImageUpload = (index, file) => {

    //blogCtx.uploadImage(file, index, setImageDataArray);

  }

  
  const handleSwap = async (id1, id2) => {


    gameCtx.setLoaded(false);

    const success = await gameCtx.swapGame(id1, id2);

    if (success) {
      snackCtx.notifyLevel("Games successfully swapped.", "success");
    }

    else {
      snackCtx.notifyLevel("Unable to swap games.", "error");
    }

  }

 

  const handleDelete = (deleteGameKey, gameTitle) => {

    //So we know which game to delete when confirmation occurs
    setGameKey(deleteGameKey);
    setDeleteMessage('Confirm delete the game \"'.concat(gameTitle).concat('\"? This operation cannot be undone.'));
    setDeleteOpen(true);

  }


  const handleDeleteConfirm = async () => {

    const success = await gameCtx.deleteGame(gameKey);

    if (success) {
      snackCtx.notifyLevel("Game successfully deleted.", "success");
    }

    else {
      snackCtx.notifyLevel("Unable to delete game.", "error");
    }

  }


  return (
    <>
      <Toolbar id="back-to-top-anchor" />

      {authCtx.isLoggedIn ? <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Edit the game entries or create a new one</Typography>
 : <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Select the game you would like to play</Typography>

      }
      
      {gameCtx.denied === false && gameCtx.loaded === true && authCtx.isLoggedIn && <Button variant="contained" startIcon={<NoteAddIcon />} onClick={handleOpenCreate} sx={{ m: 2 }}>Create new game</Button>}


      <Container>
        {gameCtx.denied === false && gameCtx.loaded === false && <><Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography><CircularProgress /></>
        }
        {gameCtx.denied === true && <Typography>Access denied.</Typography>}
        {gameCtx.denied === false && gameCtx.loaded === true && <GamesList data={gameCtx.games} 
        handleOpenEdit={handleOpenEdit} 
        loggedIn={authCtx.isLoggedIn} 
        handleSwap = {handleSwap}
       last = {gameCtx.maxId}
       handleDelete = {handleDelete}
       loaded = {gameCtx.loaded}
       />
       
       }

      </Container>
      <ScrollTop anchor="#back-to-top-anchor" />


      <GameDialog 
      
      openDialog={openDialog} 
      handleClose={handleClose}
      title={dialogTitle} instruction={instruction}
       dialogButton={dialogButton}
       publish={publish} setPublish={setPublish} 
       toggleInclude={toggleInclude} updatePosition={updatePosition} handleImageUpload={handleImageUpload}
       titleState={titleState} dispatchTitle={dispatchTitle}
       tipState={tipState} dispatchTip={dispatchTip}
       LDState = {LDState} dispatchLD={dispatchLD}
       SDState = {SDState} dispatchSD={dispatchSD}
       handleFileUpload = {handleGameFileUpload}
       filePercentage = {gameFilePercentage}
       imageData={data}
       addImageSlot={addImageSlot}
       gameFilename = {gameFilename}
       
      
      
      


      />

{/* Delete dialog */}
<Dialog fullWidth
        maxWidth="md" open={deleteOpen}>
        <DialogTitle>Confirm delete game</DialogTitle>
        <Box sx={{ p: 5, color: "black", bgcolor: "text.secondary" }}>
          <Typography>
          {deleteMessage}
          </Typography>
          <br />

          <Grid container spacing={1} justify='space-between' sx={{ mt: 5 }}>
            <Grid item xs={12} md={4}>
              <Button variant="contained" color='primary' onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>
            </Grid>


            <Grid item xs={12} md={4}>
              <Button variant="contained" color='secondary' onClick={handleDeleteConfirm}>Confirm</Button>
            </Grid>


          </Grid>
        </Box>
      </Dialog>



    </>
  );
};

export default Games;