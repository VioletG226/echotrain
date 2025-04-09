// src/TestPage.jsx
import React, { useState } from 'react';
import Recorder from './Recorder';
import ScorePanel from './ScorePanel';

export default function TestPage() {
  const [score, setScore] = useState(null);

  return (
    <div className="min-h-screen px-6 py-10 text-center max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎧 Recorder Test Page</h1>

      <p className="mb-2">Sentence:</p>
      <p className="font-medium text-lg mb-4">He beat the sheep near the ship.</p>

      <Recorder
        targetSentence="He beat the sheep near the ship."
        audioUrl="https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0001.wav"
        taskId="test-001"
        onScore={setScore}
        allowReplay={true}
      />

      {score && <ScorePanel score={score} />}
    </div>
  );
}
