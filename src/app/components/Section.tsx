'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import { useRouter } from 'next/router'; 
import styles from './Section.module.css';
import FormPage from '../forms/page'
import Select from 'react-select';

// Define contentData with all photos set to './first.png'
const contentData = [
  { topLeftText: '01', photo: './first.png', ipcText: 'THE BHARATIYA NYAYA SANHITA, 2023' },
  { topLeftText: '02', photo: './first.png', ipcText: 'THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023' },
  { topLeftText: '03', photo: './first.png', ipcText: 'THE CODE OF CRIMINAL PROCEDURE, 1973' },
  { topLeftText: '04', photo: './first.png', ipcText: 'THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005' },
  { topLeftText: '05', photo: './first.png', ipcText: 'THE INDIAN PENAL CODE' },
  { topLeftText: '06', photo: './first.png', ipcText: 'THE INDECENT REPRESENTATION OF WOMEN (PROHIBITION) ACT, 1986' },
  { topLeftText: '07', photo: './first.png', ipcText: 'THE IMMORAL TRAFFIC (PREVENTION) ACT, 1956' },
  { topLeftText: '08', photo: './first.png', ipcText: 'THE INFORMATION TECHNOLOGY ACT, 2000' },
  { topLeftText: '09', photo: './first.png', ipcText: 'THE JUVENILE JUSTICE (CARE AND PROTECTION OF CHILDREN) ACT, 2015' },
  { topLeftText: '10', photo: './first.png', ipcText: 'THE NATIONAL INVESTIGATION AGENCY ACT, 2008' },
  { topLeftText: '11', photo: './first.png', ipcText: 'THE NATIONAL SECURITY ACT, 1980' },
  { topLeftText: '12', photo: './first.png', ipcText: 'THE PREVENTION OF CORRUPTION ACT, 1988' },
  { topLeftText: '13', photo: './first.png', ipcText: 'THE PREVENTION OF MONEY-LAUNDERING ACT, 2002' },
  { topLeftText: '14', photo: './first.png', ipcText: 'THE PROTECTION OF CHILDREN FROM SEXUAL OFFENCES ACT, 2012' },
  { topLeftText: '15', photo: './first.png', ipcText: 'THE SCHEDULED CASTES AND THE SCHEDULED TRIBES (PREVENTION OF ATROCITIES) ACT, 1989' },
  { topLeftText: '16', photo: './first.png', ipcText: 'TERRORIST AND DISRUPTIVE ACTIVITIES (PREVENTION) ACT, 1987' },
  { topLeftText: '17', photo: './first.png', ipcText: 'THE UNLAWFUL ACTIVITIES (PREVENTION) ACT, 1967' },
];

// Options for react-select with multi-select enabled
const options = contentData.map((item) => ({
  value: item.ipcText,
  label: item.ipcText
}));

const shuffleArray = (array: any[]) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Section: React.FC = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledActs, setShuffledActs] = useState<string[]>([]);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [selectedActs, setSelectedActs] = useState<string[]>([]);
  // const router = useRouter();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentData.length);
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setSelectedActs(selectedValues);
    if (selectedValues.length > 0) {
      const newIndex = contentData.findIndex(item => item.ipcText === selectedValues[0]);
      setCurrentIndex(newIndex);
    }
  };

  const handleActClick = (act: string) => {
    const newIndex = contentData.findIndex(item => item.ipcText === act);
    setCurrentIndex(newIndex);
  };

  const handleSubmit = () => {
    if (selectedActs.length > 0) {
      localStorage.setItem('selectedActs', JSON.stringify(selectedActs));
      window.location.href = '/forms';
    } else {
      console.log('No acts selected');
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShuffledActs(shuffleArray(contentData.map(item => item.ipcText)));
    }, 2500); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.sectionContainer} ref={ref}>
      <button className={styles.arrowButton} onClick={handleNext}>
        🡠
      </button>
      <div className={styles.selectContainer}>
        <Select
          options={options}
          onChange={handleSelectChange}
          placeholder="Select Acts"
          isMulti
          className={styles.select}
        />
      </div>
      <div className={styles.shuffledActsContainer}>
        {shuffledActs.map((act, index) => (
          <div
            key={index}
            className={styles.shuffledAct}
            onClick={() => handleActClick(act)}
          >
            {act}
          </div>
        ))}
      </div>
      <motion.div
        className={styles.textContainerx}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0, transition: { duration: 1 } },
        }}
      >
        <span className={styles.ipcText}>{contentData[currentIndex].ipcText}</span>
      </motion.div>
      <motion.div
        className={styles.photoContainer}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0, transition: { duration: 1 } },
        }}
      >
        <img
          src={contentData[currentIndex].photo}
          alt="Image Description"
          className={styles.photo}
        />
        <span className={styles.topLeftText}>{contentData[currentIndex].topLeftText}</span>
        <div className={styles.bottomLeftContainer}>
          <motion.button
            className={styles.aboutUsButton}
            whileHover={{ backgroundColor: 'black', color: 'white' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit} // Attach the submit handler here
          >
            CHECK YOUR BAIL ELIGIBILITY🠖
          </motion.button>
        </div>
      </motion.div>
      {/* <FormPage/> */}
      <div className={styles.bottomLine}></div>
    </div>
  );
};

export default Section;