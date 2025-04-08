// src/Recorder.jsx
import React, { useState, useRef } from 'react';

function Recorder({ text, onScore, taskId }) {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
      setAudioBlob(blob);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];

        const res = await fetch('/api/assess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audio: base64Audio,
            text,
            id: localStorage.getItem('userId'),
            taskId
          })
        });

        const result = await res.json();
        onScore(result);
      };

      reader.readAsDataURL(blob);
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div className="my-4">
      {recording ? (
        <button onClick={stopRecording} className="btn bg-red-600">stop recording</button>
      ) : (
        <button onClick={startRecording} className="btn">start recording</button>
      )}
      {audioBlob && (
        <audio controls src={URL.createObjectURL(audioBlob)} className="mt-2" />
      )}
    </div>
  );
}

export default Recorder;
