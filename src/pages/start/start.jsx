import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router";

import logoWhite from "../../assets/svg/icons/logoWhite.svg";
import dropDownArrowWhite from "../../assets/svg/icons/dropDownArrowWhite.svg";
import Picphrase from "./picphrase.jsx";
import Languages from "./languages.jsx";
import Flashcards from "./flashcardsInfo.jsx";
import Footer from "./footer.jsx";

import "./start.scss";

export default function Start() {
  const navigate = useNavigate();
  const startRef = useRef(null);
  const languagesRef = useRef(null);
  const flashcardsRef = useRef(null);
  const footerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scrollToStart = () => {
    startRef.current.scrollIntoView({
      behavior: "smooth",
      duration: 1000,
      block: "start",
    });
  };
  const scrollToLanguages = () => {
    languagesRef.current.scrollIntoView({
      behavior: "smooth",
      duration: 1000,
      block: "center",
    });
  };
  const scrollToFlashcards = () => {
    flashcardsRef.current.scrollIntoView({
      behavior: "smooth",
      duration: 1000,
      block: "start",
    });
  };
  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({
      behavior: "smooth",
      duration: 1000,
      block: "start",
    });
  };

  return (
    <motion.div
      className="start-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <section ref={startRef} className="top-of-page"></section>
      <motion.div
        className="navbar-start-container"
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(-40px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s",
        }}
      >
        <img src={logoWhite} alt="Logo" onClick={scrollToStart}/>
        <div className="navigation-options">
          <p onClick={scrollToLanguages}>01 Languages</p>
          <p onClick={scrollToFlashcards}>02 Flashcards</p>
          <p onClick={scrollToFooter}>03 Play Now</p>
        </div>
        <div className="sign-in-pair" onClick={() => navigate("/signin")}>
          <p>Sign In</p>
          <img src={dropDownArrowWhite} alt="Dropdown Arrow" />
        </div>
      </motion.div>
      <section>
        <Picphrase />
      </section>
      <section ref={languagesRef}>
        <Languages />
      </section>
      <section ref={flashcardsRef}>
        <Flashcards />
      </section>
      <section className="footer-section" ref={footerRef}>
        <Footer />
        <div className="footer">
          <div className="line"></div>
          <div className="footer-content">
            <p onClick={scrollToStart}>PicPhrase</p>
            <div className="footer-links">
              <p onClick={scrollToLanguages}>01 Languages</p>
              <p onClick={scrollToFlashcards}>02 Flashcards</p>
              <p onClick={scrollToFooter}>03 Play Now</p>
            </div>
            <p>©2024</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
