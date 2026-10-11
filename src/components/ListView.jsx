import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function ListView() {
  const {
    activeTasks,
    updateTaskStatus,
    deleteTask,
    setTaskModalState,
    members,
  } = useApp();

  const todayStr = new Date().toISOString().substring(0, 10);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Idea':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Review':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Published':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 sm:px-6">Status & Judul Konten</th>
              <th className="py-3.5 px-4">Platform</th>
              <th className="py-3.5 px-4">Prioritas</th>
              <th className="py-3.5 px-4">Deadline</th>
              <th className="py-3.5 px-4">Penanggung Jawab</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {activeTasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-slate-400">
                  Tidak ada tugas yang cocok dengan filter saat ini.
                </td>
              </tr>
            ) : (
              activeTasks.map((task) => {
                const isOverdue =
                  task.deadline &&
                  task.deadline.substring(0, 10) < todayStr &&
                  task.status !== 'Published';
                const isDueToday =
                  task.deadline && task.deadline.substring(0, 10) === todayStr;

                const assignedMembers = members.filter((m) =>
                  task.assignee_ids?.includes(m.id)
                );

                return (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                    onClick={() => setTaskModalState({ isOpen: true, task })}
                  >
                    {/* Status & Title */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <select
                          value={task.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-xl border cursor-pointer focus:ring-2 focus:ring-blue-500 ${getStatusBadge(
                            task.status
                          )}`}
                        >
                          <option value="Idea">💡 Idea</option>
                          <option value="In Progress">✍️ In Progress</option>
                          <option value="In Review">🎬 In Review</option>
                          <option value="Published">🚀 Published</option>
                        </select>

                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-blue-600 transition-colors truncate">
                            {task.title}
                          </div>
                          {task.description && (
                            <div className="text-[11px] text-slate-400 font-normal truncate max-w-md">
                              {task.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Platform */}
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        {task.platform_distribution}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-extrabold text-[10px] px-2.5 py-1 rounded-lg ${
                          task.priority === 'High'
                            ? 'bg-rose-50 text-rose-600'
                            : task.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    {/* Deadline */}
                    <td className="py-3.5 px-4">
                      {task.deadline ? (
                        <div
                          className={`inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded-md ${
                            isOverdue
                              ? 'bg-rose-100 text-rose-700'
                              : isDueToday
                              ? 'bg-amber-100 text-amber-800'
                              : 'text-slate-600'
                          }`}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{task.deadline.substring(0, 10)}</span>
                        </div>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* Assignees */}
                    <td className="py-3.5 px-4">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {assignedMembers.length > 0 ? (
                          assignedMembers.map((m) => (
                            <div
                              key={m.id}
                              title={`${m.name} (${m.role})`}
                              className={`w-6 h-6 rounded-full ${m.color || 'bg-blue-600'} text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white`}
                            >
                              {m.avatar}
                            </div>
                          ))
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Unassigned</span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div
                        className="flex items-center justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setTaskModalState({ isOpen: true, task })}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Tugas"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus Tugas"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
