import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/login';
import Contact from './pages/contact';
import Club from './pages/club';
import Event from './pages/events';
import About from './pages/about';
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import AddEvent from './pages/addEvent';
import Bigcard from './comp/bigcard';
import Fullevent from './comp/fullevent';
import { auth } from './firebase.js';
import Admin from './pages/admin';
import OneSignal from 'react-onesignal';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  useEffect(() => {
    OneSignal.init({
      appId: "",
    });
  }, []);

  const checkLoginStatus = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  };


  useEffect(() => {
    checkLoginStatus();
  }, []);


  return (
    <Router>
    <div className='app' > 
  
      <Routes>
          <Route path="*" element={<Navigate to="/Home" />}/>
          <Route path='/Home' element={<><Home/></>}/>
          <Route path='/login' element={<><Login/></>}/>
          <Route path='/contact' element={<><Contact/></>}/>
          <Route path='/club' element={<><Club/></>}/>
          <Route path='/event' element={<><Event/></>}/>
          <Route path='/about' element={<><About/>  </>}/>
          <Route path='/bigcard' element={<><Bigcard/> </>}/>
          <Route path='/Event/:id' element={<><Fullevent/> </>}/> 
          <Route path="/admin" element={ isLoggedIn ? (<Admin />) : (<Navigate to="/login" replace />)}/>
          <Route path="/addEvent" element={ isLoggedIn ? ( <AddEvent /> ) : ( <Navigate to="/login" replace /> )}/>
      </Routes>
    </div>

    </Router>
  );
}

export default App;
