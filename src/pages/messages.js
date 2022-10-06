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

import { onSnapshot} from 'firebase/firestore';

import { getFirestore, doc, setDoc } from "firebase/firestore";

const Messages = () => {

  
 

  const [loaded, setLoaded] = useState([]);


  const handleRead = (id) => {

    const data = {beenRead: true}
  
    const docRef = doc(db, "messages", id);
  
    setDoc(docRef, data, { merge:true })
  
  }
  
  const handleReply = (id) => {

    const data = {replied: true}
  
    const docRef = doc(db, "messages", id);
  
   setDoc(docRef, data, { merge:true })
  
  }
  
  const handleEmail = (email) => {

    navigator.clipboard.writeText(email);
  
  } 

  //Load the blog entries
  //useEffect(() => {

    /*const colRef = collection(db, 'messages')
    const snap = onSnapshot(colRef, (snapshot) => {
      console.log("snapping");
    });*/
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

          messageData.push({...data, "color": color, "id": doc.id});

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

  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Review the contact messages</Typography>

      <Container>
      <MessageList messageData={loaded} handleRead={handleRead} handleReply={handleReply} handleEmail={handleEmail}/>

      </Container>
      <ScrollTop anchor="#back-to-top-anchor" />
    </>
  );
};

export default Messages;