import React from 'react'
import Back from '../../components/backButton.jsx'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

import './settings.scss'

export default function settings() {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/home');
    }

  return (
    <motion.div 
      className='settings-container'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.2}}
    >
      <Back onClick={backToHome} text='Settings'/>
      <h1>Settings</h1>
    </motion.div>
  )
}
