import React from "react"; 

import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment
  } from '@mui/material/';


import GamesList from '../components/gamesList';

import { collection, query, where, getDocs } from "firebase/firestore";
import {useEffect, useState } from "react";

import {db, storage} from '../firebaseConfig';
  
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const Games = () => {

  var gamesData = [];
  var newGamesData = [];

  var promises=[];

  var promiseIndex = 0;

  const [loaded, setLoaded] = useState([]);


  useEffect(()=> {
    
    

    const fetchData = async() => {

      try {

        const q = query(collection(db, "games"), where("live", "==", true));

        const querySnapshot = await getDocs(q);

        

        querySnapshot.forEach((doc) => {
          
          const data = doc.data();

          let promiseIndices = []

          //Cover images
          const imageRef = ref(storage, 'covers/'+data.coverImage);

          const url = getDownloadURL(imageRef);
          //Insert into array
          promises.splice(promiseIndex, 0, url);
          
          promiseIndices.push(promiseIndex);

          promiseIndex+=1;

          //Screenshots
          const screenshots = data.screenshots;

          screenshots.forEach((screenshot) => {
            const screenshotRef = ref(storage, 'screenshots/'+screenshot);

            const screenshotUrl = getDownloadURL(screenshotRef);
            //Insert into array
            promises.splice(promiseIndex, 0, screenshotUrl);

            promiseIndices.push(promiseIndex);

            promiseIndex+=1;

          })

          const romRef = ref(storage, 'roms/'+data.rom +'.bin');

          const newData = {...data, "romRef": romRef, "promises": promiseIndices};

          gamesData.push(newData);

        });

        Promise.all(promises)
  .then(resolvedPromises => {
    gamesData.map((game) => {

      let screenshots = []
      let imageUrl = null;

      game.promises.map((promise, index) => {

        if (index == 0) {

          imageUrl = resolvedPromises[promise]

        }

        else {

          screenshots.push(resolvedPromises[promise]);

        }

      })
      
      newGamesData.push({...game, "imageUrl": imageUrl, "screenshots": screenshots})
      });  
    console.log(newGamesData);
    setLoaded(newGamesData);
    
  });

        //setLoaded(gamesData);

      } catch(err) {
          console.error(err);
      }

  };

  fetchData();
  console.log(gamesData);
  
  }, []);

    return (
    <>
    <Typography variant="body2" color="text.primary" padding="15px" gutterBottom>Select the game you would like to play</Typography>
    
    <Container>
     
    <GamesList gamesData={loaded} />

    </Container>    
        </>
    );
};

export default Games;