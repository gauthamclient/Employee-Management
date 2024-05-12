import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TaskSec() {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));

    fetch('http://localhost:5000/employee')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddTask = () => {
    // Perform validation if needed
    const newTask = {
      task_name: taskName,
      due_date: dueDate,
      employee: selectedEmployee
    };
  
    // Send newTask to your backend to add it to the database
    fetch('http://localhost:5000/add_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      return response.json();
    })
    .then(data => {
      // Log the response data
      console.log('Added Task:', data);
      // Close the dialog after adding the task
      handleCloseDialog();
      // Optionally, update the state to reflect the newly added task
      setTasks([...tasks, data]);
    })
    .catch(error => {
      console.error('Error adding task:', error);
      // Handle error, show error message, etc.
      handleCloseDialog(); // Close the dialog in case of error
    });
  };
  

  return (
    <div>
      <h2>Tasks Section</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Employee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task._id}>
                <TableCell>{task.task_name}</TableCell>
                <TableCell>{new Date(task.due_date).toLocaleDateString()}</TableCell>
                <TableCell>{task.employee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button className='sec_btns' onClick={handleOpenDialog}>Add Tasks</Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the task.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="employee-select-label">Employee</InputLabel>
            <Select
              labelId="employee-select-label"
              id="employee-select"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              {employees.map(employee => (
                <MenuItem key={employee._id} value={employee.emp_name}>
                  {employee.emp_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TaskSec;
