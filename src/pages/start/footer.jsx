import { React, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router";

import CommingSoon from "./commingSoon.jsx";
import Button from "../../components/button.jsx";

import "./start.scss";

export default function footer() {
  const navigate = useNavigate();  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div className="footer-container">
      <div className="custom-shape-divider-top-1711720721">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <CommingSoon />
      <div className="play-now-container" ref={ref}>
        <div className="text">
          <h1
            style={{
              transform: isInView ? "none" : "translateX(-100px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
            }}
          >
            Want to play now?
          </h1>
          <p
            style={{
              transform: isInView ? "none" : "translateX(-150px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
            }}
          >
            Sign up and create an account for free
          </p>
        </div>
        <Button text="Get Started" className="play-now-btn" onClick={() => navigate('/signin')}/>
      </div>
    </motion.div>
  );
}
