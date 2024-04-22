import { React, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import lv from '../../assets/svg/flags/lv.svg'
import es from '../../assets/svg/flags/es.svg'
import fr from '../../assets/svg/flags/fr.svg'
import ru from '../../assets/svg/flags/ru.svg'
import it from '../../assets/svg/flags/it.svg'
import pt from '../../assets/svg/flags/pt.svg'
import de from '../../assets/svg/flags/de.svg'
import gb from '../../assets/svg/flags/gb.svg'

import './start.scss'

export default function languages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0, margin: "200px 0px 0px 0px" });

  return (
    <motion.section
        className='languages-container'
        ref={ref}
    >
      <div className='text-container'>
        <h1
          style={{
            transform: isInView ? "none" : "translateX(-100px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >Languages</h1>
        <p
          style={{
            transform: isInView ? "none" : "translateX(-140px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
          }}
        >Choose from 8 different languages<br></br>to play your game in</p>
        <p
          style={{
            transform: isInView ? "none" : "translateX(-180px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
          }}
        >Now available in - <span>German,<br></br>French, Italian, Russian, Latvian,<br></br>Spanish, English, and Portuguese</span></p>
      </div>
      <div className='flag-container'>
        <div className='flag-row'
          style={{
            transform: isInView ? "none" : "translateY(-150px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <div className='scroller-inner-upper'>
            <img src={lv}/>
            <img src={es}/>
            <img src={fr}/>
            <img src={ru}/>
            <img src={it}/>
            <img src={pt}/>
            <img src={de}/>
            <img src={gb}/>
            <img src={lv}/>
            <img src={es}/>
            <img src={fr}/>
            <img src={ru}/>
            <img src={it}/>
            <img src={pt}/>
            <img src={de}/>
            <img src={gb}/>
          </div>  
        </div>
        <div className='flag-row'
          style={{
            transform: isInView ? "none" : "translateY(150px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <div className='scroller-inner-bottom'>
            <img src={gb}/>
            <img src={de}/>
            <img src={pt}/>
            <img src={it}/>
            <img src={ru}/>
            <img src={fr}/>
            <img src={es}/>
            <img src={lv}/>
            <img src={gb}/>
            <img src={de}/>
            <img src={pt}/>
            <img src={it}/>
            <img src={ru}/>
            <img src={fr}/>
            <img src={es}/>
            <img src={lv}/>
          </div>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1711719318">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
      </div>
      <div className="custom-shape-divider-top-1711719045">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
      </div>
    </motion.section>
  )
}