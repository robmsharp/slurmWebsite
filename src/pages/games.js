import React, { useContext, useState } from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
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

  //Uploading the game file
  const [gameFilePercentage, setGameFilePercentage] = useState(0);

  //Open the dialog
  const [openDialog, setOpen] = useState(false);
  //Title of dialog
  const [dialogTitle, setDialogTitle] = useState('');
  //Instruction of dialog
  const [instruction, setInstruction] = useState('');

  //Initial data
  //Format of data:
  //key, [fileName, imageURL, include, percent, position, mandatory]
  const initialData = ["cover image", [null, null, true, -1, -1, true]];

  //Image data
  const [data, getData, addImageSlot, updatePercentage, updateImageURL, updateFileName, updateInclude, updatePosition, toggleInclude, resetData] = useImage(
    3, "screenshot",
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
    resetData(new Map([initialData]));
  }

  //Load the values
  const loadValues = () => {

  }

  const handleOpenCreate = () => {

    setInstruction('Fill out the details of the blog entry and upload images.');
    setDialogTitle('Create new entry');

    //Reset all values
    resetAllValues();

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
        {gameCtx.denied === false && gameCtx.loaded === true && <GamesList gamesData={gameCtx.games} />}

      </Container>
      <ScrollTop anchor="#back-to-top-anchor" />


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