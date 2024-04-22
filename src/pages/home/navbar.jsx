import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../context/profileContext.jsx'
import { useTranslation } from 'react-i18next';

import logoNavbar from '../../assets/svg/icons/logoNavbar.svg'
import market from '../../assets/svg/icons/market.svg'
import trophies from '../../assets/svg/icons/trophies.svg'
import topics from '../../assets/svg/icons/topics.svg'
import updates from '../../assets/svg/icons/updates.svg'
import settings from '../../assets/svg/icons/settings.svg'
import defaultProfilePicture from '../../assets/svg/icons/profilePicture.svg'


import './home.scss'

export default function navbar() {
  const { t } = useTranslation();
  const { profilePicture, currentProfile } = useProfile();

  const navigate = useNavigate()
  const goToProfile = () => navigate('/profile')
  const goToSettings = () => navigate('/settings')
  const handleAdmin = () => {
    if (currentProfile.admin === true) {
      navigate('/admin')
    }
  }

  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <div className='content'>
          <div className='pair'>
            <img src={market}/>
            <p>Market</p>
          </div>
          <div className='pair'>
            <img src={trophies}/>
            <p>Trophies</p>
          </div>
          <div className='pair'>
            <img src={topics}/>
            <p>Topics</p>
          </div>
        </div>
        <div className='logo-circle'>
          <img src={logoNavbar} onClick={handleAdmin}/>
        </div>
        <div className='content'>
          <div className='pair'>
            <img src={updates}/>
            <p>Updates</p>
          </div>
          <div className='pair' onClick={goToSettings}>
            <img src={settings}/>
            <p>Settings</p>
          </div>
          <div className='pair' onClick={goToProfile}>
            <img src={profilePicture === null ? defaultProfilePicture : profilePicture} className='profilePicture'/>
            <p>Profile</p>
          </div>
        </div>
      </div>
    </div>
  )
}
