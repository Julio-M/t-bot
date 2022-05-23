import React, { useState,useContext } from "react";
import { Button } from "@mui/material";
import './login.css'
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Fa500Px } from 'react-icons/fa';
import {Link} from 'react-router-dom'

function Login () {
    let {loginUser,errors,setErrors,isLoading,setIsLoading} = useContext(AuthContext)

    const [userForm, setUserForm] = useState({
        username:'',
        password:''
    })

    const {username,password} = userForm

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setUserForm({...userForm, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors([])
        loginUser(userForm)
    }

    return (
        <Box className='register-page'>
            <Grid container spacing={4}>
                <Grid zeroMinWidth item xs={12} sm={8}>
                    <div className='myscene' id='show'>
                        <h1 className='text-h'>Trading-Bot built in Python</h1>
                        <div className='reg-images'>
                            <img id='bot-img' src='https://res.cloudinary.com/dimfaeuml/image/upload/v1652930019/580b57fbd9996e24bc43be01_cs02bt.png' alt='robot relaxing'/>
                            {/* <img id='graph-img' src='https://res.cloudinary.com/dimfaeuml/image/upload/v1652930149/585d35bfcb11b227491c3347_el9wjw.png'
                            alt='graph'
                            /> */}
                        </div>
                    </div>
                </Grid>
                <Grid zeroMinWidth item xs={12} sm={4}>
                    <div className='myscene' id='login'>
                        <form onSubmit={handleSubmit} className='signin-form'>
                            <Fa500Px className="login-sk"/>
                            <p className='si-title'>Sign In</p>
                                <div>
                                    <TextField
                                        onChange={handleChange} 
                                        name='username'
                                        className='r-field-user'
                                        required
                                        id="outlined-basic"
                                        label="Username"
                                        value={username}
                                        />
                                    <TextField
                                        onChange={handleChange} 
                                        type='password'
                                        name='password'
                                        className='r-field-pass'
                                        required
                                        id="outlined-basic"
                                        label="Password"
                                        value={password}
                                    />
                                </div>
                            <Button type='submit' className='reg-btn' variant="contained">SIGN IN</Button>
                            <div className='click-to'>
                                <Link className='redirect-su' to='\signup' >Don't have an account? Sign up</Link>
                                    <div className='errors'> 
                                      {errors.map((err) => (
                                        <p key={err}>*{err}</p>
                                                ))}
                                    </div>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;