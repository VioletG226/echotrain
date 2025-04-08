// src/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || 'Unknown';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome,{userId}</h1>
      <p className="mb-4">Please choose your current phase：</p>
      <div className="flex flex-col gap-4">
        <button onClick={() => navigate('/pretest')} className="btn">🔎 Pre-Test</button>
        <button onClick={() => navigate('/training')} className="btn">🏋️ Training</button>
        <button onClick={() => navigate('/posttest')} className="btn">📊 Post-Test</button>
        <button onClick={() => navigate('/admin')} className="btn">🛠 管理后台</button>
      </div>
    </div>
  );
}

export default Dashboard;
