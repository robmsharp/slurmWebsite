import React, {useContext, useState } from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, CircularProgress
} from '@mui/material/';

import MessageList from '../components/messageList';
import MessageContext from "../api/messagesAPI";
import SnackbarContext from "../api/snackbarAPI";
import ScrollTop from '../components/scrollTop';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const Messages = () => {

  //Load the message Context
  const messageCtx = useContext(MessageContext);
  const snackCtx = useContext(SnackbarContext);

  //Used for the delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [deleteSubject, setDeleteSubject] = useState();

  //Handle the deletion after confirming
  const deleteMessageConfirmed = (id) => {

    if (messageCtx.deleteMessage(id)) {
      snackCtx.notify("Message deleted.");
    }

    else {
      snackCtx.notifyLevel("Unable to delete message", "error");
    }

    //Close the dialog
    setDeleteOpen(false);

  }

  //Copy email to clipboard
  const handleEmail = (email) => {

    navigator.clipboard.writeText(email);
    snackCtx.notify(email.concat(" copied to clipboard"));

  }

  //Mark as read
  const handleRead = (id) => {

    if (messageCtx.markAsRead(id)) {
      snackCtx.notify("Message marked as read.");
    }

    else {
      snackCtx.notifyLevel("Unable to modify message", "error");
    }

  }

  //Mark as replied
  const handleReply = (id) => {

    if (messageCtx.markAsReplied(id)) {
      snackCtx.notify("Message marked as replied.");
    }

    else {
      snackCtx.notifyLevel("Unable to modify message", "error");
    }

  }

  //Close the dialog when click cancel
  const closeDialog = () => {
    setDeleteOpen(false);
  }

  //Open the delete dialog
  const handleDelete = (id, subject) => {
    setDeleteId(id);
    setDeleteSubject(subject);
    setDeleteOpen(true);

  }

  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Review the contact messages</Typography>

      <Container>
      {messageCtx.denied === false && messageCtx.loaded === false && <><Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography><CircularProgress /></>
      }
        {messageCtx.denied === true && <Typography>Access denied.</Typography>}
        {messageCtx.denied === false && messageCtx.loaded != false && <MessageList messageData={messageCtx.loaded} handleRead={handleRead} handleReply={handleReply} handleEmail={handleEmail} handleDelete={handleDelete} />}

      </Container>
      <ScrollTop anchor="#back-to-top-anchor" />

      <Dialog open={deleteOpen}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <Box sx={{ p: 5, color: "black", bgcolor: "text.secondary" }}>
          <Typography>
            {
              "You are about to delete the message \"".concat(deleteSubject, "\". This cannot be undone.")}
          </Typography>
          <Grid container spacing={1} justify='space-between' sx={{ mt: 5 }}>
            <Grid item xs={12} md={4}>
              <Button variant="contained" onClick={closeDialog}>Cancel</Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button color="secondary" variant="contained" onClick={() => deleteMessageConfirmed(deleteId)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>

    </>
  );
};

export default Messages;