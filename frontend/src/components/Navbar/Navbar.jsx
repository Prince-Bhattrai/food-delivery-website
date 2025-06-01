import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    setToken("")
    navigate("/")

  }

  return (
    <div className="navbar">
      <Link to="/"><img src={assets.logo} alt="logo" className="logo" /></Link>

      <ul className="navbar-menu">
        <li>
          <Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <a href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>
            Menu
          </a>
        </li>
        <li>
          <a href="#app-download" onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>
            Mobile-App
          </a>
        </li>
        <li>
          <a href="#footer" onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>
            Contact Us
          </a>
        </li>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search_icon">
          <img src={assets.search_icon} alt="search" />
        </div>

        <Link to="/cart" className="navbar-cart_icon">
          <img src={assets.basket_icon} alt="cart" />
          <div className={getTotalCartAmount() ? "dot" : ""} ></div>
        </Link>
        {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button> :
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              {/* <li><img onClick={()=>{navigate("/myorders")}} src={assets.bag_icon} alt="" />Orders</li> */}
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>

              <hr />
              <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}



      </div>
    </div>
  );
};

export default Navbar;
