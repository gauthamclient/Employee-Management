import React, { useState } from 'react';
import './AdminLogin.css'; // Import your CSS file for styling
import Logo from '../Assets/logo.png'; // Import your logo image

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/admin');
      const admins = await response.json();
      const isAdmin = admins.some(admin => admin.username === username && admin.password === password);
      if (isAdmin) {
        // Redirect to Admin Dashboard if login is successful
        window.location.href = '/Admin-Dashboard';
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login. Please try again later.');
    }
  };

  return (
    <div>
      <div className="admin_login-page">
        <img className="logo" src={Logo} alt='logo' />
        <h2 className='admin_login_title'>Admin Login</h2>
        <div className="admin_form">
          <form className="admin_login-form" onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">Login</button>
            {error && <p className="admin_error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
