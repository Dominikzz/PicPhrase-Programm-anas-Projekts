import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { dataBase } from "../../firebase.jsx";
import { storage } from "../../firebase.jsx";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";


import BackButton from '../../components/backButton.jsx'

import './admin.scss'

export default function admin() {
  const navigate = useNavigate()

  const [topic, setTopic] = useState('')
  const [word, setWord] = useState('')

  const Cards = [

  ]


  const addCards = async () => {
    const accountsRef = collection(dataBase, topic);
    Cards.forEach(async (card) => {
      const imageRef = ref(storage, `Geography/${card.english}.png`);
      try {
        const downloadURL = await getDownloadURL(imageRef);
        await setDoc(doc(accountsRef, card.english), {
          english: card.english,
          latviešu: card.latviešu,
          français: card.français,
          deutsch: card.deutsch,
          español: card.español,
          italiano: card.italiano,
          pусский: card.pусский,
          português: card.português,
          image: downloadURL,
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  const updateCard = async () => {
    const topicCard = doc(dataBase, topic, word);

    try {
      await updateDoc(topicCard, {
        english: english,
        latviešu: latviešu,
        français: français,
        deutsch: deutsch,
        español: español,
        italiano: italiano,
        pусский: pусский,
        português: português,
        image: image,
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className='admin-container'
    >
      <BackButton text='Admin Dashboard' onClick={() => navigate('/home')} />
      <div className='admin-content'>
        <div className='add-card'>
          <h1>Add Topic Card</h1>
          <input type='text' placeholder='Topic' onChange={(e) => setTopic(e.target.value)} />
          <button onClick={() => addCards()}>Create</button>
        </div>
        <div className='edit-card'>
          <h1>Edit Topic Card</h1>
          <input type='text' placeholder='Word' onChange={(e) => setWord(e.target.value)} />
          <button onClick={() => updateCard()}>Edit</button>
        </div>
      </div>
    </motion.div>
  )
}
