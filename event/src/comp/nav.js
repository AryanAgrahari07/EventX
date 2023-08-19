import React from 'react'
import "./css/nav.css"
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='navbar'>
    
           <section class="top-nav">
    <div className='nav-t'>
    <p className='title-nav'>Event-X</p>
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
    <div class='menu-button'></div>
  </label>
    <ul class="menu">
    <li className='navItem' ><Link to='/Home' className='navItem' style={{textDecoration:'none'}}> Home</Link></li>
              <li className='navItem' ><Link to='/Event' className='navItem' style={{textDecoration:'none'}}>Events</Link></li>
              <li className='navItem' > <Link to='/Club'className='navItem' style={{textDecoration:'none'}}>Clubs</Link></li>
             <li className='navItem' ><Link to='/Contact'className='navItem' style={{textDecoration:'none'}}> Contact</Link></li>
           <li className='navItem' id='nav-about'> <Link to='/About' className='navItem' style={{textDecoration:'none'}}>  About</Link></li>
    </ul>
  </section>
    </div>
  )
}

export default Nav
