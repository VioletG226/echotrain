// src/Training.jsx
import React, { useState } from 'react';
import Recorder from './Recorder';
import ScorePanel from './ScorePanel';

const trainingSentences = [
  "He likes coffee.",
  "Do you like coffee?",
  "I do like coffee."
];

function Training() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(null);

  const handleNext = () => {
    setScore(null);
    if (current < trainingSentences.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Training</h2>
      <p className="mb-2">{trainingSentences[current]}</p>
      <Recorder text={trainingSentences[current]} onScore={setScore} taskId={`training-${current + 1}`} />
      {score && <ScorePanel score={score} />}
      {current < trainingSentences.length - 1 && score && (
        <button onClick={handleNext} className="btn mt-4">Next</button>
      )}
    </div>
  );
}

export default Training;
