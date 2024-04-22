import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../context/profileContext.jsx'
import { dataBase } from '../../firebase.jsx';
import { useAuth } from '../../context/authContext.jsx';
import { doc, deleteDoc } from "firebase/firestore"; 
import { storage } from "../../firebase.jsx"
import { ref, deleteObject } from "firebase/storage" 
import { useTranslation } from 'react-i18next'; 
import { motion } from 'framer-motion'

import Profile from '../../assets/svg/icons/profilePicture.svg'
import Back from '../../components/backButton.jsx'
import Button from '../../components/button.jsx'
import Modal from '../../components/modal.jsx'

import './profile.scss'

export default function profile() {

  const [showModal, setShowModal] = useState(false);

  const { currentProfile, profilePicture } = useProfile();
  const { currentUser, logout } = useAuth();
  const {t} = useTranslation();

  const navigate = useNavigate();
  const backToHome = () => {
    navigate('/home');
  }

  const goToStart = () => navigate('/')

  const handleLogout = async () => {
    try {
      await logout();
      goToStart();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const deleteUser = async () => {
    try {
        navigate('/');
        const userDocRef = doc(dataBase, 'userAccounts', currentUser.uid);
        await deleteDoc(userDocRef);

        const imageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        await deleteObject(imageRef);

        await currentUser.delete();

        localStorage.removeItem(`profilePicture-${currentUser.uid}`);
    } catch (error) {
        console.error(error);
    }
};

  return (
    <motion.div 
      className='profile-container'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.2}}
    >
      <Modal 
        className={showModal ? 'modal-overlay' : 'inactive'}
        onClose={(e) => {
          if (!e.target.closest('.modal-container')) {
            setShowModal(false);
          }
        }}
        onCloseBtn={() => setShowModal(false)}
        deleteUser={() => deleteUser()}
      />
      <Back onClick={backToHome} text='profile'/>
      <div className='profile-content'>
        <img src={profilePicture === null ? Profile : profilePicture} className='profile-picture'/>
        <div className='profile-text'>
          <h1>{currentProfile.username}</h1>
          <p><span>{t("native language")}:</span>{currentProfile.nativeLanguage}</p>
          <p><span>{t("learning language")}:</span>{currentProfile.learningLanguage}</p>
          <p><span>{t("joined PicPhrase")}:</span>{currentProfile.accountJoinDate}</p>
        </div>
      </div>
      <Button className='delete' text='delete account' onClick={() => setShowModal((prev) => !prev)}/>
      <Button className='delete' text='Log Out' onClick={handleLogout}/>
    </motion.div>
  )
}
