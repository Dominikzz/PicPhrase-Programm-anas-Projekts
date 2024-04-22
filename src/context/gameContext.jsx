import { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { dataBase } from '../firebase.jsx';
import { useProfile } from './profileContext.jsx';

const GameContext = createContext();

export const useGame = () => {
    return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
    const { currentProfile } = useProfile();

    const [currentGameInfo, setCurrentGameInfo] = useState('');
    const [currentIds, setCurrentIds] = useState(null);
    const [currentGame, setCurrentGame] = useState([]);
    const [gameLanguage, setGameLanguage] = useState('english');

    useEffect(() => {
      if (currentProfile) {
        setGameLanguage(currentProfile.learningLanguage);
      }
    }, [currentProfile]);

    const fetchGameInfo = async (chosenTopic) => {
      try {
        const gameWords = await getDocs(collection(dataBase, chosenTopic));
        const words = gameWords.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          };
        });
        setCurrentGameInfo(words);
      } catch (error) {
        console.error("Error fetching game words: ", error);
      }
    }

    const fetchGame = () => {
      setCurrentGame(currentGameInfo.map((obj) => [obj.image, obj[gameLanguage], obj.id]));
    }

    const extractIds = (objects) => {
      setCurrentIds(objects.map((obj) => obj[gameLanguage]));
    }

    useEffect(() => {
      if (currentGameInfo) {
        extractIds(currentGameInfo);
        fetchGame();
      }
    }, [currentGameInfo]);
  

    useEffect(() => {
      const storedTopic = localStorage.getItem('chosenTopic');
      if (storedTopic) {
        fetchGameInfo(storedTopic);
      }
    }, []);

    const setChosenTopic = (topic) => {
      localStorage.setItem('chosenTopic', topic);
      fetchGameInfo(topic);
    }

    const value = {
        currentGameInfo,
        currentIds,
        currentGame,
        fetchGameInfo,
        setChosenTopic,
        setCurrentGame,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

