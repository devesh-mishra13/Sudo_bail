'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../components/FormPage.module.css';

const FormPage: React.FC = () => {
  // State for form fields
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [incidentBrief, setIncidentBrief] = useState('');
  const [previousBail, setPreviousBail] = useState('');
  const [allowedTerms, setAllowedTerms] = useState('');
  const [groundsRejection, setGroundsRejection] = useState('');
  const [courtName, setCourtName] = useState('');
  const [otherCase, setOtherCase] = useState('');
  const [sectionsOffense, setSectionsOffense] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');

  // State for form step
  const [step, setStep] = useState(1);

  const router = useRouter();

  // Retrieve selected acts from localStorage
  const [selectedActs, setSelectedActs] = useState<string[]>([]);

  useEffect(() => {
    const acts = localStorage.getItem('selectedActs');
    if (acts) {
      setSelectedActs(JSON.parse(acts));
      localStorage.removeItem('selectedActs'); // Clean up
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Collect and format form data
    const formData = {
      personal_information: {
        age: Number(age),
        gender: gender
      },
      case_details: {
        "Incident Brief": incidentBrief,
        "Sections under which the offender was arrested": selectedActs
      },
      bail_application_history: {
        "Any previous bail application?": previousBail === 'Yes',
        "Terms & Conditions": allowedTerms,
        "Grounds for Rejection": groundsRejection,
        "Court where the application was decided": courtName
      },
      criminal_history: {
        "Any other previous case?": otherCase === 'Yes',
        "Sections of offense": sectionsOffense ? [sectionsOffense] : []
      },
      health_information: {
        "Any medical condition?": medicalCondition
      }
    };

    try {
      // Send form data to /submit_bail_application/
      const response = await fetch('http://192.168.146.244:8080/submit_bail_application/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to /sent after successful submission
        router.push('/sent');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className={styles.formPageContainer}>
      <h1 className={styles.formTitle}>Application Form</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {step === 1 && (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Personal Information:</legend>
            <label className={styles.label}>
              Age:
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              Gender:
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className={styles.select}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className={styles.label}>
              Incident Brief:
              <textarea
                value={incidentBrief}
                onChange={(e) => setIncidentBrief(e.target.value)}
                required
                className={styles.textarea}
              />
            </label>
            <button type="button" onClick={handleNext} className={styles.nextButton}>Next</button>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Previous Bail Application History:</legend>
            <label className={styles.label}>
              Any previous bail application?:
              <select
                value={previousBail}
                onChange={(e) => setPreviousBail(e.target.value)}
                required
                className={styles.select}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            {previousBail === 'Yes' && (
              <>
                <label className={styles.label}>
                  If Allowed:
                  <input
                    type="text"
                    value={allowedTerms}
                    onChange={(e) => setAllowedTerms(e.target.value)}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  Terms & Conditions:
                  <textarea
                    value={allowedTerms}
                    onChange={(e) => setAllowedTerms(e.target.value)}
                    className={styles.textarea}
                  />
                </label>
                <label className={styles.label}>
                  If Not:
                  <textarea
                    value={groundsRejection}
                    onChange={(e) => setGroundsRejection(e.target.value)}
                    className={styles.textarea}
                  />
                </label>
                <label className={styles.label}>
                  Court where the application was decided:
                  <input
                    type="text"
                    value={courtName}
                    onChange={(e) => setCourtName(e.target.value)}
                    className={styles.input}
                  />
                </label>
              </>
            )}
            <button type="button" onClick={handlePrevious} className={styles.previousButton}>Previous</button>
            <button type="button" onClick={handleNext} className={styles.nextButton}>Next</button>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Criminal History:</legend>
            <label className={styles.label}>
              Any other previous case?:
              <select
                value={otherCase}
                onChange={(e) => setOtherCase(e.target.value)}
                required
                className={styles.select}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            {otherCase === 'Yes' && (
              <label className={styles.label}>
                Sections of offense:
                <textarea
                  value={sectionsOffense}
                  onChange={(e) => setSectionsOffense(e.target.value)}
                  className={styles.textarea}
                />
              </label>
            )}
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Health Information:</legend>
              <label className={styles.label}>
                Any medical condition?:
                <select
                  value={medicalCondition}
                  onChange={(e) => setMedicalCondition(e.target.value)}
                  required
                  className={styles.select}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
            </fieldset>
            <button type="button" onClick={handlePrevious} className={styles.previousButton}>Previous</button>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </fieldset>
        )}
      </form>
    </div>
  );
};

export default FormPage;
