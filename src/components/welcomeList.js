import React from "react"; 

import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link
  } from '@mui/material/';


//Maps over each paragraph  
const Paragraphs = (paragraphs) => {

  return (
  <>
      
  {
  
  paragraphs.paragraphs.map((paragraph) => {
    return <div><Typography variant="body1" >{paragraph}</Typography><br/></div>
  })
  }
  </>
  )

};


const WelcomeList = (props)=> {

    return (
      <>
      {props.welcomeData.length === 0 && <Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography>
    }
      {props.welcomeData.map((info) => (
        <Card sx={{margin:10}}>
        <CardHeader title={info.question} titleTypographyProps={{variant:'subtitle1' }}></CardHeader>    
        <CardContent sx={{color: "black", bgcolor:"text.secondary"}}>
        {(!info.hasParagraphs) && <Typography variant="body1" >{info.answer}</Typography>}
        {(info.hasParagraphs) && <Paragraphs paragraphs={info.paragraphs}/>}
        {info.hasLink && <Link href={info.link}>{info.linkDescription}</Link>}
        </CardContent>
        </Card>  
      ))}


      </>

);
};

export default WelcomeList;      