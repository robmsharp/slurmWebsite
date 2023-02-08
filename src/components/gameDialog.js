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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GameDialog = (props) => {

  
  const { title, instruction, openDialog, handleClose, percentage, handleImageUpload, imageUrl, imageName,
    cantCreate, handleCreate, imageDataArray,
    setImageDataArray,
    imageIndexArray,
    setImageIndexArray,
    lastImageIndex,
    setLastImageIndex,
    addImageSlot } = props;


  const titleReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      if (action.val.trim() === '') {
        return { value: action.val, isValid: false, helperText: 'You must include a title' };
      }
      else {
        return { value: action.val, isValid: true, helperText: '' }
      }
    }

    return { value: '', isValid: false, helperText: 'Something went wrong' };

  };

  const [titleState, dispatchTitle] = useReducer(titleReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: titleValue, isValid: titleIsValid, helperText: titleHelperText } = titleState;

  const textReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      if (action.val.trim() === '') {
        return { value: action.val, isValid: false, helperText: 'You must include blog text' };
      }
      else {
        return { value: action.val, isValid: true, helperText: '' }
      }
    }

    return { value: '', isValid: false, helperText: 'Something went wrong' };

  };

  const [shortTextState, dispatchShortText] = useReducer(textReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const [longTextState, dispatchLongText] = useReducer(textReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: shortTextValue, isValid: shortTextIsValid, helperText: shortTextHelperText } = shortTextState;
  const { value: longTextValue, isValid: longTextIsValid, helperText: longTextHelperText } = longTextState;



  const titleChangeHandler = event => {
    dispatchTitle({ type: 'USER_INPUT', val: event.target.value });
  };

  const shortTextChangeHandler = event => {
    dispatchShortText({ type: 'USER_INPUT', val: event.target.value });
  };

  const longTextChangeHandler = event => {
    dispatchLongText({ type: 'USER_INPUT', val: event.target.value });
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log("Title:");
    console.log(titleValue);

    console.log("Short Text:");
    console.log(shortTextValue);

    console.log("Long Text:");
    console.log(longTextValue);

    console.log("publish");
    console.log(publish);

    console.log("hasImage");
    //console.log(includeImage);

    console.log("image Name");
    console.log(imageName);

    console.log("image location");
    console.log(imageUrl);

    //Prevent if title is empty
    if (!titleIsValid) { cantCreate("missing title") };

    //Prevent if text is empty
    if (!shortTextIsValid) { cantCreate("missing short text") };
    //Prevent if text is empty
    if (!longTextIsValid) { cantCreate("missing long text") };

    //Prevent creation if image hasn't been uploaded
    /*if (includeImage) {

      if ((imageName === null) || (imageUrl === null) || (percentage < 100)) {

        cantCreate("image");
        return;

      }


    }*/

    //Needs datePosted
    //Needs author
    //Added later in database function in blogAPI

    /*var data = {
      title: titleValue,

      text: textValue.replace(/\n/g, "\\n"),

      includeImage: includeImage,
      published: publish
    };

    if (includeImage) {
      data = {...data,
        
        imageIndex: location,

        image: imageName

      };


    }

    handleCreate(data);*/


  }




  const handlePublish = (event) => {
    setPublish(event.target.checked);
  };

  const handleIncludeImage = (event) => {
    //setIncludeImage(event.target.checked);
    const value = !imageDataArray[event.target.name];
    const key = event.target.name;
    if (key != null) {
      setImageDataArray(prev => ({ ...prev, [key]: value }));
    }
    console.log(imageDataArray);
  };

  const handleLocationChange = (event) => {
    const key = "location".concat(event.target.name);
    setImageDataArray(prev => ({ ...prev, [key]: event.target.value }));
  };

  const handleUpload = (event) => {
    console.log("Changed");
    const file = event.target.files[0];
    console.log(file);
    handleImageUpload(event.target.name, file);
  };

  const handleFileUpload = (event) => {
    console.log("Upload file");
    
  };

  const handleCoverUpload = (event) => {
    console.log("Cover upload");
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
            Create
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
                error={titleIsValid == false}
                helperText={titleHelperText}
              />
              <br />
              <br />
              <TextField

                placeholder="Enter short description"
                label="Short Description"
                variant="outlined"
                required
                type="text"
                sx={{ width: "100%" }}
                onChange={shortTextChangeHandler}
                value={shortTextValue}
                error={shortTextIsValid == false}
                helperText={shortTextHelperText}
                multiline
                maxRows={100}
                minRows={3}
              />
              <br />
              <br />

              <TextField

                placeholder="Enter long description"
                label="Long Description"
                variant="outlined"
                required
                type="text"
                sx={{ width: "100%" }}
                onChange={longTextChangeHandler}
                value={longTextValue}
                error={longTextIsValid == false}
                helperText={longTextHelperText}
                multiline
                maxRows={100}
                minRows={3}
              />
              <br />
              <br />
            </CardContent>


            <CardHeader

              title="Game file"


            />

<CardContent>



<Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
    accept=".bin"
    onChange={handleFileUpload}
  />
</Button>

<br />
<br />




</CardContent>

            <CardHeader

              title="Cover image"


            />

<CardContent>



<Button
  variant="contained"
  component="label"
>
  Upload Image
  <input
    type="file"
    hidden
    accept="image/*"
    onChange={handleCoverUpload}
  />
</Button>

<br />
<br />




</CardContent>

            {imageIndexArray.map((index) => (

              <div key={"a"+index}>
                <CardHeader key={"b"+index}

                  title={"Image".concat(index)}


                />

                <CardContent key={"c"+index}>

                  <FormControlLabel name={"include".concat(index)} control={<Checkbox checked={imageDataArray["include".concat(index)]} onChange={handleIncludeImage} sx={{
                    color: "white", '&.Mui-checked': {
                      color: "white",
                    }
                  }} />} label="Include image" />

                  <Button
                    variant="contained"
                    component="label"
                    disabled={!imageDataArray["include".concat(index)]}
                  >
                    Upload File
                    <input
                      type="file"
                      name={index}
                      hidden
                      accept="image/*"
                      onChange={handleUpload}
                    />
                  </Button>
                  {(imageDataArray["imageName".concat(index)] != null) && <Typography>{imageDataArray["imageName".concat(index)]}</Typography>}


                  {(imageDataArray["percentage".concat(index)] > 0) && <Box sx={{ mt: 2, width: '100%' }}>
                    <LinearProgressWithLabel value={imageDataArray["percentage".concat(index)]} />
                  </Box>}


                  <br />
                  <br />



                  


                  {(imageDataArray["imageUrl".concat(index)] != null) && <CardMedia
                    component="img"
                    image={imageDataArray["imageUrl".concat(index)]}
                    alt="screenshot"
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain", width: "10%" }}
                  />}

                </CardContent>
              </div>
            ))}

            <Button variant="contained" onClick={addImageSlot}>Add Image Slot</Button>

          </Card></Container>




      </Box>
    </Dialog>


  );



}

export default GameDialog;