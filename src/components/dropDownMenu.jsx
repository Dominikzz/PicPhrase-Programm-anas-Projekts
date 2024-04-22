import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguages } from '../context/languageContext.jsx';

import dropDownArrow from '../assets/svg/icons/dropDownArrow.svg';

import './componentsStyles.scss'

export default function dropDownMenu() {
      const { selectedLanguageObject, languages, changeLanguage } = useLanguages();

      const [isOpen, setIsOpen] = useState(false);

      const toggleDropdown = () => {
        setIsOpen(!isOpen);
        handleImageClick();
      };

      const [isRotated, setIsRotated] = useState(false);

      const handleImageClick = () => {
        setIsRotated((prev) => !prev);
      };
        
      return (
        <motion.div
            className="language-switcher"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 10 }}
            onClick={toggleDropdown}
            >
            <div className='current-content'>
                <img src={selectedLanguageObject.flag}/>
                {selectedLanguageObject.name}
                <motion.img 
                    src={dropDownArrow} className='dropDownArrow'
                    animate={{
                        rotate: isRotated ? 90 : 0 
                    }}
                />
            </div>
            <motion.ul
                initial={{ x: '100%' }}
                animate={isOpen ? { x: 0 } : {opacity: 0} }
                transition={{ type: 'spring', damping: 15 }}
                variants={{
                    open: { y: 0 },
                    closed: { y: '-100%' },
                }}
                className={isOpen ? '' : 'closed'}
            >
                {languages.map((language) => (
                <motion.li
                    key={language.code}
                    className={`dropdown-item ${language.code === selectedLanguageObject.code ? 'selected' : 'unselected'}`}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => changeLanguage(language.code)}
                >   
                <div className='content'>
                    <img src={language.flag}/>
                    {language.name}
                </div>
                </motion.li>
                ))}
            </motion.ul>
        </motion.div>
      );
    };
