import React from 'react';
import Nav from '../comp/nav';
import './cs/home.css';
import Dashboard from '../comp/dashboard';
import { Link } from 'react-router-dom';
import Footer from '../comp/footer';

const Home = () => {

  return (
    <div className='home'>
      <Nav />
      <h1 className='dashboard-h1'>Dashboard</h1>
      <div className='div-login'>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <div className='second-login'>Log in</div>
        </Link>
      </div>

      <Dashboard />
      <Footer/>
    </div>
  );
};

export default Home;
