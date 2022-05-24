import React, { useState,useContext } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import MyChart from "./MyChart";
import './dashboard.css'
import MyStock from "./MyStock";
import AuthContext from "../../context/AuthContext";


function Dashboard (props) {
  let {currAsset} = useContext(AuthContext)

    return (
          <Box className='dashboard'>
            <Grid container spacing={4}>
                <Grid zeroMinWidth item xs={12} sm={8}>
                  <span>
                    <div className='stock-logo'>
                      <img className='s-logo' src='' alt='stock logo'/>
                    </div>
                    <h3 className='stock-ticker'>{currAsset}</h3>
                  </span>
                    <MyChart/>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={4}>
                  <div className='fake' id='assets-trading'>
                    <MyStock/>
                  </div>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={12}>
                  <div className='fake' id='assets'></div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;