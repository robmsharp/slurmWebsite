import React from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment
} from '@mui/material/';


const NotFound = () => {

  return (
    <>
      
      <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Page not found</Typography>

    </>
  );
};

export default NotFound;