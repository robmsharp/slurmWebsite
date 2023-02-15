import React, { useState, useContext, useEffect, useReducer } from "react";
import {
    Snackbar, Typography, Toolbar, AppBar, CssBaseline,
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link
} from '@mui/material/';


import ImageList from '../components/imageList';

import useImage from '../hooks/useImage';

const Terms = () => {

    //Maps over each paragraph  
const Paragraph = (props) => {

    return (
  
      <>
        
        {props.paragraph.split('\n').map((i, key) => {
          return <div>
            
            <Typography key={key} variant="body1">{i}</Typography>
            <br />
          </div>;
  
        })}
      </>
  
    )
  
  };

  const terms = `Thank you for considering our website as your platform for playing games. We would like to provide the following terms and conditions for your understanding and acceptance prior to using our services.\n

  Use of the Website: By accessing our website and using our services, you agree to be bound by these terms and conditions.\n
  
  No Liability: We do not assume any liability for any damage or loss that may arise as a result of your use of our website, including but not limited to crashing your web browser, computer system or any other equipment, or any other technical or security issues that may arise.\n
  
  Third-Party Websites and Content: Our website may contain links to third-party websites or content, and we do not assume any responsibility for the accuracy, availability, or safety of such websites or content. Any use of such third-party websites or content is at your own risk.\n
  
  Copyright and Intellectual Property: All content and materials on our website, including but not limited to the games, text, graphics, logos, and software, are protected by copyright and intellectual property laws. You agree not to copy, reproduce, modify, distribute, or create derivative works of any content or materials on our website without our prior written consent.\n
  
  Modifications to the Terms and Conditions: We reserve the right to modify or update these terms and conditions at any time, and such modifications or updates will be effective immediately upon posting on our website. Your continued use of our website after any such modifications or updates shall be deemed as your acceptance of the modified terms and conditions.\n
  
  Governing Law and Jurisdiction: These terms and conditions shall be governed by and construed in accordance with the laws of Australia. Any dispute arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts of Australia.\n
  
  We hope that you enjoy using our website and playing our games. If you have any questions or concerns about these terms and conditions, please feel free to contact us using the contact form.`;

    return (
        <Container>
        <Paragraph paragraph={terms}/>
        </Container>


    );



}

export default Terms;