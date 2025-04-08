// src/PostTest.jsx
import React, { useState } from 'react';
import Recorder from './Recorder';
import ScorePanel from './ScorePanel';

const postSentences = [
  "He beat the sheep near the ship.",
  "The thin thief thanked them.",
  "Roses are red, lilies are lovely.",
  "Wine is very different from vine.",
  "She watched the world burn."
];

function PostTest() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(null);

  const handleNext = () => {
    setScore(null);
    if (current < postSentences.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Post-Test</h2>
      <p className="mb-2">{postSentences[current]}</p>
      <Recorder text={postSentences[current]} onScore={setScore} taskId={`posttest-${current + 1}`} />
      {score && <ScorePanel score={score} />}
      {current < postSentences.length - 1 && score && (
        <button onClick={handleNext} className="btn mt-4">Next</button>
      )}
    </div>
  );
}

export default PostTest;
