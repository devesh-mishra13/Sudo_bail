'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Ensures the animation triggers each time it's in view
    threshold: 0.1,
  });

  return (
    <motion.footer
      ref={ref}
      className={styles.footer}
      initial={{ opacity: 0, y: '50%' }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? '0%' : '50%' }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className={styles.content}>
        <div className={styles.contact}>
          <h2>Ready to simplify your legal challenges?</h2>
          <p className={styles.contactInfo}>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </p>
        </div>
        <div className={styles.address}>
          <h3>Our Office</h3>
          <p>Justice Tower</p>
          <p>High Court Road</p>
          <p>Prayagraj, India</p>
          <p>PIN 110001</p>
        </div>
        <div className={styles.getInTouch}>
          <h3>Get in Touch</h3>
          <p>Email: <a href="mailto:info@bailreckoner.com">info@bailreckoner.com</a></p>
          <p>Phone: <a href="tel:+911234567890">+91 123 456 7890</a></p>
        </div>
        <div className={styles.social}>
          <h3>Follow Us</h3>
          <div className={styles.socialLinks}>
            <a href="https://twitter.com/bailreckoner" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://www.instagram.com/bailreckoner" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/company/bailreckoner" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.facebook.com/bailreckoner" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.youtube.com/bailreckoner" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2024 Bail Reckoner</p>
        <p>All rights reserved</p>
        <a href="#terms">Terms & Conditions</a>
      </div>
    </motion.footer>
  );
};

export default Footer;
