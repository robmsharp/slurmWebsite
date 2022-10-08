
import React, { useState, useEffect } from 'react';

import MuiAlert from '@mui/material/Alert';
import {
    Snackbar
} from '@mui/material/';


const SnackbarContext = React.createContext();


export const SnackbarContextProvider = (props) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState("success");


    //Makes a green notification appear at bottom left
    const notify = (message) => {

        setOpen(false);
        setMessage(message);
        setSeverity("success");
        setOpen(true);

    }

    //Makes a notification appear at bottom left
    //Green (success) is standard
    const notifyLevel = (message, severity) => {

        setOpen(false);

        if (message) {
            setMessage(message);
        }
        else {
            console.log("missing message for notification");
        }
        if (severity) {
            setSeverity(severity);
        }
        else {
            setSeverity("success");
        }
        setOpen(true);

    }

    const handleClose = () => {
        
        setOpen(false);

    };

    return (
        <SnackbarContext.Provider
            value={{
                notify: notify,
                notifyLevel: notifyLevel

            }}
        >
            {props.children}
            <Snackbar open={open} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export default SnackbarContext;