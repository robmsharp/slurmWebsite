import {Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment
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


/*
        action={
          <IconButton aria-label="settings" onClick = {moreAction}>
            <MoreVertIcon />
          </IconButton>
        }*/

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const GamesList = (props)=> {

  const history = useHistory();

  const [expanded, setExpanded] = React.useState([false, false]);

const moreAction = () => {
  console.log("Clicked button!");
}

const handlePlay = (rom) => {

  


  localStorage.setItem('rom', rom);
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

  console.log("props");
  console.log(props);

return (
  <>
  
  {props.gamesData.length === 0 && <Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading games list...</Typography>
    } 
    <Grid container xs={12} sm={12}>

    {props.gamesData.map((game, index) => { 
    
    return (
      
          
          <Grid item xs={6}>
    <Card sx={{margin: '20px', padding: '10px'}}>
    <CardHeader 

        title={game.name}
        subheader={game.shortDescription}
      
      />
      <CardMedia
        component="img"
        width="320"
        height="200"
        image={game.imageUrl}
        alt={game.name}
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent>
      <Box textAlign='center'>
      <Button variant="contained" onClick={() => handlePlay(game.rom)} >
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
        <Typography >{game.longDescription}</Typography>
          {/*<Typography paragraph>Game index: {index}</Typography>*/}
          {game.screenshots.map((screenshot, index) => {
            return(
              <>
          {/*<Typography paragraph>Screenshot index: {index}</Typography>*/}
          <CardMedia
        component="img"
        width="320"
        height="200"
        image={screenshot}
        alt="screenshot"
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      </>
      );
      
      })}
      <Typography paragraph>Last updated: {game.lastUpdated.toDate().toDateString("en-US")}</Typography>

      <Box textAlign='center'>
      <Button variant="contained" onClick={() => handleDownload(game.romRef)} >
  Download {game.name} rom
</Button>
</Box>

        </CardContent>
      </Collapse>

      </Card>
      </Grid>
        )})}
      </Grid>
        
</>
);
};

export default GamesList;