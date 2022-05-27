import React, { useState, useEffect } from "react";
import './tbot.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FaRobot } from 'react-icons/fa';


function Tbot (props) {
    const arr = ['light x1','light x2','light x3','light x4','light x5','light x6','light x7','light x8','light x9']
    const [robomsg,setRobomsg] = useState([]) 

    const getRoboData = () => {
      fetch(`http://localhost:8000/api/get-bot-data/1`)
      .then( res => res.json())
      .then( data => setRobomsg(data))
      .catch( error => console.log(error.message));
    }

    useEffect( () => {
     getRoboData()
    },[])

  const displayMessages = robomsg.map(m => <li key={m.id} className='msg-bot'>> {m.initial_buing_bower} @ {m.created}</li>)
  
  console.log(displayMessages)

    const displayStars = arr.map(s=> <div className={s}></div>)

    return (
        <div className='tbot-body'>
                  {displayStars}
        <Box className='dashboard'>
          <Grid container spacing={4}>
            <Grid zeroMinWidth item xs={12} sm={6}>
                <div className='bot-init'>

                </div>
            </Grid>
            <Grid zeroMinWidth item xs={12} sm={6}>
                <div className='bot-log'>
                  <FaRobot className="robo"/>
                  <ul>
                    {displayMessages}
                  </ul>
                </div>
            </Grid>
            <Grid zeroMinWidth item xs={12} sm={6}>
            <div className='bot-init'>
                  
                </div>
            </Grid>
          </Grid>
        </Box>
  
        </div>
    );
}

export default Tbot;