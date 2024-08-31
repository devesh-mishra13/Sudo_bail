'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import Footer from './components/ShutterFooter';
import Image from 'next/image';
import styles from './page.module.css'; // Import the CSS file
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import AboutUs from './components/AboutUs';
import Section from './components/Section';
import BottomFooter from './components/Footer';


type PageName = 'HOME' | 'SERVICES' | 'WORKFLOW' | 'CONTACT' | 'ABOUT'; // Define a type for page names

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showFullscreenNavbar, setShowFullscreenNavbar] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activePage, setActivePage] = useState<PageName>('HOME'); // Use PageName type

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 1000); // Duration should match the animation duration

    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreenNavbar = () => {
    setShowFullscreenNavbar(prev => !prev);
    setShowContent(prev => !prev);
  };

  const handleNavClick = (page: PageName) => { // Explicitly type the page parameter
    setActivePage(page); // Set the active page
  };
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <div className={styles.container}>
        <div className={styles.rotatingBackgroundImage}>
        <Image 
          src="/AIL3.png"  
          alt="Rotating Background" 
          layout="fill" 
          objectFit="contain"
        />
      </div>
      {isClient && (
        <>
          <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ x }} 
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className={styles.headlineText}
      >
        Bail<br /> Reckøner
      </motion.p>
          {showNavbar && (
            <>
              <nav className={styles.navbar}>
                <div className={styles.navbarLeft}>
                  <div className={styles.navbarBrand}>
                    <img src="./AIL2.png" alt="Bail Reckoner" />
                  </div>
                </div>
                {/* <div className={styles.navbarCenter} onClick={toggleFullscreenNavbar}>
                  <div className={styles.plusLine}>
                    <div className={styles.plusHorizontal}></div>
                    <div className={styles.plusVertical}></div>
                  </div>
                </div> */}
                <div className={styles.navbarRight} onClick={toggleFullscreenNavbar}>
                  Menu
                </div>
              </nav>
              <motion.div
                className={`${styles.fullscreenNavbar} ${showFullscreenNavbar ? styles.open : ''}`}
                animate={{ y: showFullscreenNavbar ? 0 : '100%' }}
                initial={{ y: '-100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ display: showFullscreenNavbar ? 'flex' : 'none' }}
              >
                <motion.div
                  className={`${styles.topNavbar} ${showFullscreenNavbar ? styles.open : ''}`}
                  animate={{ y: showFullscreenNavbar ? 0 : '-100%' }}
                  initial={{ y: '-100%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className={styles.topNavbarLeft}>
                    <img src="./AIL2.png" alt="Bail Reckoner" />
                  </div>
                  <div className={styles.topNavbarRight} onClick={toggleFullscreenNavbar}>
                    <motion.div
                      className={styles.closeButton}
                      animate={{ scaleY: showFullscreenNavbar ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      Close
                    </motion.div>
                  </div>
                </motion.div>
                <div className={`fullscreenNavbar ${showFullscreenNavbar ? 'open' : ''}`}>
              <Footer onClose={toggleFullscreenNavbar} />
              </div>
                <motion.div
                  className={styles.fullscreenContent}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 100 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  <p
                    className={`${styles.navItem} ${activePage === 'HOME' ? styles.active : ''}`}
                    onClick={() => handleNavClick('HOME')}
                  >
                    HOME
                  </p>
                  <p
                    className={`${styles.navItem} ${activePage === 'SERVICES' ? styles.active : ''}`}
                    onClick={() => handleNavClick('SERVICES')}
                  >
                    SERVICES
                  </p>
                  <p
                    className={`${styles.navItem} ${activePage === 'WORKFLOW' ? styles.active : ''}`}
                    onClick={() => handleNavClick('WORKFLOW')}
                  >
                    WORKFLOW
                  </p>
                  <p
                    className={`${styles.navItem} ${activePage === 'CONTACT' ? styles.active : ''}`}
                    onClick={() => handleNavClick('CONTACT')}
                  >
                    CONTACT
                  </p>
                  <p
                    className={`${styles.navItem} ${activePage === 'ABOUT' ? styles.active : ''}`}
                    onClick={() => handleNavClick('ABOUT')}
                  >
                    ABOUT
                  </p>
                </motion.div>
              </motion.div>
            </>
          )}
        </>
      )}
      <AboutUs/>
      <Section/>
      <BottomFooter/>
    </div>
  );
}
