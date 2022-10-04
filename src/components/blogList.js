import React from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment, Link, CircularProgress
} from '@mui/material/';


//Maps over each paragraph  
const Paragraph = (props) => {

  return (
    
    <>
    
      {props.paragraph.split('\\n').map((i, key) => {
        return <div>
          {(key===props.imageIndex) && <div><Box component="img" sx={{objectFit: 'cover', maxWidth:"100%"}} src={props.image}></Box><br/><br/></div>}
          <Typography key={key} variant="body1">{i}</Typography>
          <br/>
          </div>;
        
      })}
    </>
    
  )

};


const BlogList = (props) => {

  return (
    <>
      {props.blogData.length === 0 && <><Typography variant="h6" color="text.primary" padding="15px" gutterBottom>Loading information...</Typography><CircularProgress /></>
      }
      {props.blogData.map((info) => (
        <Card key={info.date} sx={{ margin: 10 }}>
          <CardHeader title={info.title} 
          
          subheader={"Written by: ".concat(info.author, ", Posted: ", info.key.toDateString("en-US"))}
          />
          <CardContent sx={{ color: "black", bgcolor: "text.secondary" }}>
          
            <Paragraph paragraph={info.text} image={info.imageUrl} imageIndex={info.imageIndex} />
            
            {info.dateUpdated && <Typography variant="subtitle2" sx={{marginTop: 2, marginBottom: 2}}>Last updated: {info.dateUpdated.toDate().toDateString("en-US")}</Typography>}
  
          </CardContent>
        </Card>
      ))}


    </>

  );
};

export default BlogList;      