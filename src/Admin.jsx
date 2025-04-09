import React, { useEffect, useState } from 'react';

function Admin() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('https://echotrain.azurewebsites.net/api/export/json')
      .then((res) => res.json())
      .then((data) => setRecords(data));
  }, []);

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans px-6 py-10 max-w-6xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-center">🛠️ Admin Panel</h1>

      <div className="mb-8 space-x-4 text-center">
        <a href="https://echotrain.azurewebsites.net/api/export/json" className="btn">Export JSON</a>
        <a href="https://echotrain.azurewebsites.net/api/export/csv" className="btn-light">Export CSV</a>
      </div>

      <div className="overflow-x-auto card text-center">
        <table className="table-auto w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-left">Accuracy</th>
              <th className="px-4 py-2 text-left">Audio</th>
              <th className="px-4 py-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} className="border-t border-gray-200 text-center">
                <td className="px-4 py-2">{r.id}</td>
                <td className="px-4 py-2">{r.taskId}</td>
                <td className="px-4 py-2">{r.accuracy}</td>
                <td className="px-4 py-2">
                  <audio src={r.audioUrl} controls className="w-full max-w-xs" />
                </td>
                <td className="px-4 py-2">{r.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
