import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ScrollLine = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight > 1080 ? windowHeight : windowHeight * 1.5; // Adjust this threshold as needed
      const maxScroll = windowHeight > 1080 ? windowHeight : windowHeight * 1.5; // Adjust this to control the drawing speed

      // Calculate the length of the line
      const lineLength = 440; // Adjust according to your line's length
      const drawnLength = Math.min(scrollPosition - threshold, maxScroll);
      const dashLength = drawnLength * (lineLength / maxScroll);

      // If the scroll position crosses the threshold, draw the line
      if (scrollPosition >= threshold) {
        controls.start({ strokeDasharray: `${dashLength}, ${lineLength - dashLength}`, transition: { duration: 0.5 } });
      } else {
        controls.start({ strokeDasharray: `0, ${lineLength}` });
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <svg height="460" width="50">
      <motion.line
        x1="25"
        y1="10"
        x2="25"
        y2="450"
        stroke="#2d2f2c"
        strokeWidth="2"
        stroke-dasharray="5,5"
        animate={controls}
      />
      <circle cx="25" cy="10" r="5" fill="#2d2f2c" />
      <circle cx="25" cy="450" r="5" fill="#2d2f2c" />
    </svg>
  );
};

export default ScrollLine;



