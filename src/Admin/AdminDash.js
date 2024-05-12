import React, { useState, useEffect } from 'react';
import './AdminDash.css'; // Import your CSS file for styling
import TaskSec from './TaskSec';
import UserSec from './UserSec';

function AdminDash() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(timer);
  }, []); // Run only on component mount and unmount

  const handleSidebarItemClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="admin_dashboard">
      <div className="admin_sidebar">
        {/* Sidebar content goes here */}
        <ul>
          <li onClick={() => handleSidebarItemClick("Dashboard")} className={activeSection === "Dashboard" ? "active" : ""}>Dashboard</li>
          <li onClick={() => handleSidebarItemClick("Users")} className={activeSection === "Users" ? "active" : ""}>Users</li>
          <li onClick={() => handleSidebarItemClick("Tasks")} className={activeSection === "Tasks" ? "active" : ""}>Tasks</li>
          <li onClick={() => handleSidebarItemClick("Leave Requests")} className={activeSection === "Leave Requests" ? "active" : ""}>Leave Requests</li>
          <li onClick={() => handleSidebarItemClick("Calendar")} className={activeSection === "Calendar" ? "active" : ""}>Calendar</li>
        </ul>
      </div>
      <div className="admin_content">
        {activeSection === "Dashboard" && (
          <div>
            <div className="admin_header">
              <h2>Welcome Admin !!!</h2>
              <p>{currentTime.toLocaleString()}</p> {/* Display current date and time only in dashboard */}
            </div>
          </div>
        )}
        {activeSection === "Users" && (
          <UserSec />
        )}
        {activeSection === "Tasks" && (
          <TaskSec />
        )}
        {activeSection === "Leave Requests" && (
          <div>
            <h2>Leave Requests Section</h2>
            <p>No leave requests</p>
          </div>
        )}
        {activeSection === "Calendar" && (
          <div>
            <h2>Calendar Section</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDash;
