import React from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, Link, CircularProgress
} from '@mui/material/';

import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';


//Maps over each paragraph  
const Paragraph = (props) => {

  return (

    <>
      
      {props.paragraph.split('\\n').map((i, key) => {
        return <div>
          {(key === props.imageIndex-1) && <div><Box display="flex" alignItems="center"
        justifyContent="center"><Box component="img" src={props.image}></Box></Box><br /><br /></div>}
          <Typography key={key} variant="body1">{i}</Typography>
          <br />
        </div>;

      })}
    </>

  )

};

const AdminButtons = (props) => {

  const {info, handlePublish, handleUnpublish, handleEdit, handleDelete} = props;

  return (
    
    <Grid container spacing={2}>
      <Grid item xs={12} md={10}>
      {info.published===false &&
        <Button sx={{ m: 2 }} variant="contained" startIcon={<VisibilityIcon/>} onClick={() => handlePublish(info.id)}>Publish</Button>
      }
      {info.published===true &&
        <Button sx={{ m: 2 }} variant="contained" startIcon={<VisibilityOffIcon/>} onClick={() => handleUnpublish(info.id)}>Unpublish</Button>
      }
      
            <Button sx={{m:2}} variant="contained" startIcon={<AssignmentTurnedInIcon />} onClick={() => handleEdit(info.id)}>Edit</Button>
            </Grid>
            <Grid item xs={2} md={2}>
            <Button sx={{m:2}} color="secondary" variant="contained" startIcon={<DeleteIcon/>} onClick={() => handleDelete(info.id, info.subject)}>Delete</Button>
            </Grid>
            </Grid>


  );


}


const BlogList = (props) => {

  return (
    <>

      {props.blogData.filter(info => info.published === true || props.auth).filter(info => info.pageIndex === props.page).map((info) => (
        <Card key={info.date} sx={{ margin: 10 }}>
          <CardHeader title={info.title} titleTypographyProps={{variant:'subtitle3' }}

            subheader={"Written by: ".concat(info.author, ", Posted: ", info.key.toDateString("en-US"))}
          />
          <CardContent sx={{ color: "black", bgcolor: "text.secondary" }}>

            <Paragraph paragraph={info.text} image={info.imageUrl} imageIndex={info.imageIndex} />

            {/*include the image if it is -1 location at the bottom*/}
            {(info.imageIndex===-1) && <div><Box display="flex" alignItems="center"
        justifyContent="center"><Box component="img" src={info.imageUrl}></Box></Box><br /><br /></div>}
          

            {info.dateUpdated && <Typography variant="subtitle2" sx={{ marginTop: 2, marginBottom: 2 }}>Last updated: {info.dateUpdated.toDate().toDateString("en-US")}</Typography>}
            {props.auth && <AdminButtons info={info} handlePublish={props.handlePublish} handleUnpublish={props.handleUnpublish} handleEdit={props.handleEdit} handleDelete={props.handleOpenDelete}/>}
          
          </CardContent>
        </Card >
      ))}
      


    </>

  );
};

export default BlogList;      