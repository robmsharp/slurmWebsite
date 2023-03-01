import React, { useState, useContext, useEffect } from "react";
import {
    Snackbar, Typography, Toolbar, AppBar, CssBaseline,
    Container, Card, Grid, Box, TextField, Autocomplete,
    Avatar, CardHeader, CardContent, Button, Collapse,
    Tooltip, Menu, MenuItem, List, ListItemIcon, ListItem,
    ListItemText, Paper, Divider, ThemeProvider, Tab, Tabs, Badge, CardMedia,
    InputLabel, Input, InputAdornment, Link
} from '@mui/material/';

import { db, storage } from '../firebaseConfig';

import { auth } from '../firebaseConfig';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

import AuthContext from "../api/authorisationAPI"
import { AdminPanelSettingsSharp } from "@mui/icons-material";

const Admin = () => {

    const ctx = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();

    const [openWarning, setOpenWarning] = useState(false);
    const [openError, setOpenError] = useState(false);

    const adminLoginHandler = async () => {


        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;

            const q = query(collection(db, "users"), where("uid", "==", user.uid));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {

                const data = doc.data();

                if (data.admin === true) {
                    
                    //setLoggedIn(true);
                    ctx.onLogin();
                }

                //Case the user is not admin
                else {
                    setOpenWarning(true);
                }
            });

            //Code for adding new users - only gets uncommented if new admin account needs to be created
            /*if (querySnapshot.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }*/

        } catch (err) {
            console.error(err);
            setOpenError(true);
        }

    }

    

    const handleCloseLogout = () => {
        
        ctx.closeLogoutMessage();
    };

    const handleCloseLogin = () => {
        
        ctx.closeLoginMessage();
    };

    const handleCloseWarning = () => {
        
        setOpenWarning(false);
    };

    const handleCloseError = () => {
        
        setOpenError(false);

    };

    /*useEffect(()=> {

        
        ctx.onLogin();
         
        }, []
        );*/
   

    return (
        <>
            <Snackbar open={ctx.openLogin} autoHideDuration={6000} onClose={handleCloseLogin}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseLogin} severity="success" sx={{ width: '100%' }}>
                    You have been successfully logged in.
                </MuiAlert>
            </Snackbar>
            <Snackbar open={ctx.openLogout} autoHideDuration={6000} onClose={handleCloseLogout}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseLogout} severity="success" sx={{ width: '100%' }}>
                    You have been logged out.
                </MuiAlert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Login unsuccessful.
                </MuiAlert>
            </Snackbar>
            <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleCloseWarning}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseWarning} severity="warning" sx={{ width: '100%' }}>
                    You lack admin privileges.
                </MuiAlert>
            </Snackbar>
            
            

                <Box bgcolor="background.paper" sx={{ padding: 5 }}>
                    <Container maxWidth="lg">
                        {!ctx.isLoggedIn &&
                            <Box textAlign='center'>
                                <Button variant="text" onClick={adminLoginHandler}>Admin Login</Button>
                            </Box>
                        }
                    </Container>
                </Box>
        </>


    );



}

export default Admin;