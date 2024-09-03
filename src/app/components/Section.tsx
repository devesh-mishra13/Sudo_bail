'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Section.module.css';
import Select from 'react-select';

const contentData = [
  {
    topLeftText: '01',
    ipcText: 'THE BHARATIYA NYAYA SANHITA, 2023',
    pdfUrl: 'https://drive.google.com/file/d/1UBX7Q2W1uR_DJJ1rIG1ppVe70pLA4mw2/preview',
  },
  {
    topLeftText: '02',
    ipcText: 'THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023',
    pdfUrl: 'https://drive.google.com/file/d/1QCCegM3WxwxtFL6DGlt3OzcfHJw6YIVb/preview',
  },
  {
    topLeftText: '03',
    ipcText: 'THE CODE OF CRIMINAL PROCEDURE, 1973',
    pdfUrl: 'https://drive.google.com/file/d/1-vQRzPGPQBRtnZbqvM2CzNeizb6vnkEX/preview',
  },
  {
    topLeftText: '04',
    ipcText: 'THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005',
    pdfUrl: 'https://drive.google.com/file/d/1-vQRzPGPQBRtnZbqvM2CzNeizb6vnkEX/preview',
  },
  {
    topLeftText: '05',
    ipcText: 'THE INDIAN PENAL CODE',
    pdfUrl: 'https://drive.google.com/file/d/18LSr0voKtCEqBVPHEFRemGRDFBWMnpkK/preview',
  },
  {
    topLeftText: '06',
    ipcText: 'THE INDECENT REPRESENTATION OF WOMEN (PROHIBITION) ACT, 1986',
    pdfUrl: 'https://drive.google.com/file/d/18z__js1rf832EqB83u3YRtKYjL19UkRf/preview',
  },
  {
    topLeftText: '07',
    ipcText: 'THE IMMORAL TRAFFIC (PREVENTION) ACT, 1956',
    pdfUrl: 'https://drive.google.com/file/d/1RYmi-wsjrbcInPJebja4YrnqbPBEKcgI/preview',
  },
  {
    topLeftText: '08',
    ipcText: 'THE INFORMATION TECHNOLOGY ACT, 2000',
    pdfUrl: 'https://drive.google.com/file/d/1H1bm8QuON1GEk_MTQLKvBHGwXDx9durU/preview',
  },
  {
    topLeftText: '09',
    ipcText: 'THE JUVENILE JUSTICE (CARE AND PROTECTION OF CHILDREN) ACT, 2015',
    pdfUrl: 'https://drive.google.com/file/d/12BVJDKZtMPRNGnUbAKhsmGQJfet1xpUA/preview',
  },
  {
    topLeftText: '10',
    ipcText: 'THE NATIONAL INVESTIGATION AGENCY ACT, 2008',
    pdfUrl: 'https://drive.google.com/file/d/1gj2BnuOOPATpE4C-yVtDiAOgloQ1fdE4v/preview',
  },
  {
    topLeftText: '11',
    ipcText: 'THE NATIONAL SECURITY ACT, 1980',
    pdfUrl: 'https://drive.google.com/file/d/1pPpYyz0kMHoraa3P-W2PmAXUTMUnTAsz/preview',
  },
  {
    topLeftText: '12',
    ipcText: 'THE PREVENTION OF CORRUPTION ACT, 1988',
    pdfUrl: 'https://drive.google.com/file/d/1e4eqMe3DgZVKThsI-m_uuZizrWKCjzI_/preview',
  },
  {
    topLeftText: '13',
    ipcText: 'THE PREVENTION OF MONEY-LAUNDERING ACT, 2002',
    pdfUrl: 'https://drive.google.com/file/d/1yZR4HBMpbgIvbUo8-HAmPP2BirV7thVI/preview',
  },
  {
    topLeftText: '14',
    ipcText: 'THE PROTECTION OF CHILDREN FROM SEXUAL OFFENCES ACT, 2012',
    pdfUrl: 'https://drive.google.com/file/d/1BYp0-fqPbW5vjRent6f0frs7LkL2bRC4/preview',
  },
  {
    topLeftText: '15',
    ipcText: 'THE SCHEDULED CASTES AND THE SCHEDULED TRIBES (PREVENTION OF ATROCITIES) ACT, 1989',
    pdfUrl: 'https://drive.google.com/file/d/1G9WiKpk52gwU6BsFBoRMsVsK6taALAy5/preview',
  },
  {
    topLeftText: '16',
    ipcText: 'TERRORIST AND DISRUPTIVE ACTIVITIES (PREVENTION) ACT, 1987',
    pdfUrl: 'https://drive.google.com/file/d/1-7cQZiQ3_YpUlTlTT1bHoO8lwezQ6vyN/preview',
  },
  {
    topLeftText: '17',
    ipcText: 'THE UNLAWFUL ACTIVITIES (PREVENTION) ACT, 1967',
    pdfUrl: 'https://drive.google.com/file/d/1VjmO4-BxtJCdFJ77Z7pYnoedhBuq92Px/preview',
  },
];


// Options for react-select with multi-select enabled
const options = contentData.map((item) => ({
  value: item.ipcText,
  label: item.ipcText
}));

const Section: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(contentData[0].pdfUrl);
  const [closeBut, setCloseBut] = useState(false);
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

  const handleClose = () => {
    setCloseBut(false)
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
              onClick={() => {
                setCurrentIndex(index);
                setCloseBut(true)
                setSelectedPdfUrl(contentData[index].pdfUrl);
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.cardText}>{item.ipcText}</span>
            </motion.div>
          ))}
        </div>
        {closeBut && (
        <div className={styles.pdfContainer}>
          <button className={styles.closeButton} onClick={handleClose}>
            &times;
          </button>
          <iframe
            height={'100%'}
            width={'100%'}
            src={selectedPdfUrl}
            title="PDF Viewer"
          ></iframe>
        </div>
      )}
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
