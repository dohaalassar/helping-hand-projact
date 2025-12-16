import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';


import './Warning.css'; // Link the CSS file

const SendGuidedMessage = () => {
  const { id } = useParams();
  // --- STATE ---
  
  const [title, setTitle] = useState("");
  
  // We initialize the body with the default template text found in your HTML
  const [body, setBody] = useState(`Dear Parent,
Based on our recent assessment for Layla, we've identified some areas where a little extra support at home could be very beneficial. We recommend focusing on [specific activity or behavior].
Please find attached resources and guidance to help you with this. Let's schedule a brief call to discuss this further.
Best regards,
Dr. Ahmed Al-Masri`);

  // --- HANDLERS ---

  const handleSend = () => {
    // 1. Validation
    if (!title.trim() || !body.trim()) {
        alert("Please fill in both the title and the message body.");
        return;
    }

    // 2. Prepare Payload
    const payload = {
        title: title,
        message: body,
        date: new Date().toISOString(),
        type: "guided_message"
    };

    // 3. Backend Call Simulation
    console.log("Prepared data to send:", payload);
    // In the future, you will put your fetch() code here

    // 4. Success Feedback
    alert("Notification sent successfully!");
  };

  return (
    <div className="page">
      <div className="card">
        
        {/* Header / Back Link */}
<Link className="back" to={`/child/${id}`}>
  <i className="fa-solid fa-arrow-left"></i>
  <p>Back to Child Report</p>
</Link>

        <div className="card-header">
          <div className="icon-circle">
            🔔
          </div>
          <div className="header-text">
            <h1>Send Guided Message</h1>
            <p>For cases in the Yellow Zone.</p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="form-group">
          <label htmlFor="title">Message Title</label>
          <input 
            id="title" 
            type="text" 
            placeholder="Guidance for Layla Ahmad"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Message Body</label>
          <textarea 
            id="body" 
            rows="13"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        {/* Action Button */}
        <div className="actions">
          <button type="button" onClick={handleSend}>
            Send Notification
          </button>
        </div>

      </div>
    </div>
  );
};

export default SendGuidedMessage;