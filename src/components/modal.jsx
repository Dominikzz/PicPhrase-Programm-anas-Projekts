import { React } from 'react'
import { useTranslation } from 'react-i18next';

import Close from '../assets/svg/icons/close.svg'
import Warning from '../assets/svg/icons/warning.svg'

import "./componentsStyles.scss"

export default function modal({className, onClose, onCloseBtn, deleteUser}) {
  const {t} = useTranslation();

  return (
    <div className={className} onClick={(e) => onClose(e)}>
        <div className="modal-container">
            <div className="modal-header">
                <p>{t("are you sure you want to delete your account?")}</p>
                <img src={Close} onClick={(e) => onCloseBtn(e)}/>
            </div>
            <button onClick={() => deleteUser()}>{t("yes delete my account")}</button>
            <div className='pair'>
                <img src={Warning}/>
                <p>{t("this action is permanent, if you proceed your progress will be lost!")}</p>
            </div>
        </div>
    </div>
  )
}
