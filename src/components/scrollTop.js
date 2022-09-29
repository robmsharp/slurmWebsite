import React from "react"; 

import {Popper, Popover, Typography, Toolbar, AppBar, CssBaseline, 
    Container, Card, Grid, Box, TextField, Autocomplete, CardActionArea,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem, 
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment
  } from '@mui/material/';

  import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollTop(props) {
  
  const trigger = useScrollTrigger();

  const handleClick = event => {
    //console.log("handle click");
    const anchor = (event.target.ownerDocument || document).querySelector(
      props.anchor
    );

    //console.log(anchor);

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

export default ScrollTop;