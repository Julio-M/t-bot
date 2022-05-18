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
      res.json().then((err)=> console.log(err))
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
      <div className="login-box" id={"sBoxColor"}>
      <h2>{`Sign Up`}</h2>
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
          {/* <div className="user-box">
          <input onChange={handleChange} type="password" name="password_confirmation" required="true" value={password_confirmation}/>
          <label>Confirm Password</label>
          </div> */}
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