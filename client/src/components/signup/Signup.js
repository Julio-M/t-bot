import React, { useState,useContext } from "react";
import { Button } from "@mui/material";
import './signup.css'
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FaKeycdn } from 'react-icons/fa';
import {Link} from 'react-router-dom'

function SignupUser () {
  let navigate = useNavigate();
  let {loginUser,errors,setErrors,isLoading,setIsLoading} = useContext(AuthContext)

  const [userForm, setUserForm] = useState({
    username:"",
    email:"",
    password:"",
  })


  const {username,email,password} = userForm


  const clickLog = () => {
    navigate('/login')
  }

  const handleChange = (e) => {
    const name = e.target.name
    let value = e.target.value

    setUserForm({...userForm, [name]:value})
  }

  //post user info
  const postDataUser = () => {
   fetch(`http://127.0.0.1:8000/api/create/users/`, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           Accept: "application/json"
       },
       body: JSON.stringify(userForm)
   })
   .then( res => {
     console.log(res)
    if (res.ok){
      res.json().then((data)=> console.log(data))
    } else
    {
      res.json().then((err)=> setErrors([err.message,err.explanation]))
    }
   })
  }
  //post user info end


  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    console.log(userForm)
    console.log('clicked')
    postDataUser()
    setErrors([])
  }

    return (
      <Box className='register-page'>
      <Grid container spacing={4}>
      <Grid zeroMinWidth item xs={12} sm={4}>
              <div className='myscene' id='login'>
                  <form onSubmit={handleSubmit} className='signin-form'>
                      <FaKeycdn className="login-sk"/>
                      <p className='si-title'>Sign Up</p>
                          <div>
                              <TextField
                                  onChange={handleChange} 
                                  name='username'
                                  className='r-field-user-sup'
                                  required
                                  id="outlined-basic"
                                  label="Username"
                                  value={username}
                                  />
                              <TextField
                                  onChange={handleChange} 
                                  name='email'
                                  className='r-field-email-sup'
                                  required
                                  id="outlined-basic"
                                  label="email"
                                  value={email}
                                  />
                              <TextField
                                  onChange={handleChange} 
                                  type='password'
                                  name='password'
                                  className='r-field-pass-sup'
                                  required
                                  id="outlined-basic"
                                  label="Password"
                                  value={password}
                              />
                          </div>
                      <Button type='submit' className='reg-btn-sup' variant="contained">SIGN UP</Button>
                      <div className='click-to'>
                          <Link className='redirect-su-sup' to='\login' >Already have an account? Sign in</Link>
                              <div className='errors-sup'> 
                                {errors.map((err) => (
                                  <p key={err}>*{err}</p>
                                          ))}
                              </div>
                      </div>
                  </form>
              </div>
          </Grid>
          <Grid zeroMinWidth item xs={12} sm={8}>
              <div className='myscene' id='show'>
                  <h1 className='text-h'>Sign up and start trading!</h1>
                  <div className='reg-images-sup'>
                      <img id='bot-img' src='https://res.cloudinary.com/dimfaeuml/image/upload/v1652934346/5ae22a0433b73fa43b1a8908_vudvd3.png' alt='robot jumping'/>
                  </div>
              </div>
          </Grid>
      </Grid>
  </Box>
    );
}

export default SignupUser;
