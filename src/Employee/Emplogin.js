import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Employee/Emplogin.css';
import Logo from '../Assets/logo.png';

function Emplogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/employee');
      const data = await response.json();

      // Check if the entered username and password match any user in the database
      const user = data.find(user => user.emp_name === username && user.password === password);

      if (user) {
        // If the user exists, redirect to the employee dashboard with the username as a query parameter
        navigate(`/Employee-Dashboard?username=${encodeURIComponent(username)}`);
      } else {
        // If the user does not exist or credentials are incorrect, display an error message
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <div className="emp_login-page">
        <img className="logo" src={Logo} alt='logo' />
        <h2 className='employee_login_title'>Employee Login</h2>
        <div className="emp_form">
          <form className="emp_login-form" onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">login</button>
            <p className="emp_message">Visit Our <a href="https://gpsrenewables.com/" target='_blank' rel="noreferrer">Company Website</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Emplogin;
