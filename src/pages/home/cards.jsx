import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/gameContext';
import { useProfile } from '../../context/profileContext';

import nature from '../../assets/images/nature.png';
import whiteStar from '../../assets/svg/icons/whiteStar.svg';
import fullStar from '../../assets/svg/icons/fullStar.svg';
import arrowSquear from '../../assets/svg/icons/arrowSquear.svg';
import enterGame from '../../assets/svg/icons/enterGame.svg';

import './home.scss';

export default function Cards() {
    const { t } = useTranslation();
    const { currentProfile, addToProfile } = useProfile();
    const navigate = useNavigate();

    const cardsData = [
        { name: t('travel'), img: null },
        { name: t('rooms'), img: null },
        { name: t('professions'), img: null },
        {
            name: t('nature'),
            img: nature,
            stars: 4,
            subTopics: ['Animals', 'Weather', 'Geography', 'Plants'],
        },
        { name: t('technologies'), img: null },
        { name: t('common phrases'), img: null },
        { name: t('sports'), img: null },
        { name: t('food'), img: null },
    ];

    const { setChosenTopic } = useGame();

    const [currentTopic, setCurrentTopic] = useState(cardsData[3]);
    const [topicProgress, setTopicProgress] = useState(0);

    useEffect(() => {
        if (currentTopic) {
            const subtopicProgressSum = currentTopic.subTopics.reduce(
                (accumulator, subTopic) => accumulator + (currentProfile[subTopic] || 0),
                0
            );
            const averageProgress = subtopicProgressSum / currentTopic.subTopics.length;
            setTopicProgress(averageProgress);
        }
    }, [currentProfile, currentTopic]);

    const handleGame = (chosenTopic) => {
        navigate('/gameLoader');
        setChosenTopic(chosenTopic);

        if (currentProfile[chosenTopic] === undefined) {
            addToProfile(chosenTopic);
        }
    };

    return (
        <motion.div className="cards-container">
            <div className="side-container">
                <h1>Topics</h1>
                <div className="topics">
                    {cardsData.map((card, index) => (
                        <div className="topic-container" key={index}>
                            <img
                                src={whiteStar}
                                alt="white star"
                                className={card.img === null ? 'unpublished' : ''}
                            />
                            <div
                                className={card.img === null ? 'topic unpublished' : 'topic'}
                                onClick={() => {
                                    if (card.img === null) {
                                        return
                                    } else {
                                        setCurrentTopic(card)
                                    }
                                }}
                            >
                                <p>{card.name}</p>
                                <img
                                    src={arrowSquear}
                                    alt="arrow square"
                                    className={card.img === null ? 'unpublished' : ''}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chosen-topic-container">
                {currentTopic === null ? (
                    <h1>Choose a Topic</h1>
                ) : (
                    <>
                        <div className="full-stars">
                            {Array.from({ length: currentTopic.stars }).map((_, index) => (
                                <img key={index} src={fullStar} alt="full star" />
                            ))}
                        </div>
                        <div className="card">
                            <img src={currentTopic.img} alt={currentTopic.name} />
                            <p>{Math.round(topicProgress)}% Completed</p>
                            <h1>{currentTopic.name}</h1>
                        </div>
                        <div className="card-topics">
                            {currentTopic.subTopics.map((subTopic, index) => (
                                <div
                                    key={index + 'a'}
                                    className="sub-topic"
                                    onClick={() => handleGame(subTopic)}
                                >
                                    <p key={index + 'b'}>{subTopic}</p>
                                    <div key={index + 'c'} className="subtopic-percent">
                                        <p key={index + 'd'} className="percent">
                                            {currentProfile[subTopic] || 0}%
                                        </p>
                                    </div>
                                    <img key={index + 'e'} src={enterGame} alt="enter game" />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}

