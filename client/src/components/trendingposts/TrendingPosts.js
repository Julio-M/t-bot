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
import CircularStatic from "./CircularStatic";
import Overview from "./Overview";



function TrendingPosts (props) {

  const [formData,setFormData] = useState(
    {
      "keyword":"",
      "amount":0
    }
  )

  const [tmessage,setTmessage] = useState([])

  const [analysis,setAnalysis] = useState({})
  const [isLoading,setIsLoading] = useState(false)
  const [emoji,setEmoji] = useState('🧐')

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

  const handleFormChange = (e) => {
    console.log(e.target.name)
    const name = e.target.name
    let value = e.target.value

    setFormData({...formData,[name]:value})

  }

  let url = `ws://localhost:8000/ws/socket-server/`

  const chatSocket = new WebSocket(url)

  useEffect( () => {
    chatSocket.onmessage = (e) => {
      let data = JSON.parse(e.data)
      console.log('From use effect DATA:',data)
      // if (message.length>=10) message.shift()
      if(data.type==='tweets'){
        setTmessage([...tmessage,data.content])
      }
  }
  },[])

  const handleSubmit = (e) =>{
   e.preventDefault()
   setIsLoading(!isLoading)
   fetch(`http://localhost:8000/api/initiate-sentiment`, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           Accept: "application/json"
       },
       body: JSON.stringify(
         formData
       )
   })
   .then( res => res.json())
   .then( data => {
     setAnalysis(data)
     setIsLoading(false)
    })
   .catch( error => console.log(error.message));
  }

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
                    <form onSubmit={handleSubmit} className='sent-form'>
                      <TextField name='keyword' id="area" onChange={handleFormChange} sx={{'width':'30%'}} label="Query" variant="standard" value={formData.keyword}/>
                      <TextField name='amount' id="area count" onChange={handleFormChange}  sx={{'width':'30%', 'marginLeft':'2rem'}} label="Number of Tweets" type='number' variant="standard" value={formData.amount}/>
                      <div className='s-btn'>
                      <Button id='a-btn' variant="contained" color="primary" size="small" type='submit'>Begin analysis</Button>
                      </div>
                    </form>
                </div>
              </Grid>
              <Grid zeroMinWidth item xs={12} sm={4}>
              <div className='the-res'>
                  <div className="table-res">
                    <Results analysis={analysis} setEmoji={setEmoji} emoji={emoji}/>
                  </div>
                  <div className="loading">
                    {isLoading&&
                    <div className='l-bar'>
                    <CircularStatic/>
                    </div>
                    }
                    {isLoading&&<Overview tmessage={tmessage}/>}
                  </div>
                </div>
              </Grid>
          </Grid>
        </Box>
    );
}

export default TrendingPosts;