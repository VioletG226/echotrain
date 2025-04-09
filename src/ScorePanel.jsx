import React from 'react';

function ScorePanel({ score }) {
  if (!score) return null;

  const format = (val) => (val != null ? Number(val).toFixed(2) : 'N/A');

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm mt-6 w-full">
      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        🎯 Pronunciation Feedback
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50/80 p-4 rounded-xl">
          <div className="text-gray-500 text-sm">Accuracy</div>
          <div className="text-2xl font-bold text-primary">{format(score.accuracy)}</div>
        </div>
        <div className="bg-gray-50/80 p-4 rounded-xl">
          <div className="text-gray-500 text-sm">Fluency</div>
          <div className="text-2xl font-bold text-primary">{format(score.fluency)}</div>
        </div>
        <div className="bg-gray-50/80 p-4 rounded-xl">
          <div className="text-gray-500 text-sm">Pronunciation</div>
          <div className="text-2xl font-bold text-primary">{format(score.pronunciation)}</div>
        </div>
        <div className="bg-gray-50/80 p-4 rounded-xl">
          <div className="text-gray-500 text-sm">Completeness</div>
          <div className="text-2xl font-bold text-primary">{format(score.completeness)}</div>
        </div>
      </div>
    </div>
  );
}

export default ScorePanel;


