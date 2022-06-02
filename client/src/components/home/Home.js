import React, { useState,useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './home.css'

function Home (props) {

    let {user} = useContext(AuthContext)

    return (
        <Box className='home' style={{height:'100vh'}}>
            <Grid container spacing={4}>
                <Grid zeroMinWidth item xs={12} sm={12}>
                    <h1 className='w-msg'>Welcome {user.username}</h1>
                    <div className='r-img'>
                    <img src="https://www.transparentpng.com/thumb/robot/blue-vector-spiked-robot-clipart-png-upnMIj.png" alt="blue vector spiked robot clipart png @transparentpng.com"></img>
                    </div>
                </Grid>
           </Grid>
        </Box>
    );
}

export default Home;