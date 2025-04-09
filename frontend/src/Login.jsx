import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (id.trim()) {
      localStorage.setItem('userId', id.trim());
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-textPrimary px-4">
      <div className="w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <div className="card flex flex-col items-center bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Welcome to EchoTrain
          </h1>
          <p className="text-gray-500 mb-8 text-center">Start your pronunciation journey today</p>
          <div className="w-full max-w-sm space-y-4">
            <input
              type="text"
              placeholder="Enter your learner ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="input w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            <button 
              onClick={handleLogin} 
              className="btn w-full bg-gradient-to-r from-primary to-blue-600 text-white py-3 rounded-xl hover:opacity-90 transition-all duration-200 font-medium"
            >
              Enter EchoTrain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
