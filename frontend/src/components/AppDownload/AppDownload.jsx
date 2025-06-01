import React from 'react'
import './AppDownload.css';
import { assets } from '../../assets/assets';


const AppDownload = () => {
  return (
    <div id='app-download'  className='app-download'>
        <p>For Better Experiance Download <br /> TastyNest App</p>
        <div className="app-download-platform">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload