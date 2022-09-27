import React from "react"; 

import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete, CardActionArea,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment
  } from '@mui/material/';

  import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

  import {useEffect, useState } from "react";
  import {db, storage} from '../firebaseConfig';
  import WelcomeList from '../components/welcomeList';

import { collection, query, where, getDocs } from "firebase/firestore";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import BackgroundImage from '../icons/slurmtitle.png'; 

import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';

function ScrollTop() {
  
  const trigger = useScrollTrigger();

  const handleClick = event => {
    console.log("handle click");
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    console.log(anchor);

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex:1}}
      >
        <Fab size="small" aria-label="scroll back to top" color="primary">
          <KeyboardArrowUpIcon />
        </Fab>
        
      </Box>
    </Zoom>
  );
};

const Welcome = () => {

    var welcomeData = [];

  const [loaded, setLoaded] = useState([]);


  useEffect(()=> {

    
    
    const fetchData = async() => {

      try {

        const q = query(collection(db, "welcome"), where("id", "!=", null));

        const querySnapshot = await getDocs(q);


        querySnapshot.forEach((doc) => {
          
          welcomeData.push(doc.data());
        });

        const copy = welcomeData.slice();
        const sorter = (a, b) => {
            return a['id'] - b['id'];
        };
        copy.sort(sorter);

        setLoaded(copy);

      } catch(err) {
          console.error(err);
      }

  };

  fetchData();
  
  }, []);

    

    return (
    
    <>
    <Toolbar id="back-to-top-anchor" />
        
    <Box component="img" sx={{objectFit: 'cover', maxWidth:"100%"}} src={BackgroundImage}></Box>
    <Typography variant="h2" align="center" sx={{py:2}}>Welcome to Slurm16's website</Typography>
    <Container>
    
    <WelcomeList welcomeData={loaded} />
    </Container>
    <ScrollTop />
        
        
      
    </>
    );
};

export default Welcome;