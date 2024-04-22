import { React, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router';

import logogrid from '../../assets/images/logogrid.png'
import google from '../../assets/svg/icons/google.svg'
import Button from '../../components/button'

import './start.scss'

export default function picphrase() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
        className='picphrase-container'
    >
      <motion.img 
        src={logogrid}
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateX(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
        }}
      />
      <motion.div 
        className='picphrase-text-container'
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
        }}
      >
        <div className='logo-pair'>
            <h1>PicPhrase</h1>
            <p>LEARN BY PLAYING</p>
        </div>
        <p className='main-text'>Retain new <strong>languages</strong> or expand<br></br>your native vocabulary<br></br>with flashcards</p>
        <div className='btn-container'>
          <div className='google' onClick={() => navigate('/signin')}>
            <img src={google} alt='Google logo'/>
            <p>Continue With Google</p>
          </div>
          <Button text='Sign In With Email' className='email-btn' onClick={() => navigate('/signin')}/>
        </div>
      </motion.div>
    </motion.div>
  )
}