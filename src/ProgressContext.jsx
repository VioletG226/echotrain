// src/ProgressContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({});

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetch('/api/progress/load?id=' + userId)
        .then((res) => res.json())
        .then((data) => setProgress(data || {}));
    }
  }, [userId]);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
