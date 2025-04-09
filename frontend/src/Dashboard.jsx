// src/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCalendar from './TaskCalendar';
import TrainingProgressBar from './TrainingProgressBar';
import { useProgress } from './ProgressContext';

function Dashboard() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const userId = localStorage.getItem('userId') || 'Guest';

  const CardButton = ({ text, icon, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-6 py-5 rounded-xl transition-all duration-300 text-lg font-semibold flex items-center gap-4 ${
        disabled
          ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
          : 'bg-white hover:shadow-lg hover:scale-[1.02] border border-gray-100 text-gray-800'
      }`}
      style={{transition: "all 0.3s ease"}}
    >
      <span className="text-2xl">{icon}</span>
      {text}
    </button>
  );

  return (
    <div className="min-h-screen bg-background text-textPrimary px-6 py-10 w-full">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" 
              style={{backgroundImage: "linear-gradient(to right, #2563eb, #2468f2)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}>
            Welcome, <span className="text-primary">{userId}</span>
          </h1>
          <p className="text-gray-500">Select your current phase or check your weekly training plan</p>
        </div>

        <div className="w-full grid gap-4">
          <CardButton icon="🔎" text="Pre-Test" onClick={() => navigate('/pretest')} />
          <CardButton icon="🏋️" text="Training" onClick={() => navigate('/training')} />
          <CardButton icon="📊" text="Post-Test" onClick={() => navigate('/posttest')} />
        </div>

        <div className="w-full space-y-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm" 
               style={{backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)"}}>
            <h2 className="text-xl font-semibold mb-4 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                style={{backgroundImage: "linear-gradient(to right, #2563eb, #2468f2)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}>
              📈 Weekly Training Progress
            </h2>
            <div className="flex justify-center">
              <TrainingProgressBar progress={progress} />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm"
               style={{backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)"}}>
            <h2 className="text-xl font-semibold mb-4 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                style={{backgroundImage: "linear-gradient(to right, #2563eb, #2468f2)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}>
              📅 Weekly Task Calendar
            </h2>
            <div className="flex justify-center">
              <TaskCalendar progress={progress} currentPhase="training" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
