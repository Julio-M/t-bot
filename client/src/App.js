import './App.css';
import Login from './components/login/Login';
import SignupUser from './components/signup/Signup';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import { Routes, Route} from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import LogedOutRoute from './utils/LogedOutRoute';
import AuthContext from "./context/AuthContext";
import React, {useContext } from "react";

function App() {
  let {user} = useContext(AuthContext)

  return (
      <div className={user?"App":'regpage'}>
        <Navbar/>
        <Routes>
              <Route path="/login" element={
              <LogedOutRoute>
              <Login />
              </LogedOutRoute>
              } />
              <Route path="/signup" element={<SignupUser />} />
              <Route path="/" element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                    }
                />
              {/* <Route exact path='/home' element={<Home/>} /> */}
        </Routes>
      </div>
  );
}

export default App;