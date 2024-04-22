import React from 'react'
import { motion } from 'framer-motion'

import "./componentsStyles.scss"

export default function button({text, className, onClick, style }) {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      className={`button ${className}`}
      whileHover={{scale: 1.04}}
      whileTap={{scale: 1.02, opacity: 0.9}}
      onClick={handleClick}
      style={style}
    >
      {text}
    </motion.button> 
  )
}
