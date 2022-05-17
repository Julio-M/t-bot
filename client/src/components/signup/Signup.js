import React, { useState } from "react";
import { Button } from "@mui/material";
import './signup.css'
import { useNavigate } from "react-router-dom";

function SignupUser () {
  let navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    username:"",
    email:"",
    password:"",
    password_confirmation:""
  })

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {username,email,password,password_confirmation} = userForm


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
   fetch(`/signup`, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           Accept: "application/json"
       },
       body: JSON.stringify(userForm)
   })
   .then( res => {
    if (res.ok){
      res.json().then((user)=> onLogin(user)).then(navigate('/'))
    } else
    {
      res.json().then((err)=> setErrors(err.errors))
    }
   })
  }
  //post user info end

  //post freelancer info start

  const postDataFreelancer = () => {
    fetch(`/signup-freelancer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(userForm)
    })
    .then( res => {
     if (res.ok){
       res.json().then((user)=> console.log(user))
     } else
     {
       res.json().then((err)=> setErrors(err.errors))
     }
    })
   }

  //post freelnacer info end

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([]);
    setIsLoading(true);
  }

    return (
      <div className="login-box" id={"sBoxColor"}>
      <h2>{`Sign Up as ${accountType}`}</h2>
      <form onSubmit={handleSubmit}>
          <div className="user-box">
          <input onChange={handleChange} type="text" name="username" required="true" value={username}/>
          <label>Username</label>
          </div>
          <div className="user-box">
          <input onChange={handleChange} type="email" name="email" required="true" value={email}/>
          <label>Email</label>
          </div>
          <div className="user-box">
          <input onChange={handleChange} type="password" name="password" required="true" value={password}/>
          <label>Password</label>
          </div>
          <div className="user-box">
          <input onChange={handleChange} type="password" name="password_confirmation" required="true" value={password_confirmation}/>
          <label>Confirm Password</label>
          </div>
          <Button type='submit' id='submitLogin'>{isLoading ? "Loading..." : "Sign Up"}</Button>
          <div> {errors.map((err) => (
                <p>{err}</p>
            ))}</div>
          <div className='sbutton'>
          <Button onClick={clickLog} id='go-to-login'>Go to LogIn</Button>
          </div>
      </form>
  </div>
    );
}

export default SignupUser;