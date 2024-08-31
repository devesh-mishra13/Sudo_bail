'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Section.module.css';
import Select from 'react-select';

// Define contentData with photos set to './first.png'
const contentData = [
  { topLeftText: '01', ipcText: 'THE BHARATIYA NYAYA SANHITA, 2023' },
  { topLeftText: '02', ipcText: 'THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023' },
  { topLeftText: '03', ipcText: 'THE CODE OF CRIMINAL PROCEDURE, 1973' },
  { topLeftText: '04', ipcText: 'THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005' },
  { topLeftText: '05', ipcText: 'THE INDIAN PENAL CODE' },
  { topLeftText: '06', ipcText: 'THE INDECENT REPRESENTATION OF WOMEN (PROHIBITION) ACT, 1986' },
  { topLeftText: '07', ipcText: 'THE IMMORAL TRAFFIC (PREVENTION) ACT, 1956' },
  { topLeftText: '08', ipcText: 'THE INFORMATION TECHNOLOGY ACT, 2000' },
  { topLeftText: '09', ipcText: 'THE JUVENILE JUSTICE (CARE AND PROTECTION OF CHILDREN) ACT, 2015' },
  { topLeftText: '10', ipcText: 'THE NATIONAL INVESTIGATION AGENCY ACT, 2008' },
  { topLeftText: '11', ipcText: 'THE NATIONAL SECURITY ACT, 1980' },
  { topLeftText: '12', ipcText: 'THE PREVENTION OF CORRUPTION ACT, 1988' },
  { topLeftText: '13', ipcText: 'THE PREVENTION OF MONEY-LAUNDERING ACT, 2002' },
  { topLeftText: '14', ipcText: 'THE PROTECTION OF CHILDREN FROM SEXUAL OFFENCES ACT, 2012' },
  { topLeftText: '15', ipcText: 'THE SCHEDULED CASTES AND THE SCHEDULED TRIBES (PREVENTION OF ATROCITIES) ACT, 1989' },
  { topLeftText: '16', ipcText: 'TERRORIST AND DISRUPTIVE ACTIVITIES (PREVENTION) ACT, 1987' },
  { topLeftText: '17', ipcText: 'THE UNLAWFUL ACTIVITIES (PREVENTION) ACT, 1967' },
];

// Options for react-select with multi-select enabled
const options = contentData.map((item) => ({
  value: item.ipcText,
  label: item.ipcText
}));

const Section: React.FC = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [selectedActs, setSelectedActs] = useState<string[]>([]);

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
      <div className={styles.rectangleContainer}>
        <div className={styles.cardsInnerContainer}>
          {contentData.map((item, index) => (
            <motion.div
              key={index}
              className={styles.card}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.cardText}>{item.ipcText}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className={styles.bottomc}>
        <motion.div
        className={styles.textContainer}
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
        className={styles.bottomLeftContainer}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0, transition: { duration: 1 } },
        }}
      >
        <motion.button
          className={styles.aboutUsButton1}
          whileHover={{ backgroundColor: 'black', color: 'white' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit} // Attach the submit handler here
        >
          CHECK YOUR BAIL ELIGIBILITY🠖
        </motion.button>
      </motion.div>
      </div>
      <div className={styles.bottomLine}></div>
    </div>
  );
};

export default Section;
