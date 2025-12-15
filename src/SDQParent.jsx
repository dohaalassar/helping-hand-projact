import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './SDQParent.css'; // Link the CSS file

const SDQParent = () => {
    const { id } = useParams(); 
  // --- STATE ---
  
  // 1. Basic Info
  const [reportData] = useState({
    parentName: "Rania Ahmad",
    childName: "Lina Ahmad",
    childAge: 12,
    totalScore: 14,
    finalResult: "Borderline",
    finalResultArabic: "حدّي / يحتاج متابعة",
    note: "Score is between 14–16. Further monitoring is recommended."
  });

  // 2. Questions & Answers Data 
  // (In a real app, this array would come from your Backend API)
  const [questions] = useState([
    { id: 1, text: "Does your child often fidget or squirm in their seat?", answer: "Somewhat True", points: 1 },
    { id: 2, text: "Does your child have difficulty remaining seated?", answer: "Certainly True", points: 2 },
    { id: 3, text: "Is your child easily distracted by extraneous stimuli?", answer: "Certainly True", points: 2 },
    { id: 4, text: "Nervous or clingy in new situations, easily loses confidence?", answer: "Not True", points: 0 },
    { id: 5, text: "Many fears, easily scared?", answer: "Not True", points: 0 },
    { id: 6, text: "Often loses temper?", answer: "Certainly True", points: 2 },
    { id: 7, text: "Generally obedient, usually does what adults request?", answer: "Certainly True", points: 0 },
    { id: 8, text: "Often fights with other children or bullies them?", answer: "Certainly True", points: 2 },
    { id: 9, text: "Often lies or cheats?", answer: "Not True", points: 0 },
    { id: 10, text: "Steals from home, school, or elsewhere?", answer: "Not True", points: 0 },
    { id: 11, text: "Restless, overactive, cannot stay still for long?", answer: "Certainly True", points: 2 },
    { id: 12, text: "Constantly fidgeting or squirming?", answer: "Not True", points: 0 },
    { id: 13, text: "Easily distracted, concentration wanders?", answer: "Not True", points: 0 },
    { id: 14, text: "Thinks things out before acting?", answer: "Not True", points: 2 },
    { id: 15, text: "Sees tasks through to the end, good attention span?", answer: "Somewhat True", points: 1 },
    { id: 16, text: "Rather solitary, tends to play alone?", answer: "Not True", points: 0 },
    { id: 17, text: "Has at least one good friend?", answer: "Not True", points: 0 },
    { id: 18, text: "Generally liked by other children?", answer: "Not True", points: 0 },
    { id: 19, text: "Picked on or bullied by other children?", answer: "Not True", points: 0 },
    { id: 20, text: "Gets on better with adults than with other children?", answer: "Not True", points: 0 },
    { id: 21, text: "Considerate of other people's feelings?", answer: "Not True", points: 2 },
    { id: 22, text: "Shares readily with other children (treats, toys, pencils etc.)?", answer: "Not True", points: 0 },
    { id: 23, text: "Helpful if someone is hurt, upset, or ill?", answer: "Not True", points: 0 },
    { id: 24, text: "Kind to younger children?", answer: "Not True", points: 0 },
    { id: 25, text: "Often volunteers to help others (parents, teachers, other children)?", answer: "Not True", points: 2 },
  ]);

  return (
    <div className="container">
      
      {/* Back Button */}
      <div className="back-actions">
          <Link to="/cases" className="back-btn">
             <i className="fa-solid fa-arrow-left-long"></i> Back to All Cases
          </Link>
      </div>

      {/* Page Header */}
      <div className="page-header" style={{ marginTop: '20px' }}>
        <h1 className="assessment-title">Assessment Report</h1>
        <p className="assessment-subtitle">Detailed view of the assessment submitted by the parent.</p>
      </div>

      {/* Main Card */}
      <div className="assessment-card">
        
        {/* Top Info Section */}
        <div className="assessment-top">
          <div className="assessment-title">Assessment Report</div>
          <p className="assessment-subtitle">
            Detailed view of the assessment submitted by the parent.
          </p>

          <div className="meta-row">
            <div className="meta-item">
              <span className="meta-label">Parent's Name</span>
              <span className="meta-value">{reportData.parentName}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Child's Name</span>
              <span className="meta-value">{reportData.childName}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Child's Age</span>
              <span className="meta-value">{reportData.childAge}</span>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* Questions Block (Dynamically Rendered) */}
        <div className="questions-block">
          <div className="block-title">Assessment Questions & Answers</div>

          {questions.map((q) => (
            <div className="question-row" key={q.id}>
              <div className="question-text">
                {q.id}. {q.text}
              </div>
              <div className="question-answer">
                <span className="answer-label">{q.answer}</span>
                <span className="answer-score">({q.points} {q.points === 1 ? 'point' : 'points'})</span>
              </div>
            </div>
          ))}
          
        </div>

        <hr className="divider" />

        {/* Final Evaluation Block */}
        <div className="final-block">
          <div className="block-title">Final Evaluation</div>

          <div className="final-card">
            {/* Total Score */}
            <div className="final-score">
              <span className="final-label">Total Score</span>
              <div className="final-value">{reportData.totalScore} / 40</div>
            </div>

            {/* Result Badge */}
            <div className="final-result">
              <span className="final-label">Result</span>
              <div className="result-badge">
                <span className="result-icon">!</span>
                <span className="result-text">
                  {reportData.finalResult} <span className="result-sub">({reportData.finalResultArabic})</span>
                </span>
              </div>
            </div>
          </div>

          <p className="final-note">
            {reportData.note}
          </p>
        </div>

      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Helping Hand. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default SDQParent;