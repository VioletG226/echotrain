// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import PreTest from './PreTest';
import Training from './Training';
import PostTest from './PostTest';
import Admin from './Admin';
import { ProgressProvider } from './ProgressContext';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pretest" element={<PreTest />} />
          <Route path="/training" element={<Training />} />
          <Route path="/posttest" element={<PostTest />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </ProgressProvider>
  );
}

export default App;
