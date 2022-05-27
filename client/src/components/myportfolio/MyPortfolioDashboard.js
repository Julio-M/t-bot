import React, { useState,useContext } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import './myportfoliodashboard.css'
import AuthContext from "../../context/AuthContext";
import { Button } from '@mui/material';
import PortfolioChart from "./PortfolioChart";



function MyPortfolioDashboard (props) {
  const [options,setOptions] = useState( {hour:'numeric'})

  let {currAsset,setTime_f,myPositions} = useContext(AuthContext)



  const handleClick = (e) => {
    let name = e.target.name
    switch(name) {
      case 'hour':
        setOptions({hour:'2-digit', minute:'2-digit' })
        setTime_f(75)
        break;
      case 'day':
        setOptions({hour: 'numeric'})
        setTime_f(1455)
        break;
      case 'week':
        setOptions({weekday: 'short'})
        setTime_f(10095)
        break;
      case 'month':
        setOptions({weekday: 'long'})
        setTime_f(43815)
        break;
      case 'year':
        setOptions({ month:'short'})
        setTime_f(525615)
        break;
      default:
        setOptions({ hour: 'numeric'})
        setTime_f(75)
        break;
    }
  }


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
                    <div className='aregraph'>
                    <PortfolioChart myPositions={myPositions}/>
                    </div>
                    <span className='filters'>
                    <Button onClick={handleClick} name='hour' className='filter-txt' variant="text">1H</Button>
                    <Button onClick={handleClick} name='day' className='filter-txt' variant="text">1D</Button>
                    <Button onClick={handleClick} name='week' className='filter-txt' variant="text">1W</Button>
                    <Button onClick={handleClick} name='month' className='filter-txt' variant="text">1M</Button>
                    <Button onClick={handleClick} name='year' className='filter-txt' variant="text">1Y</Button>
                  </span>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={4}>
                  <div>
                  YO
                  </div>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={12}>
                  <div>
                  hello
                  </div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default MyPortfolioDashboard;