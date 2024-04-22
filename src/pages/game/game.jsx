import { React, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../context/gameContext'
import { useProfile } from '../../context/profileContext'

import logout from '../../assets/svg/icons/logout.svg'
import pauseIcon from '../../assets/svg/icons/pause.svg'
import logo from '../../assets/svg/icons/logoGreen.svg'
import logoWhite from '../../assets/svg/icons/logoWhite.svg'
import logoGreyBackground from '../../assets/svg/icons/logoGreyBackground.svg'

import './game.scss'

export default function game() {
  const { updateProfile, currentProfile } = useProfile();
  const navigate = useNavigate();
  const [pause, setPause] = useState(false)
  const [time, setTime] = useState(15);
  const [totalTime, setTotalTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverScreen, setGameOverScreen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const { currentIds, currentGame, setCurrentGame, currentGameInfo } = useGame();

  const [optionWords, setOptionWords] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const [gameTopic, setGameTopic] = useState('Game');

  useEffect(() => {
    const storedTopic = localStorage.getItem('chosenTopic');
    setGameTopic(storedTopic)
  }, []);

  useEffect(() => {
    setShowAnswer(false);
    if (currentGame.length > 0) {
      const game = () => {
        console.log(currentGame)
        const randomIndex = Math.floor(Math.random() * currentGame.length);
        const randomArray = currentGame[randomIndex];
        setCurrentGame(currentGame.filter((pair) => pair !== randomArray));
        setCurrentImage(randomArray[0]);
        setCurrentWord(randomArray[1]);
      }
      game();
    } else if (currentGame.length < 1 && totalTime > 2) {
      handleGameOver();
    } else {
      navigate('/home');
    }
  }, [score, wrongAnswers]);

  useEffect(() => {
    if (currentWord) {
      const setRandomOptionWords = () => {
        if (currentIds && currentIds.length >= 3) {
          const randomIds = [];
          while (randomIds.length < 3) {
            const randomIndex = Math.floor(Math.random() * currentIds.length);
            const randomId = currentIds[randomIndex];
            if (!randomIds.includes(randomId) && randomId !== currentWord) {
              randomIds.push(randomId);
            }
          }
          randomIds.push(currentWord);
          randomIds.sort(() => Math.random() - 0.5);
          setOptionWords(randomIds);
        }
      };
      setRandomOptionWords();
    }
  }, [currentIds, currentWord]);

  useEffect(() => {
    let currentTimer;
  
    if (time > 0 && !pause) {
      currentTimer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time <= 0) {
      setGameOver(true);
      handleGameOver();
    }
  
    return () => clearInterval(currentTimer); 
  }, [time, pause, navigate]);

  useEffect(() => {
    let totalTimer;
  
    if (!pause && !gameOverScreen) {
      totalTimer = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(totalTimer); 
  }, [totalTime, pause, gameOver]);
  
   
  const checkAnswer = (word) => {
    setShowAnswer(true);
    if (word === currentWord) {
      setTimeout(() => {
        setScore((prev) => prev + 1);
        setTime(15);
      }, 1000);
    } else {
      setTimeout(() => {
        setWrongAnswers((prev) => prev + 1);
      }, 1000);
    }
  }

  const handleGameOver = () => {
    setGameOverScreen(true);
    const chosenTopic = localStorage.getItem('chosenTopic');
    const scorePercentage = Math.floor((score / currentGameInfo.length) * 100);
    if (currentProfile[chosenTopic] < scorePercentage) {
      updateProfile(chosenTopic, scorePercentage);
    }
  } 

  return (
    <motion.div 
      className='game-container'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.2}}
    >
      <div className={pause ? 'pause-screen' : 'inactive'} onClick={() => setPause((prev) => !prev)}>
        <h1>Click Anywhere<br></br>To Resume</h1>
      </div>
      <div className={gameOverScreen ? 'game-over-container' : 'inactive'}>
        <img src={logoGreyBackground} className='background-logo-left'/>
        <img src={logoGreyBackground} className='background-logo-right'/>
        <div className='game-over'>
          <img src={logoWhite}/>
          <h1>Game {gameOver ? 'Over' : 'Completed'}</h1>
          <div className='game-stats'>
            <p>Game Lasted: {totalTime}s</p>
            <p>Score: {score}/{currentGameInfo.length}</p>
            <p>Wrong Answers: {wrongAnswers}</p>
          </div>
          <motion.button 
            whileHover={{scale: 1.03, opacity: 0.8}}
            whileTap={{scale: 0.99, opacity: 0.7}}
            transition={{duration: 0.1, ease: 'easeInOut'}}
            onClick={() => {
            navigate('/home')
            window.location.reload()}}
          >
            Return Home
          </motion.button>
        </div>
      </div>
      <div className='game-header'>
        <motion.img src={logout} onClick={() => navigate('/home')} whileHover={{scale: 1.08, transition: 0.2}}/>
        <motion.img src={pauseIcon} onClick={() => setPause((prev) => !prev)} whileHover={{scale: 1.08, transition: 0.2}}/>
      </div>
      <div className='game-content'>
        <h1>{gameTopic}</h1>
        <img src={currentImage}/>
        <div className='game-options'>
          {optionWords && optionWords.map((word, index) => (
            <motion.div
              className={showAnswer ? word === currentWord ? 'correct option' : 'incorrect option' : 'option'} 
              onClick={() => checkAnswer(word)} key={index}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.99}}
              transition={{duration: 0.1, ease: 'easeInOut'}}
            >
              <p>{word}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className='game-footer'>
        <p>Time: {time}s</p>
        <img src={logo}/>
        <p>Score: {score}/{currentGameInfo.length}</p>
      </div>
    </motion.div>
  )
}

