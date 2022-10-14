import React from "react"; 

import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link, CircularProgress
  } from '@mui/material/';

  import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

  const AdminButtons = (props) => {

    const {info, last, handleSwap, handleEdit, handleDelete} = props;
  
    return (
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
        {(info.id>1) &&
          <Button sx={{ m: 2 }} variant="contained" startIcon={<ArrowUpwardIcon/>} onClick={() => handleSwap(info.id, info.id-1)}>Move up</Button>
        }
        {(info.id < last ) &&
          <Button sx={{ m: 2 }} variant="contained" startIcon={<ArrowDownwardIcon/>} onClick={() => handleSwap(info.id, info.id+1)}>Move down</Button>
        }
        
              <Button sx={{m:2}} variant="contained" startIcon={<AssignmentTurnedInIcon />} onClick={() => handleEdit(info.firebaseId, info.question, info.answer)}>Edit</Button>
              </Grid>
              <Grid item xs={2} md={2}>
              <Button sx={{m:2}} color="secondary" variant="contained" startIcon={<DeleteIcon/>} onClick={() => handleDelete(info.firebaseId, info.subject)}>Delete</Button>
              </Grid>
              </Grid>
  
  
    );
  
  
  }

//Maps over each paragraph  
const Paragraph = (props) => {

  return (

    <div >
      
      {props.paragraph.split('\\n').map((i, key) => {
        return <div key={props.pkey.concat(key)}>
          <Typography variant="body1">{i}</Typography>
          <br />
        </div>;

      })}
    </div>

  )

};

const WelcomeList = (props)=> {

    return (
      <>
      
      {props.welcomeData.map((info) => (
        <Card key={info.firebaseId} sx={{margin:10}}>
        <CardHeader title={info.question} titleTypographyProps={{variant:'subtitle1' }}></CardHeader>    
        <CardContent sx={{color: "black", bgcolor:"text.secondary"}}>
        <Paragraph paragraph={info.answer} pkey={info.question}/>
        {info.hasLink && <Link href={info.link}>{info.linkDescription}</Link>}
        {props.auth && <AdminButtons info={info} last={props.last} handleSwap={props.handleSwap} handleEdit={props.handleEdit} handleDelete={props.handleDelete}/>}
          
        </CardContent>
        </Card>  
      ))}


      </>

);
};

export default WelcomeList;      