import React from 'react'
import './css/footer.css'
import {  FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
       {/* <!-- Site footer --> */}
       
    <footer class="site-footer">
      <div class="container-footer">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify"><i>Your College Event Companion: Event-X! </i> Discover and stay updated on exciting college events with Event-X. From workshops to festivals, we've got you covered. Join us in celebrating campus life and making the most of your college experience. Reach out to us for assistance or questions about Event-X and specific events.
       </p>
          </div>
        </div>
        <hr></hr>
      </div>
      <div class="container-footer">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2023 All Rights Reserved by <a></a>
         <a href="#">Event-X</a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="twitter" href="https://twitter.com/Aryan_Agrahari_"><i class="fa fa-twitter"><FaTwitter /></i></a></li>
              <li><a class="instagram" href="https://www.instagram.com/aryan_agrahari_7/"><i class="fa fa-instagram"><FaInstagram /></i></a></li>
              <li><a class="linkedin" href="https://www.linkedin.com/in/aryan-agrahari-a498b11a8/"><i class="fa fa-linkedin"> <FaLinkedin /></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
    </div>
  )
}

export default Footer
