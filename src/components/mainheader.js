import React, { useContext } from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Badge, Button, Grid, Typography, AppBar, Tab, Tabs, Box
} from '@mui/material/';

import slurm16Icon from '../icons/slurm16small.png';

import AuthContext from "../api/authorisationAPI";
import MessageContext from "../api/messagesAPI";


const MainHeader = () => {

  const messageCtx = useContext(MessageContext);

  const routes = ["/welcome", "/games", "/develop", "/contact", "/emulate", "/blog", "/messages"];
  const location = useLocation();

  const ctx = useContext(AuthContext);

  return (
    <>

      <AppBar position="sticky" sx={{ bgcolor: "black", }}>

        <Grid container spacing={2}>
          <Grid item xs={1} md={1}>
            <Box
              component="img"
              sx={{
                height: 100,
                width: 184,
                maxHeight: { xs: 25, md: 50 },
                maxWidth: { xs: 46, md: 92 },
                marginTop: { xs: 2, md: 1 },
                marginLeft: { xs: 1, md: 0 },
                marginRight: { xs: 5, md: 0 }

              }}
              alt="Slurm16"
              src={slurm16Icon}
            />
          </Grid>



          {ctx.isLoggedIn && <>
            <Grid item xs={8}>
              <Tabs value={location.pathname} sx={{ margin: 1 }} >
                <Tab to={routes[0]} value={routes[0]} label="Welcome" component={Link} />
                <Tab sx={{color:'white'}} to={routes[1]} value={routes[1]} label="Games" component={Link} />
                <Tab to={routes[5]} value={routes[5]} label="Blog" component={Link} />

                
                
                  
                    <Tab label={<Badge badgeContent={messageCtx.unreadMessages} color="primary" sx={{ overflow: "visible" }} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}>Messages</Badge> } to={routes[6]} value={routes[6]} component={Link} />
                  

              </Tabs>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={ctx.onLogout} sx={{ mt: "13px" }}>Admin Logout</Button>
            </Grid>
          </>
          }
          {!ctx.isLoggedIn &&
            <Grid item xs={8}>
              <Tabs value={location.pathname} sx={{
                margin: 1,
                '& .MuiTabs-flexContainer': {
                  flexWrap: 'wrap',
                },
              }}>
                <Tab to={routes[0]} value={routes[0]} label="Welcome" component={Link} />
                <Tab sx={{color:'white'}} to={routes[1]} value={routes[1]} label="Play Games" component={Link} />
                <Tab to={routes[5]} value={routes[5]} label="Read Blog" component={Link} />
                <Tab to={routes[3]} value={routes[3]} label="Contact" component={Link} />


              </Tabs></Grid>}


        </Grid>

      </AppBar>

    </>

  );


};

export default MainHeader;