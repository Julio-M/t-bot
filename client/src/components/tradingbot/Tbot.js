import React, { useState, useEffect,useContext } from "react";
import './tbot.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FaRobot } from 'react-icons/fa';
import AuthContext from "../../context/AuthContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ThistoryTable from "./ThistoryTable";
import Options from "./Options";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Settings from "./Settings";
import Review from "./Review";




function Tbot (props) {
  let {user,assets} = useContext(AuthContext)

  const [activeStep, setActiveStep] = useState(0);

  const [mySettings, setMySettings] = useState({
    'symbol':'',
    'user_id':user.user_id
  })

  const [whichOption,setWhichOption] = useState(<Settings assets={assets} setMySettings={setMySettings} mySettings={mySettings}/>)

  const [allMessages,setAllMessages] = useState([])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [message,setMessage] = useState(`Hi ${user.username}`)
  let url = `ws://localhost:8000/ws/socket-server/`

  const chatSocket = new WebSocket(url)

  useEffect( () => {
    chatSocket.onmessage = (e) => {
      let data = JSON.parse(e.data)
      console.log('From use effect DATA:',data)
      // if (message.length>=10) message.shift()
      if(data.type==='events.alarm'){
        setMessage(data.content)
      }
  }
  },[])

  useEffect( () => {
    setAllMessages([...allMessages,message])
  },[message])

  // useEffect( () => {
  //   console.log('getmessages')
  //   let interval = setInterval(() => {
  //     fetch('http://localhost:8000/api/get-my-messages')
  //     .then(res=>res.json())
  //   }, 15000)
  //   return () => clearInterval(interval)
  // },[])


  const handleClick =() => {
    console.log('click')
    }


    console.log('from tbot',user)
    const arr = ['light x1','light x2','light x3','light x4','light x5','light x6','light x7','light x8','light x9']
    const [robomsg,setRobomsg] = useState([]) 

    const getRoboData = () => {
      fetch(`http://localhost:8000/api/get-bot-data/${user.user_id}`)
      .then( res => res.json())
      .then( data => setRobomsg(data))
      .catch( error => console.log(error.message));
    }

    useEffect( () => {
     getRoboData()
    },[])

  // const displayMessages = robomsg.map(m => <li key={m.id} className='msg-bot'>> {m.initial_buing_bower} @ {m.created}</li>)
  const displayMessages = allMessages.map(m => <li className='msg-bot'>T-bot says: {m}</li>)

  console.log('All',displayMessages)

    const displayStars = arr.map(s=> <div className={s}></div>)


    return (
      <ThemeProvider theme={darkTheme}>
        <div className='tbot-body'>
                  {displayStars}
        <Box className='dashboard' id='bot-dash'>
          <Grid container spacing={5}>
            <Grid zeroMinWidth item xs={12} sm={6}>
                <div className='bot-init'>
                  <div className='title-t'>
                    <h3 className='title-t-1'>T-bot</h3>
                    <p className='inst-p'>Hello {user.username}!</p> 
                    <p className='inst-p-2'>Here you can choose a trading strategy you wish T-bot to follow.</p>
                    <Options mySettings={mySettings} activeStep={activeStep} setActiveStep={setActiveStep}/>
                    <div className='tbotset'>
                      {activeStep===0?<Settings assets={assets} setMySettings={setMySettings} mySettings={mySettings}/>:<Review mySettings={mySettings}/>}
                    </div>
                  </div>

                </div>
            </Grid>
            <Grid zeroMinWidth item xs={12} sm={6}>
                <div className='bot-log'>
                  <div className='botbar'>
                  <FaRobot className="robo"/>
                  </div>
                  <div className="messages">
                    <ul>
                      {displayMessages}
                    </ul>
                  </div>
                  <div>
                  <h5 className="welcome">t-bot-log@current-user: {user.username}</h5>
                  </div>
                </div>
            </Grid>
            {/* <Grid zeroMinWidth item xs={12} sm={6}>
              <div className='portfolio-data'>
              <div className='equity-amount'>
                <ThistoryTable/>
                </div>
              </div>
            </Grid>
            <Grid zeroMinWidth item xs={12} sm={6}>
              <div className='portfolio-data'>
              <div className='equity-amount'>
                <p className='por-info'>Insert additional info</p>
                </div>
              </div>
            </Grid> */}
            {/* <Grid zeroMinWidth item xs={12} sm={6}>
                <div className='mini-bot-graph'>
                  <ResponsiveContainer width="100%" aspect={4.0/2}>
                      <AreaChart    
                        data={data}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false}/>
                        <XAxis dataKey="name" tick={false} axisLine={false} />
                        <YAxis tick={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                  </ResponsiveContainer>
                </div>
            </Grid> */}
          </Grid>
        </Box>
        </div>
        </ThemeProvider>
    );
}

export default Tbot;