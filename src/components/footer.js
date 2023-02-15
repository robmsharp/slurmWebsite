import React, { useState, useContext, useEffect } from "react";
import {
    Snackbar, Typography, Toolbar, AppBar, CssBaseline,
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment
} from '@mui/material/';

import { Link, NavLink, useLocation } from 'react-router-dom';


import AuthContext from "../api/authorisationAPI"

const Footer = () => {

    /*Remove this for production (logs in automatically)*/
    const ctx = useContext(AuthContext);

    const routes = ["/welcome", "/games", "/contact"];
    const termsRoutes = ["/terms", "/privacy"];

    useEffect(()=> {

        
        ctx.onLogin();
         
        }, []
        );

    return (
        <>
            <footer>
            

                <Box bgcolor="background.paper" sx={{ padding: 5 }}>

                <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <ul>
              {routes.map((route, index) => (
                <li key={index}>
                    <Tab to={route} value={route} label={route.substring(1)} component={Link} />
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Terms
            </Typography>
            <ul>
              {termsRoutes.map((route, index) => (
                <li key={index}>
                    <Tab to={route} value={route} label={route.substring(1)} component={Link} />
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              External Links
            </Typography>
            <ul>
              
                <li key="Repository">
                <Tab
  label="Repository"
  component="a"
  href="https://github.com/jamesrosssharp/SLURM"
  target="_blank"
  rel="noopener noreferrer"
/>
                </li>
              
            </ul>
          </Grid>
        </Grid>
      </Container>

                    <Container maxWidth="lg">
                        <Typography variant="subtitle2" color="text.secondary" align="center">Slurm16 created by James Sharp</Typography>
                        <Typography variant="subtitle2" color="text.secondary" align="center">Website created by Robert Sharp</Typography>
                        
                    </Container>
                </Box>
            </footer>
        </>


    );



}

export default Footer;