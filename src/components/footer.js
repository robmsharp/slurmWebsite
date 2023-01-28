import React, { useState, useContext, useEffect } from "react";
import {
    Snackbar, Typography, Toolbar, AppBar, CssBaseline,
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link
} from '@mui/material/';


import AuthContext from "../api/authorisationAPI"

const Footer = () => {

    /*Remove this for production (logs in automatically)*/
    const ctx = useContext(AuthContext);

    useEffect(()=> {

        
        ctx.onLogin();
         
        }, []
        );

    return (
        <>
            <footer>

                <Box bgcolor="background.paper" sx={{ padding: 5 }}>
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