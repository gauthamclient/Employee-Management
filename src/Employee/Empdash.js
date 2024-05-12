import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './Empdash.css';

function Empdash() {
  const [employeeName, setEmployeeName] = useState('');
  const [activeTab, setActiveTab] = useState("Tasks"); // Define activeTab state
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    // Parse the username from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    setEmployeeName(username);

    // Fetch tasks for the corresponding employee
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => {
        // Filter tasks for the current employee
        const employeeTasks = data.filter(task => task.employee === username);
        setTasks(employeeTasks);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, [employeeName]);

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="emp_dashboard">
      <div className="emp_info">
        <h2>Welcome, {employeeName}!</h2>
        <p>Date: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="clockin_button">
        <button>Clock In</button>
      </div>
      <div className="emp_tabs">
        <button className={activeTab === "Tasks" ? "tab_button active" : "tab_button"} onClick={() => handleTabClick("Tasks")}>Tasks</button>
        <button className={activeTab === "Calendar" ? "tab_button active" : "tab_button"} onClick={() => handleTabClick("Calendar")}>Calendar</button>
        <button className={activeTab === "Leave" ? "tab_button active" : "tab_button"} onClick={() => handleTabClick("Leave")}>Leave</button>
      </div>
      <div className="tab_content">
        {activeTab === "Tasks" && <TasksContent tasks={tasks} />}
        {activeTab === "Calendar" && <CalendarContent />}
        {activeTab === "Leave" && <LeaveContent />}
      </div>
    </div>
  );
}

// Additional content components for each tab
const TasksContent = ({ tasks }) => {
  return (
    <div>
      <h3>Tasks</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task._id}>
                <TableCell>{task.task_name}</TableCell>
                <TableCell>{new Date(task.due_date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const CalendarContent = () => {
  return (
    <div>
      <h3>Calendar</h3>
      {/* Calendar content */}
      <p>No calendar data for now</p>
    </div>
  );
};

const LeaveContent = () => {
  return (
    <div>
      <h3>Leave</h3>
      {/* Leave content */}
      <p>No leave data for now</p>
    </div>
  );
};

export default Empdash;
