import React, { useState } from "react";

import {
    Typography, Box,    Snackbar,  Toolbar, AppBar, CssBaseline,
    Container, Card, Grid, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link, Dialog, DialogTitle, IconButton, FormControlLabel, Checkbox, Select, FormControl
  
} from '@mui/material/';


import LinearProgressWithLabel from './progress.js';



const ImageList = ({ data, addImageSlot, toggleInclude, updatePosition, handleImageUpload }) => {

    const handleIncludeImage = (event) => {

        const key = event.target.name;
    
        toggleInclude(key);
    
    }

    const handleLocationChange = (event) => {

        const key = event.target.name;
        updatePosition(key, event.target.value);

    }
    
    const handleUpload = (event) => {

        const key = event.target.name;
        const file = event.target.files[0];
        console.log(file);
        handleImageUpload(key, file);
    
    }
    
    

    const locationOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];


    /*
    Structure:
    Header
    Button
    Filename
    Percentage
    Location
    Image
    */
   
    return (
        <>
            {Array.from(data).map(([key, [fileName, imageURL, include, percentage, location, mandatory]]) => (

                <div key={key}>
                    <CardHeader

                        title={key}


                    />

                    <CardContent>

                        {(mandatory === false) && <><FormControlLabel key={"include"+key} name={key} control={<Checkbox checked={include} onChange={handleIncludeImage} sx={{
                    color: "white", '&.Mui-checked': {
                      color: "white",
                    }
                  }} />} label="Include image" /></>}

                  <Button
                    variant="contained"
                    component="label"
                    disabled={!include}
                    key={"button"+key}
                  >
                    {"Upload ".concat(key)}
                    <input
                      type="file"
                      name={key}
                      hidden
                      accept="image/*"
                      onChange={handleUpload}
                    />
                  </Button>

                        {(fileName != null) && <Typography>{fileName}</Typography>}


                        {(percentage > 0) && <Box sx={{ mt: 2, width: '100%' }}>
                            <LinearProgressWithLabel value={percentage} key={"progress"+key} />
                        </Box>}


                        <br />
                        <br />



                        {(!mandatory) && <><FormControl fullWidth>
                            <InputLabel>Location</InputLabel>
                            <Select
                                variant="outlined"
                                name={key}
                                value={location}
                                label="Location"
                                onChange={handleLocationChange}
                                disabled={!include}
                                key={"location"+key}
                            >
                                <MenuItem value={1}>Top</MenuItem>
                                <MenuItem value={-1}>Bottom</MenuItem>
                                {locationOptions.map((location, id) => {
                                    return <MenuItem value={location} key={"menu"+id}>{location}</MenuItem>
                                })}

                            </Select>
                        </FormControl>

                        <br />
                        <br /></>
                            }


                        {(imageURL != null) && <CardMedia
                            component="img"
                            image={imageURL}
                            alt="screenshot"
                            sx={{ padding: "1em 1em 0 1em", objectFit: "contain", width: "10%" }}
                            key={"image"+key}
                        />}

                    </CardContent>
                </div>
            ))}

<Button variant="contained" onClick={addImageSlot}>Add Image Slot</Button>
    

        </>
    );
};

export default ImageList;