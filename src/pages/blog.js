import React, { useState, useContext } from "react";

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
  const [title, setTitle] = useState('');
  const [instruction, setInstruction] = useState('');

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState('');

  const [imageDataArray, setImageDataArray] = useState({ 
    "location1": 1, "include1": false, "location2": 1, "include2": false,  "location3": 1, "include3": false });

  const [imageIndexArray, setImageIndexArray] = useState([1, 2, 3]);
  const [lastImageIndex, setLastImageIndex] = useState(3);

  const addImageSlot = () => {

    setImageIndexArray((prevArray) => [...prevArray, lastImageIndex + 1]);

    setImageDataArray(prev => ({ ...prev, ["include".concat(lastImageIndex + 1)]: false }));

    setLastImageIndex(prev => prev + 1);

  }

  //Set the page to the first entry
  const [page, setPage] = useState(1);

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
  };

  const cantCreate = (reason) => {
    if (reason === "image") {
      snackCtx.notifyLevel("Creating blog entry with image requires a fully uploaded image", "error");
    }

    if (reason === "missing title") {
      snackCtx.notifyLevel("Creating blog entry requires a title", "error");
    }


    if (reason === "missing text") {
      snackCtx.notifyLevel("Creating blog entry requires text", "error");
    }

  }

  const blogFunction = async (id, myfunction, messageSuccess, messageFailure) => {

    const success = await myfunction(id);

    if (success) {
      snackCtx.notifyLevel(messageSuccess, "success");
    }
    else {
      snackCtx.notifyLevel(messageFailure, "error");
    }

  }

  const handleCreate = async (data) => {
    const success = await blogCtx.createEntry(data);

    //Close the dialog upon successful creation
    if (success) {
      snackCtx.notifyLevel("Blog entry created.", "success");
      setOpen(false);
    }
    else {
      snackCtx.notifyLevel("Unable to create blog entry.", "error");
    }
  }

  const handlePublish = (id) => {
    blogFunction(id, blogCtx.publish, "Blog entry published.", "Unable to publish blog entry.");
  }


  const handleUnpublish = (id) => {

  }


  const handleEdit = (id) => {
    setInstruction('Edit the details of the blog entry and upload new images.');
    setTitle('Edit existing entry');
    setOpen(true);
  }


  const handleOpenDelete = (id, title) => {
    setDeleteId(id);
    setDeleteTitle(title);
    setDeleteOpen(true);

  }


  const handleDelete = async () => {

    const success = await blogCtx.deleteEntry(deleteId);

    //Close the dialog upon successful creation
    if (success) {
      snackCtx.notifyLevel("Blog entry deleted.", "success");
      setDeleteOpen(false);
    }
    else {
      snackCtx.notifyLevel("Unable to delete blog entry.", "error");
    }

  }

  
  const handleImageUpload = (index, file) => {
    
    blogCtx.uploadImage(file, index, setImageDataArray);
    
  }

  const handleOpenCreate = () => {
    setInstruction('Fill out the details of the blog entry and upload images.');
    setTitle('Create new entry');
    setOpen(true);

  }

  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      {authCtx.isLoggedIn ? <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Create new entries or edit existing entries in the blog</Typography> : <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Learn about Slurm16's development through this blog</Typography>
      }

      <Container>
        {blogCtx.error === false && blogCtx.loaded === false && <><Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography><CircularProgress /></>}

        {blogCtx.error === true && <Typography>Something went wrong.</Typography>}

        {blogCtx.error === false && blogCtx.loaded === true && authCtx.isLoggedIn && <Button variant="contained" startIcon={<NoteAddIcon />} onClick={handleOpenCreate} sx={{ m: 2 }}>Create new entry</Button>}

        {blogCtx.error === false && blogCtx.loaded === true && <>
          <Box display="flex" justifyContent="center">

            <Pagination count={blogCtx.totalPages} page={page} onChange={handleChange} color="primary" />
          </Box>
          <BlogList blogData={blogCtx.entries} auth={authCtx.isLoggedIn} page={page} handleOpenDelete={handleOpenDelete} handlePublish={handlePublish} handleUnpublish={handleUnpublish} handleEdit={handleEdit} />
        </>}

      </Container>
      <ScrollTop anchor="#back-to-top-anchor" />

      <BlogDialog title={title} instruction={instruction} openDialog={openDialog} handleClose={handleClose}
        imageUrl={blogCtx.imageUrl} imageName={blogCtx.imageName}
        percentage={blogCtx.percentage} handleImageUpload={handleImageUpload}
        cantCreate={cantCreate} handleCreate={handleCreate}
        imageDataArray={imageDataArray}
        setImageDataArray={setImageDataArray}
        imageIndexArray={imageIndexArray}
        setImageIndexArray={setImageIndexArray}
        lastImageIndex={lastImageIndex}
        setLastImageIndex={setLastImageIndex}
        addImageSlot={addImageSlot}


      />

      {/* Dialog for deletion confirmation */}
      <Dialog open={deleteOpen}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <Box sx={{ p: 5, color: "black", bgcolor: "text.secondary" }}>
          <Typography>
            {
              "You are about to delete the message \"".concat(deleteTitle, "\". This cannot be undone.")}
          </Typography>
          <Grid container spacing={1} justify='space-between' sx={{ mt: 5 }}>
            <Grid item xs={12} md={4}>
              <Button variant="contained" onClick={() => { setDeleteOpen(false) }}>Cancel</Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button color="secondary" variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>



    </>
  );
};

export default Blog;