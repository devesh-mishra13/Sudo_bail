'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import styles from '../components/FormPage.module.css';

// Transform contentData into react-select format
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

// Convert contentData to react-select format
const options = contentData.map(item => ({
  value: item.ipcText,
  label: `${item.topLeftText}: ${item.ipcText}`
}));

const FormPage: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [incidentBrief, setIncidentBrief] = useState('');
  const [sections, setSections] = useState('');
  const [prevsections, setPrevSections] = useState('');
  const [previousBail, setPreviousBail] = useState('');
  const [bailOutcome, setBailOutcome] = useState('');
  const [allowedTerms, setAllowedTerms] = useState('');
  const [groundsRejection, setGroundsRejection] = useState('');
  const [courtName, setCourtName] = useState('');
  const [otherCase, setOtherCase] = useState('');
  const [sectionsOffense, setSectionsOffense] = useState<{ value: string; label: string }[]>([]);
  const [prevsectionsOffense, setPrevSectionsOffense] = useState<{ value: string; label: string }[]>([]);
  const [medicalCondition, setMedicalCondition] = useState('');
  const [medicalCondition1, setMedicalCondition1] = useState('');

  const [step, setStep] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const acts = localStorage.getItem('selectedActs');
    if (acts) {
      setSectionsOffense(JSON.parse(acts));
      localStorage.removeItem('selectedActs');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData: any = {};
  
    // Personal Information
    if (age && gender) {
      formData.personal_information = {
        age: Number(age),
        gender: gender,
      };
    }
  
    // Case Details
    if (incidentBrief && sectionsOffense.length > 0) {
      formData.case_details = {
        "Acts of Offence": sectionsOffense,
        "sections_of_offence": sections,
        "Incident Brief": incidentBrief,
      };
    }
  
    // Bail Application History
    if (previousBail === 'Yes') {
      formData.bail_application_history = {
        "Any previous bail application?": previousBail,
        "Outcome": bailOutcome,
        ...(bailOutcome === 'Allowed' && { "Terms & Conditions": allowedTerms }),
        ...(bailOutcome === 'Not Allowed' && { "Grounds for Rejection": groundsRejection }),
        "Court where the application was decided": courtName || undefined,
      };
    } else {
      formData.bail_application_history = {
        "Any previous bail application?": previousBail,
      };
    }
  
    // Criminal History
    if (otherCase === 'Yes') {
      formData.criminal_history = {
        "Any other previous case?": otherCase,
        "Prev Acts of Offence": prevsectionsOffense.map(option => option.value),
        "Prev Section of Offence": prevsections,
      };
    } else {
      formData.criminal_history = {
        "Any other previous case?": otherCase,
      };
    }
  
    // Health Information
    if (medicalCondition) {
      formData.health_information = {
        "Any medical condition?": medicalCondition1,
      };
    }
  
    try {
      const response = await fetch('https://bail-reckoner.onrender.com/submit_bail_application/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Parse the response body
        localStorage.setItem('formData', JSON.stringify(responseData));
        router.push('/sent');
      } else {
        console.error('Submission failed');
        router.push('/sent?status=error');
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

  const handleSelectChange = (selectedOptions: any) => {
    setPrevSectionsOffense(selectedOptions || []);
    // localStorage.setItem('selectedActs', JSON.stringify(selectedOptions || []));
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
            <label className={styles.label}>
              Sections of Offence:
              <input
                type="text"
                value={sections}
                onChange={(e) => setSections(e.target.value)}
                className={styles.input}
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
                  Outcome:
                  <select
                    value={bailOutcome}
                    onChange={(e) => setBailOutcome(e.target.value)}
                    required
                    className={styles.select}
                  >
                    <option value="">Select</option>
                    <option value="Allowed">Allowed</option>
                    <option value="Not Allowed">Not Allowed</option>
                  </select>
                </label>
                {bailOutcome === 'Allowed' && (
                  <label className={styles.label}>
                    Terms & Conditions:
                    <textarea
                      value={allowedTerms}
                      onChange={(e) => setAllowedTerms(e.target.value)}
                      className={styles.textarea}
                    />
                  </label>
                )}
                {bailOutcome === 'Not Allowed' && (
                  <label className={styles.label}>
                    Grounds for Rejection:
                    <textarea
                      value={groundsRejection}
                      onChange={(e) => setGroundsRejection(e.target.value)}
                      className={styles.textarea}
                    />
                  </label>
                )}
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
            <button type="button" onClick={handlePrevious} className={styles.prevButton}>Previous</button>
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
              <div>
                <label className={styles.label}>
                Prev Acts of Offence:
                <Select
                  isMulti
                  options={options}
                  value={prevsectionsOffense}
                  onChange={handleSelectChange}
                  className={styles.select}
                />
              </label>
                <label className={styles.label}>
              Sections of Offence:
              <input
                type="text"
                value={prevsections}
                onChange={(e) => setPrevSections(e.target.value)}
                className={styles.input}
              />
            </label>
              </div>
            )}
            <button type="button" onClick={handlePrevious} className={styles.prevButton}>Previous</button>
            <button type="button" onClick={handleNext} className={styles.nextButton}>Next</button>
          </fieldset>
        )}

        {step === 4 && (
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
            {medicalCondition === 'Yes' && (
              <label className={styles.label}>
                Details of medical condition:
                <textarea
                  value={medicalCondition1}
                  onChange={(e) => setMedicalCondition1(e.target.value)}
                  className={styles.textarea}
                />
              </label>
            )}
            <button type="button" onClick={handlePrevious} className={styles.prevButton}>Previous</button>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </fieldset>
        )}
      </form>
    </div>
  );
};

export default FormPage;
