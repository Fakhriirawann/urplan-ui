import React from 'react';
import { useApp } from '../context/AppContext';
import { Layers, Clock, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function StatsCards() {
  const { activeTasks } = useApp();

  const totalTasks = activeTasks.length;
  const inProgressTasks = activeTasks.filter(
    (t) => t.status === 'In Progress' || t.status === 'In Review'
  ).length;
  const publishedTasks = activeTasks.filter((t) => t.status === 'Published').length;

  const todayStr = new Date().toISOString().substring(0, 10);
  const urgentTasks = activeTasks.filter((t) => {
    if (!t.deadline || t.status === 'Published') return false;
    const taskDate = t.deadline.substring(0, 10);
    return taskDate <= todayStr;
  }).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Card 1: Total Konten */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
            Total Konten
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">{totalTasks}</div>
          <div className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-blue-500" />
            <span>Semua status</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Layers className="w-6 h-6" />
        </div>
      </div>

      {/* Card 2: Dalam Pengerjaan */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider text-amber-500 mb-1">
            Dalam Proses
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">{inProgressTasks}</div>
          <div className="text-[11px] font-semibold text-slate-400 mt-1">
            Scripting & editing
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Card 3: Siap Tayang */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 mb-1">
            Siap / Published
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">{publishedTasks}</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">
            {totalTasks > 0 ? `${Math.round((publishedTasks / totalTasks) * 100)}% selesai` : '0%'}
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>

      {/* Card 4: Urgent / Deadline */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider text-rose-500 mb-1">
            Perlu Perhatian
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">{urgentTasks}</div>
          <div className="text-[11px] font-semibold text-rose-500 mt-1">
            {urgentTasks > 0 ? 'Mendekati / Terlewat' : 'Semua terkendali'}
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
