import './App.css';
import Login from './components/login/Login';
import SignupUser from './components/signup/Signup';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import { Routes, Route} from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext';
import LogedOutRoute from './utils/LogedOutRoute';

function App() {

  return (
    <AuthProvider>
      <div className="App">
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
    </AuthProvider>
  );
}

export default App;
