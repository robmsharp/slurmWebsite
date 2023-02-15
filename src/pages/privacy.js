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

const Privacy = () => {

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
    
      const terms = `We take your privacy seriously and want to be transparent about how we handle your personal information on our website. This privacy statement explains our policies and practices for protecting your privacy.\n

      Use of Cookies: We do not use cookies on our website. We do not track your browsing activities, preferences, or behavior. We do not collect any personal information through cookies.\n
  
      Contact Messages: If you contact us through our website, we may collect your name, email address, and any other personal information that you voluntarily provide to us. We use this information to respond to your inquiry and to provide you with the information or services that you have requested. We do not share this information with any third parties, except as required by law.\n
  
      Security: We take reasonable measures to protect the personal information that you provide to us through our website. We use encryption, firewalls, and other security technologies to protect your information from unauthorized access, disclosure, alteration, or destruction. However, we cannot guarantee that our security measures will prevent all unauthorized access or hacking attempts.\n
  
      Third-Party Links: Our website may contain links to third-party websites, applications, or services. We do not endorse or control the privacy policies or practices of these third parties. We encourage you to review the privacy policies of these third parties before using their services.\n
  
      Changes to this Privacy Statement: We may update this privacy statement from time to time to reflect changes in our policies and practices. We will notify you of any significant changes by posting a notice on our website.\n
  
  If you have any questions or concerns about our privacy practices, please contact us using the contact form. We value your privacy and appreciate your trust in us.`
        return (
            <Container>
            <Paragraph paragraph={terms}/>
            </Container>
    
    
        );
    
    
    
    }

export default Privacy;