import React from 'react'

import info from '../assets/svg/icons/info.svg'

import './componentsStyles.scss'

export default function infoNavbar() {
  return (
    <div className='top-navbar'>
      <p>Version 1.3.0</p>
      <img src={info}/>
    </div>
  )
}
