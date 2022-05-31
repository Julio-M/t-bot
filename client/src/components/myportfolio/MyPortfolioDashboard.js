import React, { useState,useContext } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import './myportfoliodashboard.css'
import AuthContext from "../../context/AuthContext";
import { Button } from '@mui/material';
import PortfolioChart from "./PortfolioChart";



function MyPortfolioDashboard (props) {

  let {myPositions,portfolioData,setPeriod} = useContext(AuthContext)



  const handleClick = (e) => {
    let name = e.target.name
    switch(name) {
      case 'hour':
        setPeriod('1D')
        break;
      case 'day':
        setPeriod('1D')
        break;
      case 'week':
        break;
      case 'month':
        setPeriod('1M')
        break;
      case 'year':
        setPeriod('1A')
        break;
      default:
        setPeriod('1D')
        break;
    }
  }


    return (
          <Box className='dashboard'>
            <Grid container spacing={4}>
                <Grid zeroMinWidth item xs={12} sm={12}>
                    <span>
                    <div className='stock-logo'>
                      <img className='s-logo' src='' alt='stock logo'/>
                    </div>
                    <h3 className='stock-ticker'>Equity</h3>
                  </span>
                    <div className='aregraph'>
                      <PortfolioChart myPositions={myPositions} portfolioData={portfolioData}/>
                    </div>
                    <span className='filters'>
                    <Button onClick={handleClick} name='hour' className='filter-txt' variant="text">1H</Button>
                    <Button onClick={handleClick} name='day' className='filter-txt' variant="text">1D</Button>
                    <Button onClick={handleClick} name='week' className='filter-txt' variant="text">1W</Button>
                    <Button onClick={handleClick} name='month' className='filter-txt' variant="text">1M</Button>
                    <Button onClick={handleClick} name='year' className='filter-txt' variant="text">1Y</Button>
                  </span>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={8}>
                  <div className='portfolio-details'>
                  hello
                  </div>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={4}>
                  <div className='portfolio-details'>
                  hello
                  </div>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={8}>
                  <div className='extra-data'>
                    hello
                  </div>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={4}>
                  <div className='portfolio-details'>
                  hello
                  </div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default MyPortfolioDashboard;