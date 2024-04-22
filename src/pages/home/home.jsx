import React from 'react'
import { motion } from 'framer-motion'

import Navbar from './navbar.jsx'
import TopNavbar from '../../components/infoNavbar.jsx'
import Cards from './cards.jsx'
import logoGreyBackground from '../../assets/svg/icons/logoGreyBackground.svg'

export default function home() {


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className='home-container'
    >
      <img src={logoGreyBackground} className='background-logo-left'/>
      <img src={logoGreyBackground} className='background-logo-right'/>
      <TopNavbar />
      <Cards />
      <Navbar />
    </motion.div>
  )
}
