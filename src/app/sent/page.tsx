'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from '../components/SentPage.module.css';

const SentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [generatedMessage, setGeneratedMessage] = useState('');

  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  useEffect(() => {
    const formData = localStorage.getItem('formData');
    if (formData) {
      const parsedData = JSON.parse(formData);
      generateMessageLineByLine(parsedData);
    } else {
      generateMessageLineByLine(`Something went wrong. Please try again.`);
    }
  }, []);

  const generateMessageLineByLine = (fullMessage: string) => {
    let currentMessage = '';
    const lines = fullMessage.split('\n');
    let index = 0;

    const interval = setInterval(() => {
      if (index < lines.length) {
        currentMessage += `${lines[index]}\n`;
        setGeneratedMessage(currentMessage);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 350);
  };

  return (
    <div className={styles.sentPageContainer}>
      <div className={`${styles.responseContainer} ${styles.errorAnimation}`}>
        <pre className={styles.confirmationMessage}>
          {generatedMessage}
        </pre>
      </div>
      <button onClick={handleHome} className={styles.homeButton}>
        Go to Home <span className={`${styles.arrow} bounce}`}>&#8594;</span>
      </button>
    </div>
  );
};

export default function SentPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SentPage />
    </Suspense>
  );
}
