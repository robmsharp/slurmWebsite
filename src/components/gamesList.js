import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, CircularProgress
} from '@mui/material/';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import React from 'react';
import { styled } from '@mui/material/styles';

import { getDownloadURL } from "firebase/storage";

import { saveAs } from "file-saver";

import { useHistory } from 'react-router-dom';

import Skeleton from '@mui/material/Skeleton';
import DeleteIcon from '@mui/icons-material/Delete';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { LayersTwoTone } from '@mui/icons-material';

import { useState} from "react";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const GamesList = (props) => {

  const {data, handleOpenEdit, loggedIn, last, handleSwap,
  handleDelete, loaded, admin} = props;

  const history = useHistory();

  const [expanded, setExpanded] = useState(Array.from({ length: last }).fill(false));

  const moreAction = () => {
    console.log("Clicked button!");
  }

  const handlePlay = (rom, tip) => {




    localStorage.setItem('rom', rom);
    localStorage.setItem('tip', tip);
    const path = '/emulate';
    history.push(path);


  }

  const handleDownload = (romRef) => {

    console.log(romRef);

    getDownloadURL(romRef)
      .then((url) => {

        /*const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();}).catch((error) => {
            console.log("Could not download")*/

        saveAs(
          url
        );

      });

  }

  const handleExpandClick = (clickedIndex) => {

    let newArray = expanded.map((item, index) => {

      if (index == clickedIndex) {

        return !item

      }
      return item

    })

    setExpanded(newArray);
  }


  return ( loaded ? 
    <>
    
    


      <Grid container>

        {data
        .filter(game => admin || game.live !== false)
        .sort((a, b) => a.id - b.id).map((game, index) => {


          return (


            <Grid item xs={12} md={6} key={"game"+game.id} >
              <Card key={"card"+game.id} sx={{ margin: '20px', padding: '10px' }}>
                <CardHeader

                  title={game.name}
                  subheader={game.shortDescription}

                />

                <CardContent>
                  <Box textAlign='center' marginBottom='10'>

                  {/*Can edit if logged in*/}
                  {(loggedIn) && <Box textAlign='center' sx={{pb: 5}}>
                    
                  
                    <Grid container spacing={1}>
            <Grid item xs = {12} md={9}>
            <Button variant="contained" onClick={() => handleOpenEdit(game.id) } sx={{mr: 1}} startIcon={<AssignmentTurnedInIcon/>}>
                      Edit
                    </Button>
                    {(game.id>1) &&
                    <Button variant="contained" onClick={() => handleSwap(game.id, game.id-1)} sx={{mr: 1}} startIcon={<ArrowUpwardIcon/>}>
                      Up
                    </Button>}
                    {(game.id < last ) &&
                    <Button variant="contained" onClick={() => handleSwap(game.id, game.id+1)} startIcon={<ArrowDownwardIcon/>}>
                      Down
                    </Button>}
                    </Grid>
            <Grid item xs={2} md={2}>
             <Button color="secondary" variant="contained" startIcon={<DeleteIcon/>} onClick={() => handleDelete(game.id)} >
                      Delete
                    </Button>
            </Grid>
            </Grid>


                  </Box>}

                    <Box component="img" sx={{ border: 3, objectFit: 'contain', width: "320", height: "200" }} src={game.coverImage}></Box>
                  </Box>
                  <Box textAlign='center'>
                    <Button variant="contained" onClick={() => handlePlay(game.rom, game.tip)} >
                      Play {game.name}
                    </Button>
                  </Box>

                </CardContent>

                <CardActions>
                  <ExpandMore

                    expand={expanded[index]}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expanded[index]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>

                <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="body1">{game.longDescription}</Typography>
                    <Grid container>
                    {game.imagesArray.map((value, id) => {
                      return (
                        <Grid item key={game.id+"grid"+value[0]}>
                          
                          <CardMedia
                            key={game.id+"screenshot"+value[0]}
                            component="img"
                            width="320"
                            height="200"
                            image={value[1][1]}
                            alt={value[1][0]}
                            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                            
                          />
                            
                          
                          
                        </Grid>
                      );

                    })}
                    </Grid>

                    <Typography variant="subtitle2" sx={{ marginTop: 2, marginBottom: 2 }}>Last updated: {game.lastUpdated.toDate().toDateString("en-US")}</Typography>

                    <Box textAlign='center'>
                      <Button variant="contained" onClick={() => handleDownload(game.romRef)} >
                        Download {game.name} rom
                      </Button>
                    </Box>

                  </CardContent>
                </Collapse>

              </Card>
            </Grid>
          )
        })}
      </Grid>
    
    </> : <></>
      );
};

export default GamesList;