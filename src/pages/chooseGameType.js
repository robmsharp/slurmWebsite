import React from "react"; 
import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete, CardActionArea,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment
  } from '@mui/material/';

  import {Link, NavLink, useLocation} from 'react-router-dom';
const ChooseGameType = () => {

    return (
    <>
    <Typography variant="body2" color="text.primary" padding="15px" gutterBottom>Select how you would like to play</Typography>
    
        
    <Container>
    <Grid container xs={12} sm={12}>
      
        <Grid item xs={6}>
    <Card sx={{margin: '20px', padding: '10px'}}>
    <CardActionArea component={Link} to="/games">
    <CardHeader 

        title="Play online"
        subheader="Play the games in your webbrowser"
      />
    </CardActionArea>
    </Card>
    </Grid>

    <Grid item xs={6}>
    <Card sx={{margin: '20px', padding: '10px'}}>
    <CardHeader 

        title="Play on your desktop"
        subheader="Download a desktop emulator"
      />
    </Card>
    </Grid> 

    </Grid>
    </Container>    
        </>
    );
};

export default ChooseGameType;