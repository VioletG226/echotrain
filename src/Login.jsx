// src/Login.jsx
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
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">EchoTrain 登录</h1>
      <input
        type="text"
        placeholder="请输入学员 ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border rounded p-2 mb-4 w-64"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        进入平台
      </button>
    </div>
  );
}

export default Login;
