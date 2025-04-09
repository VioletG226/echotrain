// src/components/TrainingProgressBar.jsx
import React from 'react';

function TrainingProgressBar({ progress }) {
  // 获取当前周
  const today = new Date();
  const weekNum = Math.floor((today.getDate() - 1) / 7) + 1;
  const weekKey = `week${weekNum}`;

  const currentWeek = progress?.training?.[weekKey] || {};

  const completedCount = Object.values(currentWeek).filter((v) => v === true).length;

  const percentage = Math.round((completedCount / 3) * 100);

  return (
    <div className="w-full">
      <div className="bg-gray-100 rounded-full h-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-blue-600 h-6 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-primary">{completedCount}</span> of 3 tasks
        </p>
        <p className="text-sm font-medium bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          {percentage}% Complete
        </p>
      </div>
    </div>
  );
}

export default TrainingProgressBar;
