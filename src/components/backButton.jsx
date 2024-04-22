import React from 'react'
import backArrow from "../assets/svg/icons/backArrow.svg"
import { useTranslation } from 'react-i18next';

export default function backButton({onClick, text}) {
    const {t} = useTranslation();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

  return (
    <div className='back-navbar'>
      <div className='back-button' onClick={handleClick}>
        <img src={backArrow}/>
        <p>{t('back')}</p>
      </div>
      <h1>{t(`${text}`)}</h1>
    </div>
  )
}
