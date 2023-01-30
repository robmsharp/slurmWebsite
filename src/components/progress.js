import React from "react";

import {
    Snackbar, Typography, Toolbar, AppBar, CssBaseline,
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link, Dialog, DialogTitle, IconButton, FormControlLabel, Checkbox, Select, FormControl
  } from '@mui/material/';

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

const LinearProgressWithLabel = (props, value) => {
//function LinearProgressWithLabel(props, value) {
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



export default LinearProgressWithLabel;