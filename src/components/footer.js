import React from "react"; 
import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link
  } from '@mui/material/';

const Footer = () => {

    return (

        <footer>
        <Box bgcolor = "background.paper" sx={{padding:5}}>
        <Container maxWidth="lg">    
        <Typography variant = "body2" color="text.secondary" align="center">Slurm16 created by James Sharp</Typography>    
        <Typography variant = "body2" color="text.secondary" align="center">Website created by Robert Sharp</Typography>      
        
        </Container>
        </Box>      
        </footer>


    );



}

export default Footer;