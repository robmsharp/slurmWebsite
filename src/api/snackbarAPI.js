
import React, { useState, useEffect } from 'react';

import MuiAlert from '@mui/material/Alert';
import {
    Snackbar
} from '@mui/material/';

import { useSnackbar } from 'notistack';

const SnackbarContext = React.createContext();


export const SnackbarContextProvider = (props) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    


    //Makes a green notification appear at bottom left
    const notify = (message) => {

        enqueueSnackbar(message, {variant: "success"});

    }

    //Makes a notification appear at bottom left
    //Green (success) is standard
    const notifyLevel = (message, severity) => {

        enqueueSnackbar(message, {variant: severity});

    }

   

    return (
        <SnackbarContext.Provider
            value={{
                notify: notify,
                notifyLevel: notifyLevel

            }}
        >
            {props.children}
            
        </SnackbarContext.Provider>
    );
};

export default SnackbarContext;