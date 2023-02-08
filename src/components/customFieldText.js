import React, { useReducer } from 'react';
import {
  Snackbar, Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, Link, Dialog, DialogTitle, IconButton, FormControlLabel, Checkbox, Select, FormControl
} from '@mui/material/';

const CustomTextField = ({ label, placeholder, required, state, dispatch, type, multi }) => {
  
  

  const handleChange = event => {
    console.log(event.target.name);
    dispatch({ type: event.target.name, val: event.target.value });
  };


  return (
    <>
    <br />
    {(!multi) ?
    <TextField
      id="outlined-basic"
      placeholder={placeholder}
      label={label}
      variant="outlined"
      required={required}
      name={type}
      sx={{ width: "100%" }}
      onChange={handleChange}
      value={state.value}
      error={state.isValid === false}
      helperText={state.helperText}
    />
    :
    <TextField
      id="outlined-basic"
      placeholder={placeholder}
      label={label}
      variant="outlined"
      required={required}
      name={type}
      sx={{ width: "100%" }}
      onChange={handleChange}
      value={state.value}
      error={state.isValid === false}
      helperText={state.helperText}
      multiline
                maxRows={20}
                minRows={3}
    />
    
    }
    <br />
    </>
  );
};

export default CustomTextField;
