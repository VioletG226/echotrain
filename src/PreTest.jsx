// src/PreTest.jsx
import React, { useState } from 'react';
import Recorder from './Recorder';
import ScorePanel from './ScorePanel';

const sentences = [
  "He beat the sheep near the ship.",
  "The thin thief thanked them.",
  "Roses are red, lilies are lovely.",
  "Wine is very different from vine.",
  "She watched the world burn."
];

function PreTest() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(null);

  const handleNext = () => {
    setScore(null);
    if (current < sentences.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pre-Test</h2>
      <p className="mb-2">{sentences[current]}</p>
      <Recorder text={sentences[current]} onScore={(s) => setScore(s)} taskId={`pretest-${current + 1}`} />
      {score && <ScorePanel score={score} />}
      {current < sentences.length - 1 && score && (
        <button onClick={handleNext} className="btn mt-4">Next</button>
      )}
    </div>
  );
}

export default PreTest;
