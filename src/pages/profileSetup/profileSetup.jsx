import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';
import { useProfile } from '../../context/profileContext.jsx';
import { dataBase } from "../../firebase.jsx";
import { updateDoc, doc } from "firebase/firestore";
import { useTranslation } from 'react-i18next';
import { useLanguages } from '../../context/languageContext.jsx';
import { motion } from 'framer-motion';

import Button from '../../components/button.jsx';
import backArrowWhite from '../../assets/svg/icons/backArrowWhite.svg';
import frontArrowWhite from '../../assets/svg/icons/frontArrowWhite.svg';
import defaultProfilePicture from '../../assets/svg/icons/profilePicture.svg';
import warning from '../../assets/svg/icons/warning.svg';

import './profileSetup.scss';

export default function ProfileSetup() {

    const { learningLanguages } = useLanguages();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const navigateHome = () => navigate('/home');

// Handle invalid user inputs
    const [errorStateLanguages, setErrorStateLanguages] = useState(false);
    const [errorStateUsername, setErrorStateUsername] = useState(false);

    const checkInformation = () => {
        if (nativeLanguage === '' || learningLanguage === '' || nativeLanguage === 'Choose Language' || learningLanguage === 'Choose Language') {
            console.log(nativeLanguage, learningLanguage);
            setErrorStateLanguages(true);
            setActiveIndex(0);
            setTimeout(() => {
                setErrorStateLanguages(false);
            }, 4000);
        } else if (activeIndex === 1 && (username.length < 4 || username.length > 20 || !username.match(/^[a-zA-Z0-9]+$/))) {
            setErrorStateUsername(true);
            setActiveIndex(1);
            setTimeout(() => {
                setErrorStateUsername(false);
            }, 4000);
        } else {
            return;
        }
    }

// Firebase profile setup functionality
    const { currentUser } = useAuth();
    const { profilePicture, uploadProfilePhoto } = useProfile();

    const [nativeLanguage, setNativeLanguage] = useState('');
    const [learningLanguage, setLearningLanguage] = useState('');
    const [username, setUsername] = useState('');

    const handleUpload = async (e) => {
        try {
            await uploadProfilePhoto(e)
        } catch (error) {
            console.log(error);
        }
    }

// Update firestore profile document with new information
    const updateProfileSetup = async () => {
        const userProfile = doc(dataBase, 'userAccounts', currentUser.uid);
        const chosenNativeLanguage = learningLanguages.find((lng) => lng.name === nativeLanguage);
        const chosenLearningLanguage = learningLanguages.find((lng) => lng.name === learningLanguage);

        try {
            await updateDoc(userProfile, {
                nativeLanguage: chosenNativeLanguage.name,
                learningLanguage: chosenLearningLanguage.name,
                username: username,
                accountJoinDate: new Date().toISOString().split('T')[0],
                nativeLanguageCode: chosenNativeLanguage.code,
                learningLanguageCode: chosenLearningLanguage.code,
            });
            navigateHome();
            window.location.reload(); 
        } catch (error) {
            console.error(error);
        }
    };

// slider functionality
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrevSlide = () => {
        setActiveIndex((prevIndex) => prevIndex - 1);
    };

    const handleNextSlide = () => {
        setActiveIndex((prevIndex) => prevIndex + 1);
        checkInformation();
    };

    return (
        <motion.div 
            className='profile-setup-container'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
        >
            <div className='profile-setup'>
                <h1>{t("profile setup")}</h1>
                <div className={`choose-container ${activeIndex !== 0 ? 'inactive' : ''}`}>
                    <h2>{t("choose languages")}</h2>
                    <div className='select-container'>
                        <div className='input-pair'>
                            <label>{t("native language")}</label>
                            <select onChange={(e) => setNativeLanguage(e.target.value)}>
                                <option>{t("choose language")}</option>
                                <option>english</option>
                                <option>latviešu</option>
                            </select>
                        </div>
                        <div className='input-pair'>
                            <label>{t("learning language")}</label>
                            <select onChange={(e) => setLearningLanguage(e.target.value)}>
                                <option>{t("choose language")}</option>
                                <option>english</option>
                                <option>español</option>
                                <option>français</option>
                                <option>latviešu</option>
                                <option>pусский</option>
                                <option>italiano</option>
                                <option>português</option>
                                <option>deutsch</option>
                            </select>
                        </div>
                    </div>
                    <div className={errorStateLanguages ? "error" : "inactive"}>
                        <img src={warning} alt="warning" />
                        <p className='error-text'>{t("select both languages!")}</p>
                    </div>
                    <div></div>
                </div>
                <div className={`choose-container ${activeIndex !== 1 ? 'inactive' : ''}`}>
                    <h2>{t("choose username")}</h2>
                    <div className='input-pair'>
                        <label>{t("username")}</label>
                        <input placeholder={t("choose username")} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='error'>
                        <img src={warning} alt="warning" />
                        <p>{t("username should be between 3 and 20 characters long and not contain any speacial characters")}</p>
                        <p className={errorStateUsername ? 'error-message' : 'inactive'}>{t("invalid username!")}</p>
                    </div>
                    <div></div>
                </div>

                <div className={`choose-container ${activeIndex !== 2 ? 'inactive' : ''}`}>
                    <h2>{t("choose profile picture")}</h2>
                    <div className='profile-picture-container'>
                        <img className='profile-picture' src={profilePicture === null ? defaultProfilePicture : profilePicture} alt='profile-picture' />
                        <input type='file' onChange={handleUpload} />
                    </div>
                    <div></div>
                </div>
                <div className={`choose-container ${activeIndex !== 3 ? 'inactive' : ''}`}>
                    <h2>{t("profile preview")}</h2>
                    <div className='profile-preview'>
                        <img className='profile-picture' src={profilePicture === null ? defaultProfilePicture : profilePicture}/>
                        <div className='preview-text'>
                            <h2>{username}</h2>
                            <p><span>{t("native language")}:<br></br></span> {nativeLanguage}</p>
                            <p><span>{t("learning language")}:<br></br></span> {learningLanguage}</p>
                        </div>
                    </div>
                    <Button className='submit' text={t("finish")} onClick={updateProfileSetup}/>
                </div>

                <div className='slider'>
                    <img src={backArrowWhite} id='back' className={activeIndex === 0 ? 'inactive' : ''} onClick={handlePrevSlide} />
                    <div className='dots'>
                        <div className={`dot ${activeIndex === 0 ? 'active' : ''}`}></div>
                        <div className={`dot ${activeIndex === 1 ? 'active' : ''}`}></div>
                        <div className={`dot ${activeIndex === 2 ? 'active' : ''}`}></div>
                        <div className={`dot ${activeIndex === 3 ? 'active' : ''}`}></div>
                    </div>
                    <img src={frontArrowWhite} id='front' className={activeIndex === 3 ? 'inactive' : ''} onClick={handleNextSlide} />
                </div>
            </div>
        </motion.div>
    );
}
