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

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const BlogDialog = (props) => {

  const locationOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [publish, setPublish] = useState(true);
  const [includeImage, setIncludeImage] = useState(false);
  const [location, setLocation] = useState(1);
  const { openDialog, handleClose, percentage, handleImageUpload, imageUrl, imageName } = props;

  function LinearProgressWithLabel(props, value) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  };


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

  const [textState, dispatchText] = useReducer(textReducer, {
    value: '',
    isValid: null,
    helperText: ''
  });

  const { value: textValue, isValid: textIsValid, helperText: textHelperText } = textState;



  const titleChangeHandler = event => {
    dispatchTitle({ type: 'USER_INPUT', val: event.target.value });
  };

  const textChangeHandler = event => {
    dispatchText({ type: 'USER_INPUT', val: event.target.value });
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log("Title:");
    console.log(titleValue);

  }

  const handlePublish = (event) => {
    setPublish(event.target.checked);
  };

  const handleIncludeImage = (event) => {
    setIncludeImage(event.target.checked);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleUpload = (event) => {
    console.log("Changed");
    const file = event.target.files[0];
    console.log(file);
    handleImageUpload(file);
  };

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
            New Blog Entry
          </Typography>
          <Button variant="contained" onClick={handleClose}>
            Create
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: "black" }}>

        <Typography sx={{ m: 2 }}>
          Fill out the details of the blog entry and upload an image if needed.</Typography>

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

                placeholder="Enter title for blog entry"
                label="Text"
                variant="outlined"
                required
                type="text"
                sx={{ width: "100%" }}
                onChange={textChangeHandler}
                value={textValue}
                error={textIsValid == false}
                helperText={textHelperText}
                multiline
                maxRows={100}
                minRows={3}
              />
              <br />
              <br />
            </CardContent>
            <CardHeader

              title="Image"


            />

            <CardContent>

              <FormControlLabel control={<Checkbox checked={includeImage} onChange={handleIncludeImage} sx={{
                color: "white", '&.Mui-checked': {
                  color: "white",
                }
              }} />} label="Include image" />

              <Button
                variant="contained"
                component="label"
                disabled={!includeImage}
              >
                Upload File
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleUpload}
                />
              </Button>
              {(imageName != null) && <Typography>{imageName}</Typography>}


              {(percentage > 0) && <Box sx={{ mt: 2, width: '100%' }}>
              <LinearProgressWithLabel value={percentage} />
              </Box>}


              <br />
              <br />



              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  variant="outlined"
                  value={location}
                  label="Location"
                  onChange={handleLocationChange}
                  disabled={!includeImage}
                >
                  <MenuItem value={1}>Top</MenuItem>
                  <MenuItem value={-1}>Bottom</MenuItem>
                  {locationOptions.map((location) => {
                    return <MenuItem value={location}>{location}</MenuItem>
                  })}

                </Select>
              </FormControl>

              <br />
              <br />


              {(imageUrl != null) &&   <CardMedia
        component="img"
        image={imageUrl}
        alt="screenshot"
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />}

            </CardContent>
          </Card></Container>




      </Box>
    </Dialog>


  );



}

export default BlogDialog;