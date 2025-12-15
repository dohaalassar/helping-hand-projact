import React, { useState, useMemo } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';

import './ChildReport.css'; // Ensure the CSS file is in the same folder

// ============ Data ============
const initialChildData = {
  name: "Layla Ahmad",
  age: 9,
  sdqParent: "Borderline",
  classification: "red", 
  interpretation: "Layla shows signs of mild anxiety, particularly indecision-making stages. While she completes tasks successfully, her hesitation and repetitive movements suggest a need for confidence-building exercises. She responded well to positive reinforcement cues within the games.",
  games: [
    {
      title: "Journey of Emotions",
      purpose: "Measure emotional symptoms (anxiety, sadness, fear)",
      duration: "5 minutes",
      scoreRange: "0–10 (Emotional Symptoms)",
      includeInTotal: true,
      weeks: [
        {
          weekNumber: 1,
          totalScore: 8,
          situations: [
            { situation: "Invited to a birthday party where they know no one (Anxiety).", choice: "Felt anxious", score: 2 },
            { situation: "Sitting alone while two friends play together (Sadness).", choice: "Sad", score: 1 },
            { situation: "Stomach ache before an important exam (Fear / Tension).", choice: "Nervous", score: 2 },
            { situation: "Losing a game twice to a friend (Frustration).", choice: "Upset", score: 1 },
            { situation: "Visiting a new place for the first time (Clingy / Anxious).", choice: "Wanted parent close", score: 2 }
          ]
        },
        {
          weekNumber: 2,
          totalScore: 7,
          situations: [
            { situation: "Invited to a birthday party where they know no one.", choice: "Went confidently", score: 1 },
            { situation: "Sitting alone while two friends play together (Sadness).", choice: "Sad", score: 1 },
            { situation: "Stomach ache before an important exam (Fear / Tension).", choice: "Nervous", score: 2 },
            { situation: "Losing a game twice to a friend (Frustration).", choice: "Upset", score: 1 },
            { situation: "Visiting a new place for the first time (Clingy / Anxious).", choice: "Wanted parent close", score: 2 }
          ]
        }
      ]
    },
    {
      title: "Hero's Mission",
      purpose: "Assess conduct and behavior problems",
      duration: "5 minutes",
      scoreRange: "0–10 (Conduct Problems)",
      includeInTotal: true,
      weeks: [
        {
          weekNumber: 1,
          totalScore: 10,
          situations: [
            { situation: "A friend breaks the child's favorite toy (Anger Management).", choice: "Shouted at the friend", score: 2 },
            { situation: "Child forgot homework and parent asks what happened (Honesty).", choice: "Lied about it", score: 2 },
            { situation: "Found a wallet in the playground (Stealing Temptation).", choice: "Kept the wallet", score: 2 },
            { situation: "A younger child makes a mistake in a shared game (Aggression).", choice: "Pushed the child", score: 2 },
            { situation: "Found money in the teacher's bag when she wasn't looking (Honesty Test 2).", choice: "Took the money", score: 2 }
          ]
        },
        {
          weekNumber: 2,
          totalScore: 0,
          situations: [
            { situation: "A friend breaks the child's favorite toy.", choice: "Told the teacher calmly", score: 0 },
            { situation: "Forgot homework again and parent asks why.", choice: "Told the truth", score: 0 },
            { situation: "Found a wallet on the ground.", choice: "Returned it", score: 0 },
            { situation: "A younger child makes a mistake in a game.", choice: "Helped the child", score: 0 },
            { situation: "Found money in the teacher's bag.", choice: "Left it untouched", score: 0 }
          ]
        }
      ]
    },
    {
      title: "Focus Race",
      purpose: "Measure hyperactivity and inattention",
      duration: "6 minutes",
      scoreRange: "0–10 (Hyperactivity / Inattention)",
      includeInTotal: true,
      weeks: [
        {
          weekNumber: 1,
          totalScore: 10,
          situations: [
            { situation: "Tap only the blue circles (Attention Control).", choice: "Tapped wrong colors", score: 2 },
            { situation: "Coloring without crossing the lines (Impulsivity).", choice: "Coloring outside", score: 2 },
            { situation: "Complete a 3-step task (Follow-through).", choice: "Finished only 1 step", score: 2 },
            { situation: "Keep finger inside moving circle (Restlessness).", choice: "Finger left the circle", score: 2 },
            { situation: "Choose the right moment to cross a moving bridge.", choice: "Crossed too early", score: 2 }
          ]
        },
        {
          weekNumber: 2,
          totalScore: 8,
          situations: [
            { situation: "Tap only blue circles.", choice: "Correct taps", score: 0 },
            { situation: "Coloring without crossing the lines (Impulsivity).", choice: "Coloring outside", score: 2 },
            { situation: "Complete a 3-step task (Follow-through).", choice: "Finished only 1 step", score: 2 },
            { situation: "Keep finger inside moving circle (Restlessness).", choice: "Finger left the circle", score: 2 },
            { situation: "Choose the right moment to cross a moving bridge.", choice: "Crossed too early", score: 2 }
          ]
        }
      ]
    },
    {
      title: "The Good Friend Game",
      purpose: "Assess peer relationship problems",
      duration: "5 minutes",
      scoreRange: "0–10 (Peer Problems)",
      includeInTotal: true,
      weeks: [
        {
          weekNumber: 1,
          totalScore: 10,
          situations: [
            { situation: "Other children are playing a game and the child is invited to join.", choice: "Refused to join", score: 2 },
            { situation: "A peer asks the child to share their toys.", choice: "Said no and kept toys", score: 2 },
            { situation: "A child in class wants to be their friend and sits beside them.", choice: "Moved away quietly", score: 2 },
            { situation: "Someone makes a small mistake during group activity.", choice: "Blamed the child strongly", score: 2 },
            { situation: "A peer gets praised by the teacher for doing well.", choice: "Became angry/jealous", score: 2 }
          ]
        },
        {
          weekNumber: 2,
          totalScore: 0,
          situations: [
            { situation: "Other kids invite the child to play.", choice: "Joined them", score: 0 },
            { situation: "A child asks to share toys.", choice: "Shared toys happily", score: 0 },
            { situation: "A classmate wants to sit next to them.", choice: "Stayed and talked", score: 0 },
            { situation: "Someone makes a mistake in group activity.", choice: "Helped them fix it", score: 0 },
            { situation: "A peer gets praised by the teacher.", choice: "Congratulated them", score: 0 }
          ]
        }
      ]
    },
    {
      title: "Positive Treasure Box",
      purpose: "Measure prosocial and positive social behavior",
      duration: "9 minutes",
      scoreRange: "0–10 (Prosocial Score)",
      includeInTotal: false,
      weeks: [
        {
          weekNumber: 1,
          totalScore: 10,
          situations: [
            { situation: "A classmate drops all their books on the floor.", choice: "Did not help", score: 2 },
            { situation: "Another child is sad after losing a game.", choice: "Ignored them", score: 2 },
            { situation: "Someone needs help reaching a high shelf.", choice: "Watched but did nothing", score: 2 },
            { situation: "A new student is sitting alone during break time.", choice: "Did not approach them", score: 2 },
            { situation: "A child asks politely for colored pencils.", choice: "Refused to share", score: 2 }
          ]
        },
        {
          weekNumber: 2,
          totalScore: 0,
          situations: [
            { situation: "A classmate drops books on the floor.", choice: "Helped pick them up", score: 0 },
            { situation: "Another child feels sad.", choice: "Comforted them", score: 0 },
            { situation: "Someone can’t reach a shelf.", choice: "Helped them reach it", score: 0 },
            { situation: "A new student sits alone.", choice: "Joined them and talked", score: 0 },
            { situation: "A child asks for pencils.", choice: "Shared pencils", score: 0 }
          ]
        }
      ]
    }
  ]
};

