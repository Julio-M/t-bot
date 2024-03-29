import React, { useState,useContext } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import MyChart from "./MyChart";
import './dashboard.css'
import MyStock from "./MyStock";
import AuthContext from "../../context/AuthContext";
import { Button } from '@mui/material';
import InfoTable from "./InfoTable";
import TradingViewWidget from 'react-tradingview-widget';


function Dashboard (props) {
  const [options,setOptions] = useState( {hour:'numeric'})

  let {currAsset,setTime_f,assets} = useContext(AuthContext)

  const [tview,setTview] = useState(false)

  const displayLogo = assets.filter(a => a.ticker===currAsset)

  console.log('logo',displayLogo)

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

  const handleTview = (e) => {
    setTview(!tview)
  }

    return (
          <Box className='dashboard'>
            <Grid container spacing={4}>
                <Grid zeroMinWidth item xs={12} sm={!tview?8:8.5}>
                <Button onClick={handleTview} name='trading-view' className='tview-txt' variant="contained" color={tview?"success":"secondary"}>{!tview?'Trade view':'Normal view'}</Button>
                {!tview?
                  <>
                    <span>
                    <div className='stock-logo'>
                      <img className='s-logo' src={displayLogo.length>0?displayLogo[0].logo:"logo"} alt='stock logo'/>
                    </div>
                    <h3 className='stock-ticker'>{currAsset}</h3>
                  </span>
                    <MyChart options={options}/>
                    <span className='filters'>
                    <Button onClick={handleClick} name='hour' className='filter-txt' variant="text">1H</Button>
                    <Button onClick={handleClick} name='day' className='filter-txt' variant="text">1D</Button>
                    <Button onClick={handleClick} name='week' className='filter-txt' variant="text">1W</Button>
                    <Button onClick={handleClick} name='month' className='filter-txt' variant="text">1M</Button>
                    <Button onClick={handleClick} name='year' className='filter-txt' variant="text">1Y</Button>
                  </span>
                  </>
                  :<div className='tr-view' >
                  <TradingViewWidget className='em-'symbol={`NASDAQ:${currAsset}`} />
                  </div>}
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={!tview?4:3.5}>
                  <div className='stocks-table' id='assets-trading'>
                    <MyStock/>
                  </div>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={12}>
                  <div className='more-data-table' id='assets'>
                    <InfoTable/>
                  </div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;