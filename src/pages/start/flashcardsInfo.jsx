import { React, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import ScrollLineUpper from './numberLineUpper.jsx'
import ScrollLineBottom from './numberLineBottom.jsx'
import cube from '../../assets/images/cube.png'
import aiflashcards from '../../assets/images/aiflashcards.png'
import topicpreview from '../../assets/images/topicpreview.png'

import './start.scss'

export default function flashcardsInfo() {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const isInView = useInView(ref, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const isInView3 = useInView(ref3, { once: true });
  const isInView4 = useInView(ref4, { once: true });
  const isInView5 = useInView(ref5, { once: true });

  return (
    <motion.div
        className='flashcards-info-container' 
    >
      <h1
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(-100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
        }}
      >
        FlashCards
      </h1>
      <div className='num-content-container'>
        <div 
          className='num-line'
          ref={ref2}
          style={{
            transform: isInView2 ? "none" : "translateX(-100px)",
            opacity: isInView2 ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
          }}
        >
          <h2 className='num'>01</h2>
          <ScrollLineUpper/>
          <h2 className='num'>02</h2>
          <ScrollLineBottom/>
          <h2 className='num'>03</h2>
        </div>
        <div className='content-container'>
          <div className='content-pair' ref={ref3}>
            <img src={cube}
              style={{
                transform: isInView3 ? "none" : "translateY(100px)",
                opacity: isInView3 ? 1 : 0,
                transition: "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
              }}
            />
            <div className='pair-text'>
              <h2
                style={{
                  transform: isInView3 ? "none" : "translateX(100px)",
                  opacity: isInView3 ? 1 : 0,
                  transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
                }}
              >Backed By Science</h2>
              <p
                style={{
                  transform: isInView3 ? "none" : "translateX(140px)",
                  opacity: isInView3 ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
              >
                Flashcards use a visual learning<br></br>
                method that is proven to help<br></br>
                retain and recall the information<br></br>
                you have learned
              </p>
            </div>
          </div>
          <div className='content-pair' ref={ref4}>
            <img src={aiflashcards}
              style={{
                transform: isInView4 ? "none" : "translateX(100px)",
                opacity: isInView4 ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
              }}
            />
            <div className='pair-text'>
              <h2
                style={{
                  transform: isInView4 ? "none" : "translateX(100px)",
                  opacity: isInView4 ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
                }}
              >Unique AI Generated<br></br>Images Fro Each Word</h2>
              <p
                style={{
                  transform: isInView4 ? "none" : "translateX(140px)",
                  opacity: isInView4 ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
              >
                Play through a growing library of<br></br>
                400+ words - each represented by<br></br>
                a unique Ai crafted image
              </p>
            </div>
          </div>
          <div className='content-pair' ref={ref5}>
            <img src={topicpreview}
              style={{
                transform: isInView5 ? "none" : "translateX(100px)",
                opacity: isInView5 ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
              }}
            />
            <div className='pair-text'>
              <h2
                style={{
                  transform: isInView5 ? "none" : "translateX(100px)",
                  opacity: isInView5 ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
                }}
              >Learn What you want</h2>
              <p
                style={{
                  transform: isInView5 ? "none" : "translateX(140px)",
                  opacity: isInView5 ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
              >
                Our library of words are split into<br></br>
                topics like - Nature, Technology,<br></br>
                Food, and Travel so you can decide<br></br>
                what you want to learn first
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
