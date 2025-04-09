// src/ProgressContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({});
  const userId = localStorage.getItem('userId');

  // 从后端加载进度
  useEffect(() => {
    if (userId) {
      fetch('https://echotrain.azurewebsites.net/api/progress/load?id=' + userId)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProgress(data);
          } else {
            setProgress({ pretest: {}, training: {}, posttest: {} });
          }
        })
        .catch((err) => {
          console.error("Failed to load progress:", err);
        });
    }
  }, [userId]);

  // 保存进度到后端
  const saveProgress = async (newProgress) => {
    if (!userId) return;

    try {
      await fetch('https://echotrain.azurewebsites.net/api/progress/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          progress: newProgress
        })
      });

      setProgress(newProgress);
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, setProgress, saveProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

// 其他组件中通过 useProgress() 使用
export const useProgress = () => useContext(ProgressContext);

