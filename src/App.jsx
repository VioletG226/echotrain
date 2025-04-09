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
import TestPage from './TestPage';


// 可选：通用 Not Found 页面
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl text-center">
    404 - Page Not Found
  </div>
);

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-gray-50" style={{background: "linear-gradient(to bottom, #f9fafb, #f3f4f6)"}}>
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pretest" element={<PreTest />} />
              <Route path="/training" element={<Training />} />
              <Route path="/posttest" element={<PostTest />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;


