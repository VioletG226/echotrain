import React, { useState } from 'react';
import Recorder from './Recorder';

const postSentences = [
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

export default function PostTest() {
  const [current, setCurrent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const currentSentence = postSentences[current];

  const handleScore = () => {
    setTimeout(() => {
      if (current < postSentences.length - 1) {
        setCurrent((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 1000);
  };

  return (
    <div className="w-full py-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          📊 Post-Test
        </h2>

        {!isComplete && (
          <div className="w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-1">Sentence {current + 1} of {postSentences.length}</p>
              <p className="text-xl font-medium">{currentSentence.text}</p>
            </div>

            <div className="flex justify-center">
              <Recorder
                targetSentence={currentSentence.text}
                audioUrl={currentSentence.audioUrl}
                taskId={`posttest-${current + 1}`}
                onScore={handleScore}
                allowReplay={true}
              />
            </div>
          </div>
        )}

        {isComplete && (
          <div className="w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Thank you for completing the Post-Test!
            </h3>
            <p className="text-gray-600">Your results are saved. Great job!</p>
          </div>
        )}
      </div>
    </div>
  );
}
