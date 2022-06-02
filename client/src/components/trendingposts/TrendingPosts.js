import React, { useState,useEffect } from "react";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton} from 'react-twitter-embed';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './trendingposts.css'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Results from "./Results";


function TrendingPosts (props) {
  const stockTweets = ['MarketWatch','Stocktwits','paulkrugman','EIAgov','RedDogT3','zerohedge','alaidi','forexcrunch','DailyFXTeam','PeterLBrandt','elerianm', 'Ralph_Acampora','jimcramer']

  const tweetSelect = stockTweets.map(el => el.toUpperCase())

  const [whichPost,setWhichPost] = useState(
  <TwitterTimelineEmbed
    sourceType="profile"
    screenName="MarketWatch"
    className='tw-em'
    options={{height:"80vh",width:"100%"}}
    related
    theme='light'
    />  
    )

  const handleChange = (e) => {
    let value = e.target.textContent
    console.log(value)
    setWhichPost(
      <TwitterTimelineEmbed
        key={value}
        sourceType="profile"
        screenName={value}
        className='tw-em'
        options={{height:"80vh",width:"100%"}}
        related
        theme='light'
        /> )
  }

    return (
      <Box className='t-posts'>
          <Grid className='t-container' container spacing={2}>
          <Grid zeroMinWidth className='t-controls' item xs={12} sm={12}>
              <div className='controls'>
                <FormControl style={{width:"50%"}}>
                  <div className='query-trext-area'>
                  <Autocomplete
                      disablePortal
                      id="combo-box"
                      options={tweetSelect}
                      sx={{ width: '65%' }}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} label="Accounts" />}
                    />
                  </div>
                </FormControl>
              </div>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid zeroMinWidth item xs={12} sm={4}>
                <div className='feed'>
                  {whichPost}
                  </div>
              </Grid>
              <Grid zeroMinWidth item xs={12} sm={4}>
              <div className='form-sent'>
                <div className='title'>Sentiment Analysis</div>
                    <p className='parag'>Scrape data from twitter using Tweepy and perform sentiment analysis using the TextBlob object. The output will be the number of positive, negative and neutral tweets!</p>
                    <form className='sent-form'>
                      <TextField id="area" sx={{'width':'30%'}} label="Query" variant="standard" />
                      <TextField id="area count" sx={{'width':'30%', 'marginLeft':'2rem'}} label="Number of Tweets" type='number' variant="standard" />
                      <div className='s-btn'>
                      <Button id='a-btn' variant="contained" color="primary" size="small">Begin analysis</Button>
                      </div>
                    </form>
                </div>
              </Grid>
              <Grid zeroMinWidth item xs={12} sm={4}>
                <div className="table-res">
                  <Results/>
                </div>
              </Grid>
          </Grid>
          {/* <Grid zeroMinWidth item xs={12} sm={4}>
              <div className='feed'>
              {whichPost}
              </div>
            </Grid>
          <Grid className='query' zeroMinWidth item xs={12} sm={4} >
                  <div className='title'>Sentiment Analysis</div>
                  <p className='parag'>Scrape data from twitter using Tweepy and perform sentiment analysis using the TextBlob object. The output will be the number of positive, negative and neutral tweets!</p>
                  <form className='sent-form'>
                    <TextField id="area" sx={{'width':'30%'}} label="Query" variant="standard" />
                    <TextField id="area count" sx={{'width':'30%', 'marginLeft':'2rem'}} label="Number of Tweets" type='number' variant="standard" />
                    <div className='s-btn'>
                    <Button id='a-btn' variant="contained" color="primary" size="small">Begin analysis</Button>
                    </div>
                  </form>
                </Grid>
                <Grid className='query' id='s-table' zeroMinWidth item xs={12} sm={4} >
                    <Results/>
                </Grid> */}
        </Box>
    );
}

export default TrendingPosts;