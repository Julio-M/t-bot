import React, { useState,useContext,useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import './myportfoliodashboard.css'
import AuthContext from "../../context/AuthContext";
import { Button } from '@mui/material';
import PortfolioChart from "./PortfolioChart";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccountInfo from "./AccountInfo";
import PortfolioInfo from "./PortfolioInfo";
import OrderHistory from "./OrderHistory"




function MyPortfolioDashboard (props) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [myAccount,setMyAccount] = useState('')
  useEffect( () => {
    fetch(`http://localhost:8000/api/get-account`)
    .then( res => res.json())
    .then( data => setMyAccount(data))
    .catch( error => console.log(error.message));
  },[])

  let {myPositions,portfolioData,setPeriod,assets,setNewOrder,newOrder} = useContext(AuthContext)


  console.log('POSITIONS',myPositions)

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
        setPeriod('1W')
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

//   <div className='account-i'>
//   <p className='text-acc'> Equity: ${myAccount?parseInt(myAccount.equity).toFixed():'Loading...'}</p>
//   <p className='text-acc'>Buying Power: ${myAccount?parseInt(myAccount.buying_power).toFixed():'Loading...'}</p>
// </div>

    return (
      <ThemeProvider theme={darkTheme}>
          <Box sx={{ width: '100%', typography: 'body1',height:'100%'}} className='dashboard-port'>
            <Grid container spacing={2}>
              <Grid zeroMinWidth item xs={12} sm={3}>
              <TabContext value={value}>
                <Box className='side-panel' sx={{ borderBottom: 1, borderColor: 'divider'}}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab className='details-por' label="Account Info" value="1" />
                    <Tab className='details-por' label="Portfolio" value="2" />
                    <Tab className='details-por' label="Order" value="3" />
                  </TabList>
                </Box>
                <TabPanel className='por-info' value="1"><AccountInfo myAccount={myAccount} /></TabPanel>
                <TabPanel className='por-info' value="2"><PortfolioInfo myPositions={myPositions}/></TabPanel>
                <TabPanel className='por-info' value="3"><OrderHistory assets={assets} myPositions={myPositions} setNewOrder={setNewOrder} newOrder={newOrder}/></TabPanel>
              </TabContext>
              </Grid>
                <Grid zeroMinWidth item xs={12} sm={9}>
                  <div className='graph-filt'>
                    <div className='aregraph'>
                      <PortfolioChart myPositions={myPositions} portfolioData={portfolioData}/>
                    </div>
                    <div className='filters' id='fil-port'>
                    <Button onClick={handleClick} name='hour' className='filter-txt' variant="text">1H</Button>
                    <Button onClick={handleClick} name='day' className='filter-txt' variant="text">1D</Button>
                    <Button onClick={handleClick} name='week' className='filter-txt' variant="text">1W</Button>
                    <Button onClick={handleClick} name='month' className='filter-txt' variant="text">1M</Button>
                    <Button onClick={handleClick} name='year' className='filter-txt' variant="text">1Y</Button>
                  </div>
                  </div>
                </Grid>
            </Grid>
        </Box>
        </ThemeProvider>
    );
}

export default MyPortfolioDashboard;