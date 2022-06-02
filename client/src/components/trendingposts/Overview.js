import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './overview.css'
import { FaRobot } from 'react-icons/fa';


export default function Overview({tmessage}) {

  const displayMsg = tmessage.map(m => <li className='msg-bot'>{m}</li>)

  return (
    <Box sx={{ flexGrow: 1, height:'50%' }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={10}>
          <div className='bot-log-sent'>
                  <div className='botbar'>
                  <FaRobot className="robo"/>
                  </div>
                  <div className="messages">
                    <ul>
                      {displayMsg}
                    </ul>
                  </div>
                  <div>
                  <h5 className="welcome">sentiment-analysis</h5>
                  </div>
                </div>
        </Grid>
      </Grid>   
    </Box>
  );
}