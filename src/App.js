import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Emplogin from './Employee/Emplogin';
import Empdash from './Employee/Empdash';
import AdminLogin from './Admin/AdminLogin';
import AdminDash from './Admin/AdminDash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Emplogin />} />
        <Route path='/Employee-Dashboard' element={<Empdash />} />
        <Route path='/Admin' element={<AdminLogin />} />
        <Route path='/Admin-Dashboard' element={<AdminDash />} />
      </Routes>
    </Router>
  );
}

export default App;
