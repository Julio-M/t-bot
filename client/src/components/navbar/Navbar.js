import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom'
import AuthContext from "../../context/AuthContext";


function Navbar (props) {
  let {user,logoutUser} = useContext(AuthContext)

  const handleClick = (e) => {
    logoutUser()
  }

    return (
        <>
            <Link to='/home'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
            {user&&<button onClick={handleClick}>Logout</button>}
            {user&&<p>Hello {user.username}</p>}
        </>
    );
}

export default Navbar;