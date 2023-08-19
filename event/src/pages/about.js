import React from 'react'
import Nav from '../comp/nav'
import './cs/about.css'
const About = () => {
  return (
   <div>
    <Nav/>
    <div className="about-dis">
    <h1>About Us</h1>
      <p>
        Welcome to Event-X, your ultimate guide to the exciting events happening on our campus. We are here to keep you in the know about the latest and greatest experiences that make our college life unforgettable.
      </p>
      <p>
        At Event-X, our mission is to connect our college community through a diverse range of engaging events. From concerts and workshops to sports events and club activities, we've got it all covered.
      </p>
      <p>
        Explore our event listings, dive into our event archives, and stay updated with event details and changes. We value your feedback to help us improve and shape future events.
      </p>
      <p>
        Powered by a dedicated team of students passionate about event management, we strive to create a vibrant campus culture.
      </p>
      <p>
        Join us, get involved, and be a part of the exciting event scene at Event-X. Connect with us through our website and social media channels.
      </p>
      <p>
        Let's make memories together!
      </p>
</div>
   </div>
  )
}

export default About