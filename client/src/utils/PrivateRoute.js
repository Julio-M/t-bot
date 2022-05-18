import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import Home from '../components/home/Home';
import { Routes, Route} from "react-router-dom";

const PrivateRoute = ({children}) => {
  let {user} = useContext(AuthContext)
  console.log(children)
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;