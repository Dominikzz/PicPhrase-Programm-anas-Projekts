import { React, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import Button from '../../components/button.jsx'
import apple from '../../assets/svg/icons/apple.svg'
import googlePlay from '../../assets/svg/icons/googleplay.svg'

import './start.scss'

export default function commingSoon() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });

  const ref2 = useRef(null);
  const isInView2 = useInView(ref, { once: true, amount: 0 });

  const ref3 = useRef(null);
  const isInView3 = useInView(ref, { once: true, amount: 0 });

  const ref4 = useRef(null);
  const isInView4 = useInView(ref, { once: true, amount: 0 });

  const ref5 = useRef(null);
  const isInView5 = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div
        className='comming-soon-container'
    >
      <h1
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateX(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
        }}
      >Comming Soon</h1>
      <div className='play-store-container'>
        <div className='play-store-pair'
          ref={ref2}
          style={{
            transform: isInView2 ? "none" : "translateX(150px)",
            opacity: isInView2 ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <img src={googlePlay}/>
          <p>Soon on - <br></br> Google Play Store</p>
        </div>
        <div className='play-store-pair'
          ref={ref3}
          style={{
            transform: isInView3 ? "none" : "translateX(150px)",
            opacity: isInView3 ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
          }}
        >
          <img src={apple}/>
          <p>Soon on - <br></br> Apple App Store</p>
        </div>
      </div>
      <p className='text'
      ref={ref4}
        style={{
          transform: isInView4 ? "none" : "translateX(200px)",
          opacity: isInView4 ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
        }}
      >
        Enter your e-mail<br></br>
        to get notified when <strong>PicPhrase</strong> is available on mobile:
      </p>
      <form
        ref={ref5}
        style={{
          transform: isInView5 ? "none" : "translateX(300px)",
          opacity: isInView5 ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
        }}
      >
        <input type='email' placeholder='E-mail...'/>
        <Button text='Send' className='form-btn'/>
      </form>
    </motion.div>
  )
}