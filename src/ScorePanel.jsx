// src/ScorePanel.jsx
import React from 'react';

function ScorePanel({ score }) {
  return (
    <div className="bg-gray-100 p-4 mt-4 rounded">
      <h3 className="font-bold mb-2">Results：</h3>
      <ul className="text-sm space-y-1">
        <li>✅ Accuracy: {score.accuracy}</li>
        <li>🗣️ Fluency: {score.fluency}</li>
        <li>🔤 Pronunciation: {score.pronunciation}</li>
        <li>🧩 Completeness: {score.completeness}</li>
      </ul>
    </div>
  );
}

export default ScorePanel;
