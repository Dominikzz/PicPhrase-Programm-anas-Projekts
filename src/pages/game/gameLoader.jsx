import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

import logo from '../../assets/svg/icons/logo.svg';
import info from '../../assets/svg/icons/info.svg';

import './game.scss';

export default function gameLoader() {
    const navigate = useNavigate()
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <motion.div
            className='game-loader-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.img src={logo} />
            <motion.h1
                className='logo-name'
                animate={{
                    letterSpacing: isReady ? ['0rem', '0rem', '0rem'] : ['0rem', '1.5rem', '0rem'],
                }}
                transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.3,
                }}
            >
                PicPhrase
            </motion.h1>
            {isReady ? (
                <>
                    <motion.p>Game Ready!</motion.p>
                    <motion.button
                        whileHover={{scale: 1.06}}
                        whileTap={{scale: 1}}
                        animate={{opacity: [1, 0.78, 1]}}
                        onClick={() => navigate('/game')}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.25,
                        }}
                    >Continue</motion.button>
                </>
            ) : (
                <motion.p>Game loading...</motion.p>
            )}
            <div className='info'>
                <img src={info}/>
                <span>At the start of the game you will have 15 seconds to guess what is shown in the picture</span>
            </div>
        </motion.div>
    );
}
