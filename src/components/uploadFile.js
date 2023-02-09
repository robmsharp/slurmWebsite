import React, { useState } from "react";

import {
    Button, Typography, Box, Grid
} from '@mui/material/';


import LinearProgressWithLabel from './progress.js';

const UploadFile = ({ buttonTitle, handleUpload, acceptedFileType, percentage, fieldname, filename }) => {


    const handleFileSelect = (event) => {

        handleUpload(event.target.files[0].name, event.target.files[0]);

    };

    return (
        <>
            <Grid container>
                <Grid container>
                    <Grid item >
                        <Button
                            variant="contained"
                            component="label"
                        >
                            {buttonTitle}
                            <input
                                type="file"
                                name={fieldname}
                                hidden
                                accept={acceptedFileType}
                                onChange={handleFileSelect}
                            />
                        </Button>
                    </Grid>
                    {filename && <Grid item sx={{ ml: 2 }}><Typography>{filename}</Typography></Grid>}
                </Grid>
                {(percentage > 0) && <Grid item xs={12}><Box sx={{ mt: 2, width: '100%' }}>
                    <LinearProgressWithLabel value={percentage} />
                </Box></Grid>}

            </Grid>
            <br />
        </>
    );
};

export default UploadFile;