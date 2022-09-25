import React from "react"; 

import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link
  } from '@mui/material/';

const WelcomeList = (props)=> {

    return (
      <>
      {props.welcomeData.length === 0 && <Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography>
    }
      {props.welcomeData.map((info) => (
        <Card sx={{margin:10}}>
        <CardHeader title={info.question}></CardHeader>    
        <CardContent sx={{color: "black", bgcolor:"text.secondary"}}>
        <Typography variant="body2" >{info.answer}</Typography>
        {info.hasLink && <Link href={info.link}>{info.linkDescription}</Link>}
        </CardContent>
        </Card>  
      ))}


      </>

);
};

export default WelcomeList;      