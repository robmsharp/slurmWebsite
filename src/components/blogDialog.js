import React, { useState, useContext, useEffect, useReducer } from "react";
import {
    Snackbar, Typography, Toolbar, AppBar, CssBaseline,
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link, Dialog, DialogTitle, IconButton
} from '@mui/material/';


import AuthContext from "../api/authorisationAPI"
import { connectStorageEmulator } from "firebase/storage";

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const BlogDialog = (props) => {

  const {openDialog, handleClose} = props;

  const titleReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      if (action.val.trim() === '') { 
        return { value: action.val, isValid: false, helperText: 'You must include a title' };
      }
      else {
        return { value: action.val, isValid: true, helperText: ''}
      }
    }
    
    return { value: '', isValid: false, helperText: 'Something went wrong' };

  };

  const [titleState, dispatchTitle] = useReducer(titleReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: titleValue, isValid: titleIsValid, helperText: titleHelperText} = titleState;

  const titleChangeHandler = event => {
    dispatchTitle({ type: 'USER_INPUT', val: event.target.value });
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log("Title:");
    console.log(titleValue);

  }
   
  

    return (
        
            <Dialog open={openDialog} fullScreen
            onClose={handleClose}
            TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
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
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 5, color: "black", bgcolor: "text.secondary" }}>
          <Typography>
            Fill out the details of the blog entry and upload any images. Images can be located in the next by specifying the line they appear above</Typography>

            <Container >
        <Card sx={{ mb: 10 }}>
          <CardHeader

            title="Details"


          />

          <CardContent>
            <form className="contact-form" onSubmit={formSubmitHandler}>
              
              <TextField
                id="outlined-basic"
                placeholder="Enter title for blog entry"
                label="Title"
                variant="outlined"
                required
                type="text"
                sx={{ width: "100%" }}
                onChange={titleChangeHandler}
                value={titleValue}
                error={titleIsValid==false}
                helperText={titleHelperText}
              />

              </form>
              </CardContent>
              </Card></Container>



          <Grid container spacing={1} justify='space-between' sx={{ mt: 5 }}>
            <Grid item xs={12} md={4}>
              <Button variant="contained">Cancel</Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button variant="contained">
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>


    );



}

export default BlogDialog;