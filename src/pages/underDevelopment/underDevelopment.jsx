import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { setDoc, doc, collection } from "firebase/firestore";
import { dataBase } from '../../firebase';

import Logo from '../../assets/svg/icons/logo.svg';
import Check from '../../assets/svg/icons/check.svg';

import './underDevelopment.scss';

export default function underDevelopment() {
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      const timeoutId = setTimeout(() => {
        setModal(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [modal]);

  const EmailSetup = async (email) => {
    const accountsRef = collection(dataBase, 'newsLetterList');
    try {
      await setDoc(doc(accountsRef, email), {
        email: email,
      });
      setModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    EmailSetup(email);
  };

  return (
    <div className='container'>
      {modal && (
        <motion.div
          className='modal'
          initial={{ top: -70, opacity: 0 }}
          animate={{ top: 30, opacity: 1 }}
          transition={{ transition: 'easeInOut', duration: 0.4 }}
        >
          <img src={Check} alt="Check icon" />
          E-mail signed up successfully!
        </motion.div>
      )}
      <div className='content'>
        <img src={Logo} alt="Logo" />
        <h1><strong>We are currently developing</strong><br />PicPhrase</h1>
      </div>
      <div className='news-letter'>
        <p>Be the first one to get notified when <strong>PicPhrase</strong> is available!</p>
        <form className='pair' onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input type='email' placeholder='E-mail...' value={email} onChange={handleEmailChange} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

