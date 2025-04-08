// src/Training.jsx
import React, { useState } from 'react';
import Recorder from './Recorder';

const sentences = [
  {
    text: "He beat the sheep near the ship.",
    audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0001.wav"
  },
  {
    text: "The thin thief thanked them.",
    audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0002.wav"
  },
  {
    text: "Roses are red, lilies are lovely.",
    audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0003.wav"
  },
  {
    text: "Wine is very different from vine.",
    audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0004.wav"
  },
  {
    text: "She watched the world burn.",
    audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0005.wav"
  }
];

export default function Training() {
  const [current, setCurrent] = useState(0);
  const [recordCount, setRecordCount] = useState(0);
  const [scores, setScores] = useState([]);

  const currentSentence = sentences[current];

  const handleScore = (score) => {
    setScores((prev) => [...prev, score]);
    setRecordCount((prev) => prev + 1);
  };

  const handleNext = () => {
    setRecordCount(0);
    setScores([]);
    setCurrent((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Training</h2>
      <p className="mb-2">Sentence {current + 1} of {sentences.length}</p>
      <p className="mb-4 font-medium">{currentSentence.text}</p>

      <Recorder
        key={`${current}-${recordCount}`} // 保证刷新
        targetSentence={currentSentence.text}
        audioUrl={currentSentence.audioUrl}
        taskId={`training-${current + 1}-${recordCount + 1}`}
        onScore={handleScore}
        allowReplay={true}
      />

      <div className="mt-4">
        {scores.map((s, i) => (
          <div key={i} className="border p-2 mb-2 rounded bg-gray-50">
            <strong>Recording {i + 1}:</strong> Score {s?.score ?? "N/A"} / Pronunciation {s?.pronunciation ?? "-"}
          </div>
        ))}
      </div>

      {recordCount >= 3 && current < sentences.length - 1 && (
        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next Sentence
        </button>
      )}

      {current === sentences.length - 1 && recordCount >= 3 && (
        <p className="mt-4 text-green-600 font-semibold">✅ All training complete!</p>
      )}
    </div>
  );
}
