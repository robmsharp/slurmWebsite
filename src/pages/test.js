import React, { useState, useContext, useEffect, useReducer } from "react";
import {
    Snackbar, Typography, Toolbar, AppBar, CssBaseline,
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link
} from '@mui/material/';


import ImageList from '../components/imageList';

import useImage from '../hooks/useImage';

const Test = () => {

//Format of data:
//key, [fileName, imageURL, include, percent, position, mandatory]

    const [data, getData, addImageSlot, updatePercentage, updateImage, updateInclude] = useImage(
        1, "screenshot", 
        new Map([["cover image", [null, null, true, -1, -1, true]], 
        ["screenshot1", [null, null, true, -1, -1, false]],
        ["screenshot2", ["Pete", 'https://firebasestorage.googleapis.com/v0/b/slurm16-9621b.appspot.com/o/blogImages%2Fpete.png?alt=media&token=8409a46d-5454-4510-822f-dd3caafd35a2', true, -1, -1, false]]
    ]
        )
    );


    useEffect(() => {



    }, []
    );


    return (
        <>
            <br />
            {getData("cover image")}
            <ImageList data={data}/>
            
        </>


    );



}

export default Test;