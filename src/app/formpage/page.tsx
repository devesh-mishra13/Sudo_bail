'use client';
import React, { useState } from 'react';
import Select from 'react-select';
import styles from './FormPage.module.css';

const contentData = [
  { topLeftText: '01', ipcText: 'THE BHARATIYA NYAYA SANHITA, 2023' },
  { topLeftText: '02', ipcText: 'THE BHARATIYA NAGARIK SURAKSHA SANHITA, 2023' },
  { topLeftText: '03', ipcText: 'THE CODE OF CRIMINAL PROCEDURE, 1973' },
  { topLeftText: '04', ipcText: 'THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005' },
  { topLeftText: '05', ipcText: 'THE INDIAN PENAL CODE' },
];

const options = contentData.map(item => ({
  value: item.ipcText,
  label: `${item.topLeftText}: ${item.ipcText}`,
}));

const FormPage: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [incidentBrief, setIncidentBrief] = useState('');
  const [sections, setSections] = useState('');
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
  const [output, setOutput] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setOutput(`
      <h2>Bail Eligibility Assessment</h2>
      <p><strong>Case Summary:</strong></p>
      <p>The accused, a 25-year-old male, is facing charges under Section 302 of the Indian Penal Code (IPC) for murder and Section 20 of the Unlawful Activities (Prevention) Act, 1967 (UAPA) for possession of illegal drugs linked to terrorism-related activities. This is not his first offense, as he has a previous conviction under Section 307 of the IPC, suggesting a pattern of violent behavior.</p>
  
      <p><strong>Decision-Making Process:</strong></p>
  
      <p><strong>Step 1: Evaluate Offense and Arrest Details</strong></p>
      <p><em>Severity:</em> The charges are extremely serious. Section 302 of the IPC carries a potential life sentence or even the death penalty, while Section 20 of UAPA deals with acts deemed terrorism-related, resulting in stringent penalties. Both offenses are non-bailable.</p>
  
      <p><strong>Step 2: Review Personal Circumstances</strong></p>
      <p><em>Age and Gender:</em> The accused is a 25-year-old male. This does not present any special considerations for bail.</p>
  
      <p><strong>Step 3: Analyze Previous Bail Application</strong></p>
      <p><em>Outcome:</em> The previous bail application was denied by the Sessions Court.</p>
      <p><em>Reasoning:</em> The denial was due to the severity of the charges, the potential threat to society, the risk of tampering with evidence, and the involvement of terrorism-related activities under UAPA.</p>
  
      <p><strong>Step 4: Assess Criminal History</strong></p>
      <p><em>Previous Offenses:</em> The accused has a previous conviction under Section 307 of the IPC, indicating a history of violent behavior and a disregard for the law.</p>
  
      <p><strong>Step 5: Review Prison History</strong></p>
      <p><em>Imprisonment:</em> No information is provided on the accused's previous prison history.</p>
  
      <p><strong>Step 6: Consider Health Information</strong></p>
      <p><em>Medical Conditions:</em> No health information is available to consider.</p>
  
      <p><strong>Step 7: Final Decision</strong></p>
      <p><em>Recommendation:</em> Based on the gravity of the charges, the accused's prior criminal history, and the potential threat to society, <strong>bail should be denied.</strong></p>
  
      <p><strong>Reasons for Denial:</strong></p>
      <ul>
        <li><em>Severity of Charges:</em> The charges of murder and terrorism-related offenses are extremely serious and carry significant potential for harm.</li>
        <li><em>High Risk of Flight:</em> The accused's involvement in terrorism-related activities, as well as the severity of the murder charge, increases the likelihood of flight to avoid justice.</li>
        <li><em>Criminal History:</em> The accused's previous conviction under Section 307 of the IPC demonstrates a pattern of violent behavior, further increasing the risk of re-offending.</li>
        <li><em>Previous Bail Denial:</em> The Sessions Court previously denied bail, recognizing the seriousness of the offenses and the potential threat the accused poses to society.</li>
      </ul>
  
      <p><strong>Conclusion:</strong></p>
      <p>Given the combination of factors, the accused poses a significant risk to public safety and there is a high likelihood of flight. Therefore, bail should be denied.</p>
    `);
  };
  

  return (
    <div className={styles.formPageWrapper}>
      {/* <div className={styles.imageContainer}>
        <img src="/rejected3-removebg-preview.png" alt="Rejection Image" className={styles.centeredImage} />
      </div> */}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <h2>Step 1: Personal Information</h2>
            <label className={styles.formLabel}>Age:
              <input
                type="text"
                className={styles.formInput}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
            <label className={styles.formLabel}>Gender:
              <select className={styles.formSelect} value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className={styles.formLabel}>Incident Brief:
              <textarea
                className={styles.formTextarea}
                value={incidentBrief}
                onChange={(e) => setIncidentBrief(e.target.value)}
                required
              />
            </label>
          </div>

          <div className={styles.section}>
            <h2>Step 2: Bail Application History</h2>
            <label className={styles.formLabel}>Any previous bail application?:
              <select className={styles.formSelect} value={previousBail} onChange={(e) => setPreviousBail(e.target.value)} required>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            {previousBail === 'Yes' && (
              <>
                <label className={styles.formLabel}>Outcome:
                  <select className={styles.formSelect} value={bailOutcome} onChange={(e) => setBailOutcome(e.target.value)} required>
                    <option value="">Select</option>
                    <option value="Allowed">Allowed</option>
                    <option value="Not Allowed">Not Allowed</option>
                  </select>
                </label>
                {bailOutcome === 'Allowed' && (
                  <label className={styles.formLabel}>Terms & Conditions:
                    <textarea
                      className={styles.formTextarea}
                      value={allowedTerms}
                      onChange={(e) => setAllowedTerms(e.target.value)}
                    />
                  </label>
                )}
                {bailOutcome === 'Not Allowed' && (
                  <label className={styles.formLabel}>Grounds for Rejection:
                    <textarea
                      className={styles.formTextarea}
                      value={groundsRejection}
                      onChange={(e) => setGroundsRejection(e.target.value)}
                    />
                  </label>
                )}
                <label className={styles.formLabel}>Court where the application was decided:
                  <input
                    type="text"
                    className={styles.formInput}
                    value={courtName}
                    onChange={(e) => setCourtName(e.target.value)}
                  />
                </label>
              </>
            )}
          </div>

          <div className={styles.section}>
            <h2>Step 3: Criminal History</h2>
            <label className={styles.formLabel}>Any other previous case?:
              <select className={styles.formSelect} value={otherCase} onChange={(e) => setOtherCase(e.target.value)} required>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            {otherCase === 'Yes' && (
              <>
                <label className={styles.formLabel}>Prev Acts of Offence:
                  <Select
                    isMulti
                    options={options}
                    value={prevsectionsOffense}
                    onChange={setPrevSectionsOffense}
                    className={styles.formSelect}
                  />
                </label>
                <label className={styles.formLabel}>Sections of Offence:
                  <input
                    type="text"
                    className={styles.formInput}
                    value={sections}
                    onChange={(e) => setSections(e.target.value)}
                  />
                </label>
              </>
            )}
          </div>

          <div className={styles.section}>
            <h2>Step 4: Health Information</h2>
            <label className={styles.formLabel}>Any medical condition?:
              <select className={styles.formSelect} value={medicalCondition} onChange={(e) => setMedicalCondition(e.target.value)} required>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            {medicalCondition === 'Yes' && (
              <label className={styles.formLabel}>Details of medical condition:
                <textarea
                  className={styles.formTextarea}
                  value={medicalCondition1}
                  onChange={(e) => setMedicalCondition1(e.target.value)}
                />
              </label>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>

      {output && (
        <div className={`${styles.outputContainer} ${output ? styles.visible : ''}`}>
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      )}
    </div>
  );
};

export default FormPage;
