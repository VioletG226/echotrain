// src/getTodayTask.js
export function getTodayTask() {
    const today = new Date();
    const dayOfMonth = today.getDate();
  
    const weekNumber = Math.floor((dayOfMonth - 1) / 7); // 第几周（0-based）
    const weekKey = `week${weekNumber + 1}`;
  
    // 计算本周第几个任务（最多 day1~day3）
    const dayInWeek = ((dayOfMonth - 1) % 7) + 1;
    const taskIndex = Math.min(Math.ceil(dayInWeek / 2), 3); // 每两天约一个任务
    const dayKey = `day${taskIndex}`;
  
    return { weekKey, dayKey };
  }
  