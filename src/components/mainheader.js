import React from "react"; 
import {Link, NavLink, useLocation} from 'react-router-dom';
import {Typography, AppBar, Tab, Tabs, Box
  } from '@mui/material/';

import slurm16Icon from '../icons/slurm16small.png';  

const MainHeader = () => {

    const routes = ["/welcome", "/choosegametype", "/develop","/contact", "/emulate"];
    const location = useLocation();

    return (
        <>
        
        <AppBar position="relative"> 
        
        
        <Box
        component="img"
        sx={{
          height: 100,
          width: 184,
          maxHeight: { xs: 100, md: 50 },
          maxWidth: { xs: 184, md: 92 },
        }}
        alt="Slurm16"
        src={slurm16Icon}
      />
        
        </AppBar>
        
        <Tabs value={location.pathname} >
            <Tab to={routes[0]} value={routes[0]} label="Welcome" component={Link}/>
            <Tab to={routes[1]} value={routes[1]} label="Play Games" component={Link}/>
            <Tab to={routes[2]} value={routes[2]} label="Develop" component={Link}/>
            <Tab to={routes[3]} value={routes[3]} label="Contact" component={Link}/>
            <Tab to={routes[4]} value={routes[4]} label="Emulate" component={Link}/>
        </Tabs>
        
        </>

    );


};

export default MainHeader;