'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AboutUs.module.css'; // Create this CSS module for styling

const AboutUs: React.FC = () => {
  const [showAboutUs, setShowAboutUs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAboutUs(true);
    }, 2000); // Show after 2000 ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={styles.aboutUsContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: showAboutUs ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.textContainer}>
        <motion.p
          className={styles.aboutUsText}
          initial={{ opacity: 0 }}
          animate={{ opacity: showAboutUs ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            className={styles.line1}
            initial={{ opacity: 0 }}
            animate={{ opacity: showAboutUs ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }} // Delay for each line
          >
            With precision, insight, and dedication,
          </motion.span>
          <br />
          <motion.span
            className={styles.line2}
            initial={{ opacity: 0 }}
            animate={{ opacity: showAboutUs ? 1 : 0 }}
            transition={{ duration: 1, delay: 2.5 }} // Delay for each line
          >
            we guide you through the intricate world of bail and legal processes.
          </motion.span>
          <br />
          <motion.span
            className={styles.line3}
            initial={{ opacity: 0 }}
            animate={{ opacity: showAboutUs ? 1 : 0 }}
            transition={{ duration: 1, delay: 3 }} // Delay for each line
          >
            Our approach ensures clarity and understanding,
          </motion.span>
          <br />
          <motion.span
            className={styles.line4}
            initial={{ opacity: 0 }}
            animate={{ opacity: showAboutUs ? 1 : 0 }}
            transition={{ duration: 1, delay: 3.5 }} // Delay for each line
          >
            transforming complex scenarios into manageable solutions
          </motion.span>
          <br />
          <motion.span
            className={styles.line5}
            initial={{ opacity: 0 }}
            animate={{ opacity: showAboutUs ? 1 : 0 }}
            transition={{ duration: 1, delay: 4 }} // Delay for each line
          >
            that leave a significant impact and drive successful outcomes.
          </motion.span>
        </motion.p>
        <motion.button
          className={styles.aboutUsButton}
          whileHover={{ backgroundColor: 'black', color: 'white' }} // Animation on hover
          whileTap={{ scale: 0.95 }} // Scale effect on click
        >
          About Us 🠖
        </motion.button>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomLine}></div>
        <p className={styles.latestWorkText}>
          Our<br />Latest<br />Work
        </p>
      </div>
    </motion.div>
  );
};

export default AboutUs;
