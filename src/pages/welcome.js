import React from "react";

import {
  Popper, Popover, Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete, CardActionArea,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, Link, CircularProgress
} from '@mui/material/';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useEffect, useState, useContext, useReducer } from "react";
import { db, storage } from '../firebaseConfig';
import WelcomeList from '../components/welcomeList';

import { collection, query, where, getDocs } from "firebase/firestore";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import BackgroundImage from '../icons/slurmtitle.png';

import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import ScrollTop from '../components/scrollTop';

import SnackContext from "../api/snackbarAPI";
import AuthContext from "../api/authorisationAPI";
import WelcomeContext from "../api/welcomeAPI";

import NoteAddIcon from '@mui/icons-material/NoteAdd';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const Welcome = () => {

  const welcomeCtx = useContext(WelcomeContext);
  const authCtx = useContext(AuthContext);
  const snackCtx = useContext(SnackContext);

  const [dialogType, setDialogType] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogInstruction, setDialogInstruction] = useState('');

  const [confirmColor, setConfirmColor] = useState('');
  const [cancelColor, setCancelColor] = useState('');
  const [id, setId] = useState(null);

  const questionReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      if (action.val.trim() === '') {
        return { value: action.val, isValid: false, helperText: 'You must include a question' };
      }
      else {
        return { value: action.val, isValid: true, helperText: '' }
      }
    }

    if (action.type === 'NEW_INPUT') {
      return { value: action.val, isValid: null, helperText: '' }
    }

    return { value: '', isValid: false, helperText: 'Something went wrong' };

  };

  const [questionState, dispatchQuestion] = useReducer(questionReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: questionValue, isValid: questionIsValid, helperText: questionHelperText } = questionState;

  const answerReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      if (action.val.trim() === '') {
        return { value: action.val, isValid: false, helperText: 'You must include answer text' };
      }
      else {
        return { value: action.val, isValid: true, helperText: '' }
      }
    }

    if (action.type === 'NEW_INPUT') {
      return { value: action.val, isValid: null, helperText: '' }
    }

    return { value: '', isValid: false, helperText: 'Something went wrong' };

  };

  const [answerState, dispatchAnswer] = useReducer(answerReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: answerValue, isValid: answerIsValid, helperText: answerHelperText } = answerState;

  const questionChangeHandler = event => {
    dispatchQuestion({ type: 'USER_INPUT', val: event.target.value });
  };

  const answerChangeHandler = event => {
    dispatchAnswer({ type: 'USER_INPUT', val: event.target.value });
  };

  const handleCreate = () => {

    setDialogType("create");
    setCancelColor('primary');
    setConfirmColor('primary');
    setDialogTitle('Create new FAQ item');
    setDialogInstruction('Fill in the question and answer input fields');
    dispatchQuestion({ type: 'NEW_INPUT', val: '' });
    dispatchAnswer({ type: 'NEW_INPUT', val: '' });
    setDialogOpen(true);

  }

  const handleEdit = (id, question, answer) => {
    setId(id);
    setDialogType("edit");
    setCancelColor('primary');
    setConfirmColor('primary');
    setDialogTitle('Edit FAQ item');
    setDialogInstruction('Edit the question and answer input fields');
    dispatchQuestion({ type: 'USER_INPUT', val: question });
    dispatchAnswer({ type: 'USER_INPUT', val: answer });
    setDialogOpen(true);

  }

  const handleSwap = async (id1, id2) => {

    var firebaseId1;
    var firebaseId2;

    //Get the firebase id's 
    welcomeCtx.entries.forEach((entry, i) => {

      if (entry.id === id1) {
        firebaseId1 = entry.firebaseId;
      }

      if (entry.id === id2) {
        firebaseId2 = entry.firebaseId;
      }

    });

    const success = await welcomeCtx.moveEntry(firebaseId1, id1, firebaseId2, id2);

    if (success) {
      snackCtx.notifyLevel("Items successfully swapped.", "success");
    }

    else {
      snackCtx.notifyLevel("Unable to swap items.", "error");
    }

  }


  const handleDelete = (id, question) => {
    setId(id);
    setDialogType("delete");
    setCancelColor('primary');
    setConfirmColor('secondary');
    setDialogTitle('Confirm delete FAQ item');
    setDialogInstruction('Confirm delete the question \"'.concat(question).concat('\"? This operation cannot be undone.'));
    setDialogOpen(true);

  }

  const handleConfirm = async () => {

    if (dialogType === "edit") {

      if ((questionIsValid) && (answerIsValid)) {

        const success = await welcomeCtx.updateEntry(id, questionValue, answerValue);

        if (success) {
          snackCtx.notifyLevel("Item successfully edited.", "success");
          setDialogOpen(false);
        }

        else {
          snackCtx.notifyLevel("Unable to edit item.", "error");
        }
      }

      else {
          snackCtx.notifyLevel("Cannot edit item while inputs are invalid.", "error");
      }

    }

    if (dialogType === "create") {

      if ((questionIsValid) && (answerIsValid)) {

        const success = await welcomeCtx.createEntry(questionValue, answerValue);

        if (success) {
          snackCtx.notifyLevel("Item successfully create.", "success");
          setDialogOpen(false);
        }

        else {
          snackCtx.notifyLevel("Unable to create item.", "error");
        }
      }

      else {
          snackCtx.notifyLevel("Cannot credte item while inputs are invalid.", "error");
      }

    }

  }

  const handleCancel = () => {
    setDialogOpen(false);
  }

  return (

    <>
      <Toolbar id="back-to-top-anchor" />

      <Box component="img" sx={{ objectFit: 'cover', maxWidth: "100%" }} src={BackgroundImage}></Box>

      <Typography variant="h2" align="center" sx={{ py: 2 }}>Welcome to Slurm16's website</Typography>

      {welcomeCtx.error === false && welcomeCtx.loaded === false && <><Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography><CircularProgress /></>
      }
      {welcomeCtx.error === true && welcomeCtx.loaded === false && <Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Something went wrong.</Typography>
      }

      {authCtx.isLoggedIn === true && welcomeCtx.error === false && welcomeCtx.loaded === true && <Button variant="contained" startIcon={<NoteAddIcon />} onClick={handleCreate} sx={{ m: 2 }}>Create new item</Button>}

      <Container>

        {welcomeCtx.error === false && welcomeCtx.loaded === true &&
          <WelcomeList auth={authCtx.isLoggedIn} welcomeData={welcomeCtx.entries}
            last={welcomeCtx.numberOfEntries}
            handleCreate={handleCreate}
            handleSwap={handleSwap}
            handleEdit={handleEdit}
            handleDelete={handleDelete}


          />}
      </Container>
      <ScrollTop anchor="#back-to-top-anchor" />

      <Dialog fullWidth
        maxWidth="md" open={dialogOpen}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <Box sx={{ p: 5, color: "black", bgcolor: "text.secondary" }}>
          <Typography>
            {dialogInstruction}
          </Typography>
          <br />
          {(dialogType === "edit" || dialogType === "create") &&
            <Card>
              <CardContent>
                <TextField
                  id="outlined-basic"
                  placeholder="Enter question text"
                  label="Question"
                  variant="outlined"
                  required
                  type="text"
                  sx={{ width: "100%" }}
                  onChange={questionChangeHandler}
                  value={questionValue}
                  error={questionIsValid == false}
                  helperText={questionHelperText}
                />
                <br />
                <br />
                <TextField

                  placeholder="Enter answer text"
                  label="Answer"
                  variant="outlined"
                  required
                  type="text"
                  sx={{ width: "100%" }}
                  onChange={answerChangeHandler}
                  value={answerValue}
                  error={answerIsValid == false}
                  helperText={answerHelperText}
                  multiline
                  maxRows={100}
                  minRows={3}
                />
              </CardContent>
            </Card>





          }

          <Grid container spacing={1} justify='space-between' sx={{ mt: 5 }}>
            <Grid item xs={12} md={4}>
              <Button variant="contained" color={cancelColor} onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>


            <Grid item xs={12} md={4}>
              <Button variant="contained" color={confirmColor} onClick={handleConfirm}>Confirm</Button>
            </Grid>


          </Grid>
        </Box>
      </Dialog>

    </>
  );
};

export default Welcome;