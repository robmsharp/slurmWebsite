import React from "react";

import {
  Typography, Toolbar, AppBar, CssBaseline,
  Container, Card, Grid, Box, TextField, Autocomplete,
  Avatar, CardHeader, CardContent, Button, Collapse,
  Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
  ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
  InputLabel, Input, InputAdornment
} from '@mui/material/';


import BlogList from '../components/blogList';

import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db, storage } from '../firebaseConfig';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import ScrollTop from '../components/scrollTop';

const Blog = () => {

  var blogData = [];
  var newBlogData = [];

  var promises = [];

  const [loaded, setLoaded] = useState([]);

  //Load the blog entries
  useEffect(() => {

    const fetchData = async () => {

      try {


        const q = query(collection(db, "blog"), where("datePosted", "!=", null));

        const querySnapshot = await getDocs(q);



        querySnapshot.forEach((doc) => {


          const data = doc.data();


          console.log(data.title);

          let promiseIndices = []

          //Blog images
          const imageRef = ref(storage, 'blogImages/' + data.image);

          const url = getDownloadURL(imageRef);

          //Insert into promise array
          promises.push(url);

          blogData.push(data);

        });

        Promise.all(promises)
          .then(resolvedPromises => {
            blogData.map((blog, index) => {

              let imageUrl = null;

              imageUrl = resolvedPromises[index];

              newBlogData.push({ ...blog, "imageUrl": imageUrl, "key": blog.datePosted.toDate() });

            });

            // sort by date
            const copy = newBlogData.slice();
            const sorter = (a, b) => {
                return (b["key"] - a["key"]);
            };
            copy.sort(sorter);

            setLoaded(copy);

          });

      } catch (err) {
        console.error(err);
      }

    };

    fetchData();



  }, []);

  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      <Typography variant="body1" color="text.primary" padding="15px" gutterBottom>Have fun reading Slurm16's development blog</Typography>

      <Container>
      <BlogList blogData={loaded} />

      </Container>
      <ScrollTop anchor="#back-to-top-anchor" />
    </>
  );
};

export default Blog;