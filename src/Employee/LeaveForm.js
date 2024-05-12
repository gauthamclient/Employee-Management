import React, { useState } from 'react';
import './Empdash.css';

const LeaveContent = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Reason:', reason);
  };

  return (
    <div className="leave_form">
      <h3>Leave Request Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="start-date">Start Date:</label>
          <input 
            type="date" 
            id="start-date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="end-date">End Date:</label>
          <input 
            type="date" 
            id="end-date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="reason">Message:</label>
          <textarea 
            id="reason" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            rows="4" 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveContent;
