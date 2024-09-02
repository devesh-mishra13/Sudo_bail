'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from '../components/SentPage.module.css';

const SentPage: React.FC = () => {
  const searchParams = useSearchParams();
  // const status = searchParams.get('status');
  const [generatedMessage, setGeneratedMessage] = useState('');

  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  useEffect(() => {
    // Retrieve the form data from localStorage
    const formData = localStorage.getItem('formData');
    console.log(formData)
    if (formData) {
      const parsedData = JSON.parse(formData);
      generateMessageLineByLine(parsedData);
    } else {
      generateMessageLineByLine(`Something went wrong. Please try again.`);
    }
  }, []);

  const generateMessageLineByLine = (fullMessage: string) => {
    let currentMessage = '';
    const lines = fullMessage.split('\n'); // Split the message into lines
    let index = 0;
  
    const interval = setInterval(() => {
      if (index < lines.length) {
        currentMessage += `${lines[index]}\n`; // Add one line at a time
        setGeneratedMessage(currentMessage);
        index++;
      } else {
        clearInterval(interval); // Clear interval when all lines are displayed
      }
    }, 350); // Adjust speed here (in milliseconds, e.g., 500ms per line)
  };

  return (
    <div className={styles.sentPageContainer}>
      <div className={`${styles.responseContainer} ${ styles.errorAnimation}`}>
        <pre className={`${styles.confirmationMessage}`}>
          {generatedMessage === ""? "" : generatedMessage}
        </pre>
      </div>
      <button onClick={handleHome} className={styles.homeButton}>
        Go to Home <span className={`${styles.arrow} bounce`}>&#8594;</span>
      </button>
    </div>
  );
};

export default SentPage;
