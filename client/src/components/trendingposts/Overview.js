import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './overview.css'


export default function Overview() {

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8}>
          <img src="https://www.transparentpng.com/thumb/robot/big-eyed-robot-free-transparent-ORWEcc.png" alt="big eyed robot free transparent @transparentpng.com"/>
        </Grid>
        <Grid item xs={4}>
         <div id="speech-bubble">
          <p id='text'>I'll be quick!!</p>
         </div>
        </Grid>
      </Grid>   
    </Box>
  );
}