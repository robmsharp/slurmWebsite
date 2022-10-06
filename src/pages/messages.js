import React from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment
} from '@mui/material/';


import MessageList from '../components/messageList';

import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db, storage } from '../firebaseConfig';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import ScrollTop from '../components/scrollTop';

import { onSnapshot } from 'firebase/firestore';

import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const Messages = () => {

  const [loaded, setLoaded] = useState([]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [deleteSubject, setDeleteSubject] = useState();

  const handleRead = (id) => {

    const data = { beenRead: true }

    const docRef = doc(db, "messages", id);

    setDoc(docRef, data, { merge: true })

  }

  const handleReply = (id) => {

    const data = { replied: true }

    const docRef = doc(db, "messages", id);

    setDoc(docRef, data, { merge: true })

  }

  const handleEmail = (email) => {

    navigator.clipboard.writeText(email);

  }

  
  useEffect(() => {
    const colRef = collection(db, 'messages')
    const snap = onSnapshot(colRef, (snapshot) => {


      //const q = query(collection(db, "messages"), where("dateSent", "!=", null));

      //const querySnapshot = await getDocs(q);

      //querySnapshot.forEach((doc) => {

      console.log("Snapshotting!");

      var messageData = [];

      snapshot.docs.forEach((doc) => {

        const data = doc.data();

        var color = "#0f790f";

        if (data.beenRead === true) {
          color = "#263469";
        }

        messageData.push({ ...data, "color": color, "id": doc.id });

      });

      // sort by date
      const copy = messageData.slice();
      const sorter = (a, b) => {
        return (b["dateSent"] - a["dateSent"]);
      };
      copy.sort(sorter);

      setLoaded(copy);
      //setLoaded(messageData);

    });
  }, []);



  const deleteMessage = (id) => {
    console.log(id);

    const docRef = doc(db, "messages", id);

    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.")
      })
      .catch(error => {
        console.log(error);
      })

    setDeleteOpen(false);

  }

  const closeDialog = () => {
    setDeleteOpen(false);
  }

  const handleDelete = (id, subject) => {
    console.log("Deleting");
    setDeleteId(id);
    setDeleteSubject(subject);
    setDeleteOpen(true);

  }

  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Review the contact messages</Typography>

      <Container>
        <MessageList messageData={loaded} handleRead={handleRead} handleReply={handleReply} handleEmail={handleEmail} handleDelete={handleDelete} />

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
              <Button color="secondary" variant="contained" onClick={() => deleteMessage(deleteId)}>
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