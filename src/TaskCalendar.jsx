// src/components/TaskCalendar.jsx
import React from 'react';

function TaskCalendar({ progress, currentPhase }) {
  const weeks = [1, 2, 3, 4];
  const days = ['Mon', 'Wed', 'Fri'];

  return (
    <div className="grid grid-cols-4 gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
      {weeks.map((week) => (
        <div key={week} className="flex flex-col items-center">
          <h4 className="text-sm font-semibold mb-3 text-gradient">Week {week}</h4>
          <div className="flex flex-col gap-2 w-full">
            {days.map((day) => {
              const completed = progress?.[currentPhase]?.[`week${week}`]?.[day];
              return (
                <div
                  key={day}
                  className={`text-xs px-3 py-1.5 rounded-full text-center transition-all duration-200 ${
                    completed ? 'tag-done' : 'tag-muted'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskCalendar;
