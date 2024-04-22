import "./componentsStyles.scss"
import React from 'react'
import backArrow from "../assets/svg/icons/backArrow.svg"

export default function navbar({onClick}) {
    const handleClick = () => {
        if (onClick) {
          onClick();
        }
      };

  return (
    <div className="navbar">
      <div className="back" onClick={handleClick}>
        <img src={backArrow}/>
        <p>Back</p>
      </div>
    </div>
  )
}

