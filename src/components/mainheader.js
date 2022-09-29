import React from "react"; 
import {Link, NavLink, useLocation} from 'react-router-dom';
import {Grid, Typography, AppBar, Tab, Tabs, Box
  } from '@mui/material/';

import slurm16Icon from '../icons/slurm16small.png';  

const MainHeader = () => {

    const routes = ["/welcome", "/games", "/develop","/contact", "/emulate"];
    const location = useLocation();

    return (
        <>
        
        <AppBar position="sticky" sx={{bgcolor: "black",}}> 
        
        <Grid container spacing={2}>
        <Grid item xs={1} md={1}>
        <Box
        component="img"
        sx={{
          height: 100,
          width: 184,
          maxHeight: { xs: 25, md: 50 },
          maxWidth: { xs: 46, md: 92 },
          marginTop: {xs: 2, md: 1},
          marginLeft: {xs: 1, md: 0},
          marginRight: {xs: 5, md: 0}
          
        }}
        alt="Slurm16"
        src={slurm16Icon}
      />
      </Grid>
        
        
        <Grid item xs={10}>
        <Tabs value={location.pathname} sx={{ margin: 1}} >
            <Tab to={routes[0]} value={routes[0]} label="Welcome" component={Link}/>
            <Tab to={routes[1]} value={routes[1]} label="Play Games" component={Link}/>
            <Tab to={routes[3]} value={routes[3]} label="Contact" component={Link}/>
            
        </Tabs>
        </Grid>
        </Grid>

        </AppBar>
        
        </>

    );


};

export default MainHeader;