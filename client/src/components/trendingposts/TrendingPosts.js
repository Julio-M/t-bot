import React, { useState,useEffect } from "react";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton} from 'react-twitter-embed';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './trendingposts.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function TrendingPosts (props) {
  const stockTweets = ['MarketWatch','Stocktwits','paulkrugman','EIAgov','RedDogT3','zerohedge','alaidi','forexcrunch','DailyFXTeam','PeterLBrandt','elerianm', 'Ralph_Acampora','jimcramer']

  const tweetSelect = stockTweets.map(el => <MenuItem value={el}>{el.toUpperCase()}</MenuItem>)

  const [whichPost,setWhichPost] = useState(
  <TwitterTimelineEmbed
    sourceType="profile"
    screenName="MarketWatch"
    className='tw-em'
    options={{height:"100vh",width:"100%"}}
    related
    theme='light'
    />  
    )

  const handleChange = (e) => {
    let value = e.target.value
    setWhichPost(
      <TwitterTimelineEmbed
        key={value}
        sourceType="profile"
        screenName={value}
        className='tw-em'
        options={{height:"100vh",width:"100%"}}
        related
        theme='light'
        /> )
  }

    return (
      <Box className='t-posts'>
          <Grid className='t-container' container spacing={2}>
          <Grid zeroMinWidth className='t-controls' item xs={12} sm={6}>
              <div className='controls'>
                <FormControl style={{width:"50%"}}>
                  <InputLabel id="demo-simple-select-label">Accounts</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Accounts"
                    onChange={handleChange}
                  >
                    {tweetSelect}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          <Grid zeroMinWidth item xs={12} sm={6}>
              <div className='feed'>
              {whichPost}
              </div>
            </Grid>
          </Grid>
        </Box>
    );
}

export default TrendingPosts;