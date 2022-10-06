import React from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, Link, CircularProgress, IconButton
} from '@mui/material/';

import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';


//Maps over each paragraph  
const Paragraph = (props) => {

  return (
    
    <>
    
      {props.paragraph.split('\\n').map((i, key) => {
        return <div>
          <Typography key={key} variant="body1">{i}</Typography>
          <br/>
          </div>;
        
      })}
    </>
    
  )

};




const MessageList = (props) => {

  return (
    <>
      {props.messageData.length === 0 && <><Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography><CircularProgress /></>
      }
      {props.messageData.map((info) => (
        <>
        <Card key={info.id} sx={{ margin: 10 }}>
        
          <CardHeader title={info.subject} sx={{bgcolor: info.color}}
          
          action={
            <div>
              
                {info.beenRead && <VisibilityIcon />}
                {info.replied && <AssignmentTurnedInIcon />}
              
            </div>
          }
          
          subheader={"Sent by: ".concat(info.name, ", Sent: ", info.dateSent.toDate().toDateString("en-US"))}
          />
          <CardContent sx={{ color: "black", bgcolor: "text.secondary"}}>
          
            <Paragraph paragraph={info.message}/>
            <Grid container spacing={2}>
            <Grid item xs={12} md={10}>
            <Button variant="contained" startIcon={<EmailIcon/>} sx={{m:2}} onClick={() => props.handleEmail(info.email)}>Copy address</Button>
            <Button disabled={info.beenRead} sx={{m:2}} variant="contained" startIcon={<VisibilityIcon/>} onClick={() => props.handleRead(info.id)}>Mark Read</Button>
            <Button disabled={info.replied} sx={{m:2}} variant="contained" startIcon={<AssignmentTurnedInIcon/>} onClick={() => props.handleReply(info.id)}>Mark Replied</Button>
            </Grid>
            <Grid item xs={2} md={2}>
            <Button sx={{m:2}} color="secondary" variant="contained" startIcon={<DeleteIcon/>}>Delete</Button>
            </Grid>
            </Grid>
          </CardContent>
        </Card>
        </>
      ))}


    </>

  );
};

export default MessageList;      