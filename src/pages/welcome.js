import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete, CardActionArea,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment
  } from '@mui/material/';

  import BackgroundImage from '../images/backdrop2.jpg';  

  import {useEffect, useState } from "react";
  import {db, storage} from '../firebaseConfig';
  import WelcomeList from '../components/welcomeList';

import { collection, query, where, getDocs } from "firebase/firestore";

import { getStorage, ref, getDownloadURL } from "firebase/storage";


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
        
    <Box component="img" sx={{objectFit: 'cover', width:"100%", height: 200}} src={BackgroundImage}></Box>
    <Typography variant="h2" align="center" sx={{py:2}}>Welcome to the official site for Slurm16</Typography>
    <Container>
    
    <WelcomeList welcomeData={loaded} />
    </Container>  

    </>
    );
};

export default Welcome;