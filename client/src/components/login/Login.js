import React, { useState } from "react";
import { Button } from "@mui/material";
import './login.css'
import { useNavigate } from "react-router-dom";

function Login () {
    let navigate = useNavigate();

    const [userForm, setUserForm] = useState({
        username:'',
        password:''
    })

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const postDataUser = () => {
        fetch(`http://127.0.0.1:8000/auth/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userForm),
            }).then((r) => {
              if (r.ok) {
                r.json().then((data) => console.log(data.token)).then(()=>setIsLoading(false))
              } else {
                console.log('None')
                r.json().then(err=>setErrors(err.non_field_errors)).then(()=>setIsLoading(false))
              }
          })
    }

    const {username,password} = userForm

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setUserForm({...userForm, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        postDataUser()
        setErrors([])
    }


    return (
      <div className="login-box" id={"sBoxColor"}>
      <h2>{"User Login"}</h2>
      <form onSubmit={handleSubmit}>
          <div className="user-box">
          <input onChange={handleChange} type="text" name="username" required="true" value={username}/>
          <label>Username</label>
          </div>
          <div className="user-box">
          <input onChange={handleChange} type="password" name="password" required="true" value={password}/>
          <label>Password</label>
          </div>
          <Button type='submit' id='submitLogin'>{isLoading ? "Loading..." : "Login"}</Button>
          <div> {errors.map((err) => (
          <p key={err}>{err}</p>
                ))}</div>
      </form>
  </div>
    );
}

export default Login;