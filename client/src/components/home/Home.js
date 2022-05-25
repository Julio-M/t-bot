import React, { useState } from "react";
import AuthContext from "../../context/AuthContext";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './home.css'

function Home (props) {

    return (
        <Box className='register-page'>
            <Grid container spacing={4}>
                <Grid zeroMinWidth item xs={12} sm={6}>
                Welcome
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={6}>
                    You are loggen in! 
                </Grid>
           </Grid>
        </Box>
    );
}

export default Home;