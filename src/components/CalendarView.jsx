import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalIcon } from 'lucide-react';

export default function CalendarView() {
  const { activeTasks, setTaskModalState } = useApp();

  // Current view month (default: Oct 2026 based on project context)
  const [currentDate, setCurrentDate] = useState(new Date('2026-10-11'));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed (9 = Oct)

  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Shift Sunday (0) to end of array so week starts on Monday
  const adjustedFirstDay = (firstDayIndex + 6) % 7;

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const dayCells = [];
  // Empty padding cells before 1st of month
  for (let i = 0; i < adjustedFirstDay; i++) {
    dayCells.push({ dayNumber: null, isCurrentMonth: false });
  }
  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    dayCells.push({ dayNumber: d, isCurrentMonth: true });
  }

  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <CalIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-800">
              {monthNames[month]} {year}
            </h3>
            <p className="text-xs text-slate-400">Kalender Penjadwalan Konten</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date('2026-10-11'))}
            className="text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Hari Ini
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Names */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[11px] font-black uppercase text-slate-400">
        <div>Senin</div>
        <div>Selasa</div>
        <div>Rabu</div>
        <div>Kamis</div>
        <div>Jumat</div>
        <div>Sabtu</div>
        <div>Minggu</div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {dayCells.map((cell, idx) => {
          if (!cell.isCurrentMonth) {
            return (
              <div
                key={`empty-${idx}`}
                className="min-h-[105px] bg-slate-50/40 rounded-2xl border border-transparent"
              ></div>
            );
          }

          const dateStr = `${year}-${formatNumber(month + 1)}-${formatNumber(cell.dayNumber)}`;
          const dayTasks = activeTasks.filter(
            (t) => t.deadline && t.deadline.substring(0, 10) === dateStr
          );

          const isToday =
            year === 2026 && month === 9 && cell.dayNumber === 11; // Oct 11, 2026

          return (
            <div
              key={`day-${cell.dayNumber}`}
              onClick={() => {
                setTaskModalState({
                  isOpen: true,
                  task: null,
                  defaultStatus: 'Idea',
                  defaultDeadline: dateStr,
                });
              }}
              className={`min-h-[105px] p-2 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer group ${
                isToday
                  ? 'bg-blue-50/40 border-blue-300 ring-2 ring-blue-100'
                  : 'bg-white border-slate-200/70 hover:border-blue-300 hover:bg-slate-50/40'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`text-xs font-black w-6 h-6 rounded-full flex items-center justify-center ${
                    isToday
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 group-hover:text-blue-600'
                  }`}
                >
                  {cell.dayNumber}
                </span>

                <Plus className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Day Tasks */}
              <div className="space-y-1 flex-1 overflow-y-auto no-scrollbar">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskModalState({ isOpen: true, task });
                    }}
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg truncate border shadow-2xs transition-transform hover:scale-102 ${
                      task.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : task.platform_distribution === 'YouTube'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : task.platform_distribution === 'TikTok'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
