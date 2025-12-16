import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './Schedule.css'; // Connects the CSS

const ScheduleSession = () => {
  const { id } = useParams();
const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    reason: '',
    date: '2025-11-28', // Default value from your HTML
    time: '10:30',      // Default value from your HTML
    notes: ''
  });

  const caseName = "Layla Ahmad"; // You can make this dynamic later

  // --- HANDLERS ---

  // 1. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 2. Handle Cancel / Close (Navigation)
  const handleClose = () => {
    // In React Router, you would use navigate('/cases')
    // For now, we use window.location as requested in your script
      navigate('/child/${id}');

  };

  // 3. Handle Submit
  const handleSubmit = () => {
    // Validation
    if (!formData.reason.trim()) {
      alert("Please select the session reason.");
      return;
    }
    if (!formData.date) {
      alert("Please select a valid date.");
      return;
    }
    if (!formData.time) {
      alert("Please select a valid time.");
      return;
    }

    // Prepare Data
    const scheduleData = {
      childName: caseName,
      ...formData
    };

    // Simulate Sending Data (Backend Connection)
    console.log("DATA TO SEND:", scheduleData);
    
    // Success Message
    alert("Request has been sent successfully to the parent!");
    
    // Optional: Redirect after success
    // handleClose(); 
  };

  return (
    <div className="page">
      <div className="modal-card">
        {/* Close Button X */}
        <button 
          className="close-btn" 
          aria-label="Close"
          onClick={handleClose}
        >
          &times;
        </button>

        {/* Header */}
        <div className="modal-header">
          <h1>Schedule Parent Follow-up</h1>
          <p>For case - {caseName}</p>
        </div>

        {/* --- FORM --- */}
        
        {/* Reason Select */}
        <div className="form-group">
          <label>Reason for Session</label>
          <div className="input-with-icon">
            <span className="icon"><i className="fas fa-flag"></i></span>
            <select 
              name="reason" 
              value={formData.reason} 
              onChange={handleChange}
            >
              <option value="" disabled>Select a reason...</option>
              <option value="Yellow Zone Classification">Yellow Zone Classification</option>
              <option value="Red Zone Classification">Red Zone Classification</option>
              <option value="Initial Assessment">Initial Assessment</option>
              <option value="Follow-up Session">Follow-up Session</option>
            </select>
          </div>
        </div>

        {/* Date & Time Row */}
        <div className="form-group">
          <label>Select a Date & Time</label>
          <div className="row">
            
            {/* Date Input */}
            <div className="col">
              <div className="input-with-icon">
                <span className="icon"></span>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Time Input */}
            <div className="col">
              <div className="input-with-icon">
                <span className="icon"></span>
                <input 
                  type="time" 
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Notes Textarea */}
        <div className="form-group">
          <label>Notes for Parent (Optional)</label>
          <textarea 
            rows="4" 
            name="notes"
            placeholder="e.g., Please ensure both parents are available for this session..."
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Footer Buttons */}
        <div className="modal-footer">
          <button className="btn-text" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            Send Request to Parent <i className="fas fa-envelope"></i>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ScheduleSession;