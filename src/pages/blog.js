import React, {useState, useContext} from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, CircularProgress, Pagination, Dialog, DialogTitle
} from '@mui/material/';


import BlogDialog from '../components/blogDialog';

import BlogList from '../components/blogList';



import ScrollTop from '../components/scrollTop';

import SnackContext from "../api/snackbarAPI";
import AuthContext from "../api/authorisationAPI";
import BlogContext from "../api/blogAPI";

import NoteAddIcon from '@mui/icons-material/NoteAdd';

const Blog = () => {

  const blogCtx = useContext(BlogContext);
  const authCtx = useContext(AuthContext);
  const snackCtx = useContext(SnackContext);

  const [openDialog, setOpen] = useState(false);

  //Set the page to the first entry
  const [page, setPage] = useState(1);

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
  };

  const blogFunction = async (id, myfunction, messageSuccess, messageFailure) => {

    const success = await myfunction(id);

    if (success) {
      snackCtx.notifyLevel(messageSuccess, "success");
    }
    else {
      snackCtx.notifyLevel(messageFailure, "error");
    }

  }

  const handlePublish = (id) => {
    blogFunction(id, blogCtx.publish, "Blog entry published.", "Unable to publish blog entry.");
  }


  const handleUnpublish = (id) => {

  }


  const handleEdit = (id) => {

  }


  const handleDelete = (id) => {

  }

  const handleImageUpload = (file) => {
    blogCtx.uploadImage(file);
  }

  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      {authCtx.isLoggedIn ?  <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Create new entries or edit existing entries in the blog</Typography> : <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Have fun reading Slurm16's development blog</Typography>
      }
      
      <Container>
        {blogCtx.error === false && blogCtx.loaded === false && <><Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography><CircularProgress /></>
        }
        {blogCtx.error === true && <Typography>Something went wrong.</Typography>}
        {blogCtx.error === false && blogCtx.loaded === true && <>
          <Button variant="contained" startIcon={<NoteAddIcon/>} onClick={()=>{setOpen(true)}} sx={{m: 2}}>Create new entry</Button>
          <Box display="flex" justifyContent="center">
            
            <Pagination count={blogCtx.totalPages} page={page} onChange={handleChange} color="primary" />
          </Box>
          <BlogList blogData={blogCtx.entries} auth={authCtx.isLoggedIn} page={page} handlePublish={handlePublish} handleUnpublish={handleUnpublish} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>}

      </Container>
      <ScrollTop anchor="#back-to-top-anchor" />
    
      <BlogDialog openDialog = {openDialog} handleClose = {handleClose} 
      imageUrl = {blogCtx.imageUrl} imageName= {blogCtx.imageName}
      percentage={blogCtx.percentage} handleImageUpload={handleImageUpload} />
      
    
    
    </>
  );
};

export default Blog;