const ChildReportPage = () => {
  const { id } = useParams();
  console.log("Child ID:", id);
   const [data, setData] = useState(initialChildData);
  const [openGameIndex, setOpenGameIndex] = useState(null); // Accordion state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle Accordion logic
  const toggleGame = (index) => {
    if (openGameIndex === index) {
      setOpenGameIndex(null); // Close if already open
    } else {
      setOpenGameIndex(index); // Open new one
    }
  };

  // Close all cards (Overlay logic)
  const closeAll = () => {
    setOpenGameIndex(null);
  };

  // Calculate Total Score (Based on your logic: Only Week 2 totals)
  const calculatedTotalScore = useMemo(() => {
    let total = 0;
    data.games.forEach(game => {
      // Check if includeInTotal is meant to be logic, otherwise sum all week 2
      const week2 = game.weeks.find(week => week.weekNumber === 2);
      if (week2) {
        total += week2.totalScore;
      }
    });
    return total;
  }, [data]);

  // Determine Classification Class (Green/Yellow/Red)
  const getClassificationClass = (classification) => {
    switch (classification.toLowerCase()) {
      case 'green': return 'green-status';
      case 'yellow': return 'yellow-status';
      case 'red': return 'red-status';
      default: return 'yellow-status';
    }
  };

  // // Button Actions
  // const handleWarning = (e) => {
  //   e.preventDefault();
  //   alert('Warning message will be sent to the parent.');
  // };

  // const handleSchedule = (e) => {
  //   e.preventDefault();
  //   alert('Opening schedule meeting page...');
  // };

  const handleReview = (e) => {
    e.preventDefault();
  //   alert('Report review confirmed.');
  //     try {
  //   const response = await fetch('/api/export-report', { (async)
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data) // هنا ترسل كل بيانات التقرير
  //   });
  //   if (response.ok) {
  //     alert('Report exported successfully to database!');
  //   } else {
  //     alert('Failed to export report.');
  //   }
  // } catch (error) {
  //   console.error(error);
  //   alert('Error exporting report.');
  // }
  };
  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          <div className="logo">🤝 Helping Hand</div>
          <nav>
            <i 
              className="fas fa-bars toggle-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            ></i>
            <ul className={isMobileMenuOpen ? "open" : ""}>
              <li><NavLink to="/">Dashboard</NavLink></li>
              <li><NavLink to="/cases" className="active">All Cases</NavLink></li>
              <li><NavLink to="/settings">Settings</NavLink></li>
              <li><a href="#"><i className="fa-solid fa-right-from-bracket"></i> Log Out</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="landing">
          <div className="contact">
            <div className="report-container">
              
              {/* Left Section */}
              <div className="left-section">
                
                {/* Case Info */}
                <div className="card case-info">
                  <h3>Case Information</h3>
                  <div className="info-row">
                    <span className="label">Child Name:</span>
                    <span className="value">{data.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Age:</span>
                    <span className="value">{data.age}</span>
                  </div>
                  <div className="info-row">
                    <a className="label Parant" href="SDQparant.html">SDQ Parent:</a>
                    <span className="value">{data.sdqParent}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Total Score(0-40):</span>
                    {/* Display dynamically calculated score */}
                    <span className="value">{calculatedTotalScore}/50</span> 
                  </div>
                </div>

                {/* Classification */}
                <div className={`card Classification ${getClassificationClass(data.classification)}`}>
                  <h3>Overall Classification</h3>
                  <p className="status">{data.classification}</p>
                  <p>Child may require further observation and tailored support</p>
                </div>

                {/* Interpretation */}
                <div className="card Interpretation">
                  <h3>Interpretation</h3>
                  <p className="exp">{data.interpretation}</p>
                </div>
              </div>

              {/* Right Section (Games) */}
              <div className="right-section">
                
                {data.games.map((game, index) => (
                  <div 
                    key={index} 
                    className={`card game-card ${openGameIndex === index ? 'open' : ''}`}
                  >
                    <div className="game-header" onClick={() => toggleGame(index)}>
                      <div className="game-meta">
                        <h4 className="game-title">{game.title}</h4>
                        <p className="game-purpose">Purpose: {game.purpose}</p>
                        <div className="game-meta-row">
                          <div className="meta-item">
                            <span className="meta-label">Duration</span>
                            <span className="meta-value">{game.duration}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">Score Range</span>
                            <span className="meta-value">{game.scoreRange}</span>
                          </div>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>

                    <div className="game-details">
                      {game.weeks.map((week, wIndex) => (
                        <div key={wIndex} className="week-block">
                          <h4>Week {week.weekNumber}</h4>
                          
                          {week.situations.map((sit, sIndex) => (
                            <div key={sIndex} className="situation-row">
                              <div className="situation-left">
                                <h5>Situation {sIndex + 1}</h5>
                                <p>{sit.situation}</p>
                              </div>
                              <div className="situation-right">
                                <p><strong>Choice:</strong> {sit.choice}</p>
                                <p><strong>Score:</strong> {sit.score}</p>
                              </div>
                            </div>
                          ))}

                          <div className="game-divider"></div>
                          <p className="total-score">Week {week.weekNumber} Total Score: {week.totalScore} / 10</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="hero-buttons">
                  {/* <a href="#" onClick={handleWarning} className="btn btn-warning">Send Warning Message</a> <a href="#" onClick={handleSchedule} className="btn btn-schedule">Schedule Meeting / Follow Up</a> */}
                  <a href="/send-warning" className="btn btn-warning">Send Warning Message</a>
                  <a href="/schedule-meeting" className="btn btn-schedule">Schedule Meeting / Follow Up</a>
                  <a href="#" onClick={handleReview} className="btn btn-review">Report Review</a>
                </div>

              </div>
              {/* End Right Section */}

            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer>
          <p>&copy; 2025 Helping Hand. All rights reserved.</p>
        </footer>
      </div>

      {/* Overlay */}
      <div 
        className={`card-overlay ${openGameIndex !== null ? 'active' : ''}`} 
        onClick={closeAll}
      ></div>
    </div>
  );
};

export default ChildReportPage;