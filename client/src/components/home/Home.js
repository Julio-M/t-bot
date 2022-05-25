import React, { useEffect,useState } from "react";
import AuthContext from "../../context/AuthContext";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './home.css'

function Home (props) {
    let url = `ws://localhost:8000/ws/socket-server/`
    const chatSocket = new WebSocket(url)
    const [message,setMessage] = useState('')

    useEffect( () => {
        console.log('Web')
        console.log(chatSocket)
        chatSocket.onmessage = (e) => {
            console.log('insocket')
            let data = JSON.parse(e.data)
            console.log('Data:',data)
        }
    }
    )
        
    const handleChange = (e) =>{
        let message =e.target.value
        setMessage((m)=>m=message)
        }   
    
    const handleSubmit = (e) => {
        e.preventDefault()
        chatSocket.send(JSON.stringify({
            'message':message
        }))
    }
        

    return (
        <Box className='register-page'>
            <Grid container spacing={4}>
                <Grid zeroMinWidth item xs={12} sm={6}>
                Welcome
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={6}>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange}></input>
                </form>
                    You are loggen in! 
                </Grid>
           </Grid>
        </Box>
    );
}

export default Home;