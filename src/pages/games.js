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

  //The mode (ie. edit or create)
  const [mode, setMode] = useState('');

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
  const [imageData, getData, addImageSlot, updatePercentage, updateImageURL, updateFileName, updateInclude, updatePosition, toggleInclude, resetData, getCover, getScreenshots, verify] = useImage(
    1, "screenshot",
    new Map([initialData])
  );

  //Functions

  //Uploads the file to database
  //Updates the game file percentage
  const handleGameFileUpload = (filename, file) => {

    gameCtx.uploadGameFile(filename, file, setGameFilename, setGameFilePercentage);

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
    setMode('Create');

    //Reset all values
    resetAllValues();

    //Set the gameKey to the max + 1 ie. unique id
    setGameKey(gameCtx.maxId+1);

    setOpen(true);


    //Just for test

    /*const screenshots = [{id: 3, name: "pocmans1.png", position: 1}]
    const data = {coverImage: "pocman.png", name: "test", live: true, rom: "pocman", shortDescription: "Nope", longDescription: "LOOOOONG", tip: "hello", screenshots: screenshots}

    gameCtx.createGame(data);*/

  }

  //Open the dialog for editing an existing game
  const handleOpenEdit = (key) => {

    setInstruction('Edit the details of the game entry and upload images.');
    setDialogTitle('Edit existing game');
    setDialogButton('Save');
    setMode('Edit');

    setGameKey(key);

    //Reset all values
    loadValues(key);

    setOpen(true);

  }

  const handleSubmit = () => {

    const [status, reason] = verifyData();

    if (status)

     {const newData = createData();
    
      if (mode === 'Create') {
        handleCreate(newData);
      }
  
      console.log(newData);
    
    
    }
     else 
     {
      //Inform the user of the problem
      snackCtx.notifyLevel(reason, "error");
      return;
     }

    

  }

  const handleCreate = async (newData) => {


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

  const verifyData = () => {

    if (!gameFilename) return [false, "You must select a game file"];

    if (gameFilePercentage<100) return [false, "Game file not uploaded"];

    if (!titleState.value) return [false, "You must input a title"];

    if (!LDState.value) return [false, "You must input a long description"];

    if (!SDState.value) return [false, "You must input a short description"];

    //Tip can be empty
    const [status, message] = verify();

    if (status === false) {
      return [false, message];
    }


    return [true, ""];
  }

  const createData = () => {

    

    const newData = {
      id: gameKey,
      coverImage: getCover(), 
      name: titleState.value, 
      live: true, 
      rom: gameFilename, 
      shortDescription: SDState.value, 
      longDescription: LDState.value, 
      tip: tipState.value, 
      screenshots: getScreenshots()}



    return newData;

  }

  const handleImageUpload = (key, file) => {

    //blogCtx.uploadImage(file, index, setImageDataArray);

    gameCtx.uploadImage(key, file, updatePercentage, updateImageURL, updateFileName);

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

    setDeleteOpen(false);

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
       imageData={imageData}
       addImageSlot={addImageSlot}
       gameFilename = {gameFilename}
       handleSubmit = {handleSubmit}
       
      
      
      


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