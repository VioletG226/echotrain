import React, { useState } from 'react';
import Recorder from './Recorder';
import { useProgress } from './ProgressContext';
import { getTodayTask } from './getTodayTask';

const sentences = [
  { text: "He beat the sheep near the ship.", audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0001.wav" },
  { text: "The thin thief thanked them.", audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0002.wav" },
  { text: "Roses are red, lilies are lovely.", audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0003.wav" },
  { text: "Wine is very different from vine.", audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0004.wav" },
  { text: "She watched the world burn.", audioUrl: "https://nangan226.blob.core.windows.net/pretrainaudio/pre-test_audio-0005.wav" }
];

export default function Training() {
  const [current, setCurrent] = useState(0);
  const [recordCount, setRecordCount] = useState(0);
  const [scores, setScores] = useState([]);
  const { progress, saveProgress } = useProgress();
  const currentSentence = sentences[current];

  const handleScore = (score) => {
    console.log('Training 收到评分:', score);
    
    // 确保score有值
    if (!score) {
      console.error('收到空的评分对象');
      return;
    }
    
    // 添加到scores数组
    setScores((prev) => {
      const newScores = [...prev, score];
      console.log('更新后的评分列表:', newScores);
      return newScores;
    });
  
    // 每次录音计数 +1
    setRecordCount((prev) => {
      const next = prev + 1;
      console.log(`录音计数: ${prev} -> ${next}`);
  
      // 录完三次后才允许跳句
      if (next === 3) {
        console.log('已完成3次录音，准备更新进度并跳转');
        // 保存进度
        try {
          const { weekKey, dayKey } = getTodayTask();
          console.log('今日任务:', { weekKey, dayKey });
          
          const updated = {
            ...progress,
            training: {
              ...progress.training,
              [weekKey]: {
                ...progress.training?.[weekKey] || {},
                [dayKey]: true,
              },
            },
          };
          saveProgress(updated);
          console.log('进度已保存');
        } catch (err) {
          console.error('保存进度出错:', err);
        }
  
        // 自动跳转下一句
        console.log('准备在1秒后跳转到下一句');
        setTimeout(() => {
          if (current < sentences.length - 1) {
            console.log(`从句子 ${current + 1} 跳转到 ${current + 2}`);
            setCurrent((prev) => prev + 1);
            setScores([]);
            setRecordCount(0);
          } else {
            console.log('已到最后一句，不再跳转');
          }
        }, 1000);
      }
  
      return next;
    });
  };
  

  const handleNext = () => {
    setRecordCount(0);
    setScores([]);
    setCurrent((prev) => prev + 1);
  };

  return (
    <div className="w-full py-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
            style={{backgroundImage: "linear-gradient(to right, #2563eb, #2468f2)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"}}>
          🏋️ Training
        </h2>

        <div className="w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm"
             style={{backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)"}}>
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">Sentence {current + 1} of {sentences.length}</p>
            <p className="text-xl font-medium">{currentSentence.text}</p>
          </div>

          <div className="flex justify-center">
            <Recorder
              key={`${current}-${recordCount}`}
              targetSentence={currentSentence.text}
              audioUrl={currentSentence.audioUrl}
              taskId={`training-${current + 1}-${recordCount + 1}`}
              onScore={handleScore}
              allowReplay={true}
            />
          </div>
        </div>

        {/* ✅ 录音反馈 */}
        {scores.length > 0 && (
          <div className="w-full space-y-3">
            <h3 className="text-lg font-semibold text-center text-gray-700">Your Recordings</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {scores.map((s, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
                     style={{backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(4px)", transition: "all 0.3s ease"}}>
                  <div className="font-medium text-primary mb-1">Recording {i + 1}</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-gray-500">Accuracy</div>
                      <div className="font-semibold">{s?.accuracy ?? "-"}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-gray-500">Pronunciation</div>
                      <div className="font-semibold">{s?.pronunciation ?? "-"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ 控制是否允许下一句 */}
        <div className="w-full flex justify-center mt-2">
          {recordCount >= 3 && current < sentences.length - 1 && (
            <button 
              onClick={handleNext} 
              className="btn bg-gradient-to-r from-primary to-blue-600 text-white py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-200 font-medium"
              style={{backgroundImage: "linear-gradient(to right, #2563eb, #2468f2)", transition: "all 0.2s ease"}}
            >
              Next Sentence
            </button>
          )}

          {current === sentences.length - 1 && recordCount >= 3 && (
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-green-600 font-semibold flex items-center gap-2">
              <span className="text-xl">✅</span> All training complete!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
