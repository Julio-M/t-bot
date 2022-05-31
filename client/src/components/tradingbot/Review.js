import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Review ({mySettings}) {
    return (
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          All set!
        </Typography>
        <Typography sx={{ fontSize: 10 }} color="text.secondary">
          Press the "Initialize" button below or go back to choose a different asset.
        </Typography>
        <Typography variant="body1">
          Current selection: {mySettings.symbol}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="small">Initialize T-bot</Button>
      </CardActions>
    </Card>
    );
}

export default Review;