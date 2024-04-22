import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase.jsx";
import { useProfile } from "../../context/profileContext.jsx";
import { dataBase } from "../../firebase.jsx";
import { collection, setDoc, doc } from "firebase/firestore";
import { useAnimate, motion, AnimatePresence } from "framer-motion";

import google from "../../assets/svg/icons/google.svg";
import email from "../../assets/svg/icons/email.svg";
import password from "../../assets/svg/icons/password.svg";
import errorIcon from "../../assets/svg/icons/error.svg";
import passwordConfirm from "../../assets/svg/icons/passwordConfirm.svg";
import Navbar from "../../components/navbarStart.jsx";

import "./signin.scss";

export default function signin() {
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Somthing went wrong");

  const ErrorModal = (errorMessage) => {
    setErrorMessage(errorMessage);
    setErrorModal(true);
    setTimeout(() => {
      setErrorModal(false);
    }, 3500);
  };

  const { documentIds } = useProfile();
  const accountsRef = collection(dataBase, "userAccounts");

  const signInWithGoogle = async () => {
    try {
      const newUser = await signInWithPopup(auth, googleProvider);
      if (documentIds.includes(newUser.user.uid)) {
        navigate("/home");
      } else {
        ProfileSetup(newUser);
        navigate("/profileSetup");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ProfileSetup = async (newUser) => {
    try {
      await setDoc(doc(accountsRef, newUser.user.uid), {
        nativeLanguage: "",
        nativeLanguageCode: "",
        learningLanguage: "",
        learningLanguageCode: "",
        username: "",
        accountJoinDate: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/home");
    } catch (error) {
      ErrorModal("Incorrect e-mail or password");
    }
  };

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    if (signUpPassword.length < 6) {
      ErrorModal("Password must be at least 6 characters long");
    } else if (signUpConfirmPassword !== signUpPassword) {
      ErrorModal("Confirm password doesn't match your password");
    } else {
      try {
        const newUser = await createUserWithEmailAndPassword(
          auth,
          signUpEmail,
          signUpPassword
        );
        ProfileSetup(newUser);
        navigate("/profileSetup");
      } catch (error) {
        if (error.code === "auth/invalid-email") {
          ErrorModal("Invalid e-mail adress");
        } else if (error.code === "auth/email-already-in-use") {
          ErrorModal("E-mail already registered! Try loging in");
        } else {
          console.error(error);
        }
      }
    }
  };

  const [afterAnimation, setAfterAnimation] = useState(false);
  const [sliderDirection, setSliderDirection] = useState(true);
  const [scope, animate] = useAnimate();

  const animation = async () => {
    if (afterAnimation === false) {
      await animate(
        ".toggle-left",
        { transform: "translateX(-150%)",},
      );
      await animate(".create-account", {
        transform: "translateX(-50px)",
      })
      setAfterAnimation(true);
    }
    setSliderDirection(!sliderDirection);
    animate(
      ".toggle-container",
      { transform: sliderDirection ? "translateX(-100%)" : "translateX(0)" },
      { duration: 0.3 },
      { transition: "easeInOut" }
    );
    animate(
      ".toggle",
      {
        borderRadius: sliderDirection
          ? "15px 120px 75px 15px"
          : "120px 15px 15px 70px",
      },
      { duration: 0.45 },
      { transition: "easeInOut" }
    );
    animate(
      ".toggle-right",
      { transform: sliderDirection ? "translateX(150%)" : "0" },
      { opacity: sliderDirection ? "0" : "1" },
      { duration: 0.3 },
      { transition: "easeInOut" }
    );
    animate(
      ".toggle-left",
      { transform: sliderDirection ? "0" : "translateX(-150%)" },
      { opacity: sliderDirection ? "1" : "0" },
      { duration: 0.3 },
      { transition: "easeInOut" }
    );
    animate(
      ".login",
      { 
        transform: sliderDirection ? "translateX(300px)" : "0",
        opacity: sliderDirection ? [1, 0] : [0, 1],
        zIndex: sliderDirection ? 1 : 100,
        duration: 0.3,
        transition: "linear",
      },
    );
    animate(
      ".create-account",
      { 
        transform: sliderDirection ? "0" : "translateX(-300px)",
        opacity: sliderDirection ? [0, 1] : [1, 0],
        zIndex: sliderDirection ? 100 : 1,
        duration: 0.3,
        transition: "linear",
      },
    );
  };

  return (
    <motion.div className="signin-container"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3, ease: 'easeInOut'}}
    >
      <Navbar onClick={() => navigate('/')}/>
      <AnimatePresence>
        {errorModal && (
          <motion.div 
            className={errorModal ? "error-modal" : "inactive"}
            initial={{ top: -100}}
            animate={{ top: 20}}
            exit={{ exit: true, top: -100, opacity: 0 }}
            transition={{ transition: 'linear', duration: 0.4 }}
          >
            <img src={errorIcon} alt="error icon"/>
            <p>{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="signin" ref={scope}
        initial={{transform: 'translateY(100px)'}}
        animate={{ transform: 'translateX(0px)' }}
        transition={{duration: 0.6, delay: 0.2, ease: 'easeInOut'}}
      >
        <div className="toggle-container">
          <div
            className="toggle"
            style={{
              borderRadius: sliderDirection
                ? "120px 15px 15px 70px"
                : "15px 120px 75px 15px",
            }}
          >
            <div
              className="toggle-panel toggle-left"
              style={{ opacity: afterAnimation ? "1" : "0" }}
            >
              <h1>Welcome Back!</h1>
              <p>Resume your language learning journey by logging into your account</p>
              <button className="hidden" id="login" onClick={animation}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hola amigo!</h1>
              <p>
                Unlock your language learning journey today by creating a free account and immersing yourself in interactive gameplay!
              </p>
              <button className="hidden" id="register" onClick={animation}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="login">
          <h1>Sign In</h1>
          <div className="google" onClick={signInWithGoogle}>
            <img src={google} alt="Google Logo" />
            <p>Sign In With Google</p>
          </div>
          <div className='devider'>
            <div className='line'></div>
            <p>OR</p>
            <div className='line'></div>
          </div>
          <div className="inputs">
            <div className="inputGroup">
              <input
                className="input"
                placeholder="Enter your email"
                type="email"
                required={true}
                autoComplete="on"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <img src={email} alt="email icon" className="img-labels"/>
            </div>
            <div className="inputGroup">
              <input
                className="input"
                type="password"
                required={true}
                placeholder="Enter your password"
                autoComplete="off"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <img src={password} alt="password icon" className="img-labels"/>
            </div>
          </div>
          <div className="btn-password">
            <button type="submit">Sign In</button>
            <p className="forgot-password">Forgot Your Password?</p>
          </div>
        </form>
        {/* Registration Form */}
        <form onSubmit={signUpWithEmail} className="create-account">
          <h1>Create Account</h1>
          <div className="google" onClick={signInWithGoogle}>
            <img src={google} alt="google logo" />
            <p>Continue With Google</p>
          </div>
          <div className="inputs">
            <div className='devider'>
              <div className='line'></div>
              <p>OR</p>
              <div className='line'></div>
            </div>
            <div className="inputGroup">
              <input
                className="input"
                required={true}
                type="email"
                placeholder="Enter your email"
                value={signUpEmail}
                autoComplete="on"
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <img src={email} alt="email icon" className="img-labels"/>
            </div>
            <div className="inputGroup">
              <input
                placeholder="Enter your password"
                required={true}
                className="input"
                type="password"
                value={signUpPassword}
                autoComplete="off"
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
              <img src={password} alt="password icon" className="img-labels"/>
            </div>
            <div className="inputGroup">
              <input
                placeholder="Confirm password"
                required={true}
                className="input"
                type="password"
                value={signUpConfirmPassword}
                autoComplete="off"
                onChange={(e) => setSignUpConfirmPassword(e.target.value)}
              />
              <img src={passwordConfirm} alt="password confirm icon" className="img-labels"/>
            </div>
          </div>
          <div className="btn-password">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
