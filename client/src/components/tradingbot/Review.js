import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Review ({mySettings}) {
  const handleClick = (e) => {
    console.log(mySettings)
   fetch(`http://localhost:8000/api/initiate-bot`, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           Accept: "application/json"
       },
       body: JSON.stringify(mySettings)
   })
   .then( res => res.json())
   .then( data => console.log(data))
   .catch( error => console.log(error.message));
  } 

  const handleStop = (e) => {
    fetch(`http://localhost:8000/api/initiate-bot`)
    .then( res => res.json())
    .then( data => console.log(data))
    .catch( error => console.log(error.message));
  }

    return (
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography sx={{ fontSize: 35 }} color="text.secondary" gutterBottom>
          All set!
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary">
          Press the "Initialize" button below or go back to choose a different asset.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 40 }}>
          Current selection: {mySettings.symbol}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} variant="contained" color="primary" size="small">Initialize T-bot</Button>
        {/* <Button onClick={handleStop} variant="contained" color="secondary" size="small">Stop T-bot</Button> */}
      </CardActions>
    </Card>
    );
}

export default Review;