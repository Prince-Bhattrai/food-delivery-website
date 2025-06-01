import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer' >
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='footer-brand-image' src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet. Inventore, necessitatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolore asperiores exercitationem maxime ullam eaque pariatur numquam beatae dolorem nam?</p>
                <div className="footer-social-icons">
                   <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100072573561370"> <img src={assets.facebook_icon} alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://x.com/bhattrai_p74771"> <img src={assets.twitter_icon} alt="" /></a>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/prince-bhattrai-427005350/">  <img src={assets.linkedin_icon} alt="" /></a>
                </div>

            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About US</li>
                    <li>Delivery</li>
                    <li>Privicy and polity</li>
                </ul>
                
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+9779767495393</li>
                    <li>princebhattrai@gmail.com</li>
                </ul>
            </div>
            
        </div>
        <hr />
        <p className="footer-copyright">
                Copyright &#169; 2025 TastyNest. All rights reserved.
        </p>
        
    </div>
  )
}

export default Footer