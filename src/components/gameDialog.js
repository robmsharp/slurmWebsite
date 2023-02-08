import React, { useState, useContext, useEffect, useReducer } from "react";
import {
  Snackbar, Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, Link, Dialog, DialogTitle, IconButton, FormControlLabel, Checkbox, Select, FormControl
} from '@mui/material/';


import AuthContext from "../api/authorisationAPI"
import { connectStorageEmulator } from "firebase/storage";

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import CloseIcon from '@mui/icons-material/Close';

import LinearProgressWithLabel from './progress.js';


import CustomTextField from '../components/customFieldText';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GameDialog = (props) => {


  const { openDialog, handleClose, title, instruction, dialogButton, publish, setPublish, toggleInclude, updatePosition, handleImageUpload, titleState, dispatchTitle,
    LDState, dispatchLD,
    SDState, dispatchSD} = props;


  const formSubmitHandler = event => {

  }

  //Change the checkbox for publish
  const handlePublish = (event) => {
    setPublish(event.target.checked);
  };

  /*
  Title
  Short description
  Long description
  Rom
  Cover Image
  Screenshots
  */


  return (

    <Dialog open={openDialog} fullScreen
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative', bgcolor: "black" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          <Button variant="contained" onClick={formSubmitHandler}>
            {dialogButton}
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: "black" }}>

        <Typography sx={{ m: 2 }}>
          {instruction}</Typography>

        <Container >
          <Card sx={{ mb: 10 }}>
            <CardHeader

              title="Details"


            />

            <CardContent>

              <FormControlLabel control={<Checkbox checked={publish} onChange={handlePublish} sx={{
                color: "white", '&.Mui-checked': {
                  color: "white",
                }
              }} />} label="Publish" />
              <br />
              <br />

              <CustomTextField label="Title" placeholder="Input title" required="true" state={titleState} dispatch={dispatchTitle} type="TITLE_INPUT" />
              <CustomTextField label="Short description" placeholder="Input short description" required="true" state={SDState} dispatch={dispatchSD} type="SHORT_DESCRIPTION_INPUT" />
              <CustomTextField label="Long description" placeholder="Input long description" required="true" state={LDState} dispatch={dispatchLD} type="LONG_DESCRIPTION_INPUT" />



            </CardContent>



          </Card>
        </Container>

      </Box>
    </Dialog>


  );



}

export default GameDialog;