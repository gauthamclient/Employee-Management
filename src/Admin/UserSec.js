import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  Grid
} from '@mui/material';

function UserSec() {
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/employee');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleCloseModal = async () => {
    const userId = document.getElementById('userId').value;
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    const newUser = {
      emp_id: userId,
      emp_name: userName,
      mail: userEmail,
      password: userPassword
    };

    try {
      const response = await fetch('http://localhost:5000/add_employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        // If the user was successfully added to the database, fetch the updated list of employees
        fetchEmployees();
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }

    setOpenModal(false);
  };

  const handleAddUser = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <h2>Users Section</h2>
      {employees.length === 0 ? (
        <p>No users for now</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.emp_id}</TableCell>
                  <TableCell>{employee.emp_name}</TableCell>
                  <TableCell>{employee.mail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
     
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="userId"
                label="ID"
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="userName"
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="userEmail"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="userPassword"
                label="Password"
                type="password"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleCloseModal} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Button className='sec_btns' onClick={handleAddUser}>Add User</Button>
    </div>
  );
}

export default UserSec;
