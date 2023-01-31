import React, { useState, useContext, useEffect, useReducer } from "react";
import {
    Snackbar, Typography, Toolbar, AppBar, CssBaseline,
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link
} from '@mui/material/';


import UploadFile from '../components/uploadFile';
import CustomTextField from '../components/customFieldText';

const Test = () => {


    const [percentage1, setPercentage1] = useState(0);
    const [percentage2, setPercentage2] = useState(0);

    const handleFileUpload1 = (filename, selectedFile) => {

        console.log("file uploaded:" + filename);
        setPercentage1(50);

    };

    const handleFileUpload2 = (filename, selectedFile) => {

        console.log("file uploaded:" + filename);
        setPercentage2(75);

    };

    useEffect(() => {



    }, []
    );

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
            default:
                return { value: '', isValid: false, helperText: 'Something went wrong' };
                break;
        }


        if (action.val.trim() === '') {
            return { value: action.val, isValid: false, helperText: 'You must include a '.concat(inputName) };
        }
        else {
            return { value: action.val, isValid: true, helperText: '' }
        }

    };

    const [titleState, dispatchTitle] = useReducer(textReducer, {
        value: '',
        isValid: null,
        helperText: ''
    });

    const [dState, dispatchD] = useReducer(textReducer, {
        value: '',
        isValid: null,
        helperText: ''
    });

    return (
        <>
            <br />
            <UploadFile buttonTitle="Upload rom" handleUpload={handleFileUpload1} acceptedFileType=".bin" percentage={percentage1} fieldname="rom" />
            <UploadFile buttonTitle="Upload bin" handleUpload={handleFileUpload2} acceptedFileType=".bin" percentage={percentage2} fieldname="bin" />

            <CustomTextField label="title" placeholder="Input title" required="true" state={titleState} dispatch={dispatchTitle} type="TITLE_INPUT" />

            <CustomTextField label="description" placeholder="Input description" required="true" state={dState} dispatch={dispatchD} type="SHORT_DESCRIPTION_INPUT" />

        </>


    );



}

export default Test;