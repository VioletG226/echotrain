// src/Admin.jsx
import React, { useEffect, useState } from 'react';

function Admin() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('/api/export/json')
      .then(res => res.json())
      .then(data => setRecords(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">管理员后台</h1>
      <div className="mb-4 space-x-4">
        <a href="/api/export/json" className="btn">导出 JSON</a>
        <a href="/api/export/csv" className="btn">导出 CSV</a>
      </div>
      <table className="table-auto w-full text-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>任务</th>
            <th>分数</th>
            <th>音频</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.id}</td>
              <td>{r.taskId}</td>
              <td>{r.accuracy}</td>
              <td>
                <audio src={r.audioUrl} controls />
              </td>
              <td>{r.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
