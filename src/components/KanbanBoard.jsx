import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Plus,
  Calendar,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const COLUMNS = [
  { id: 'Idea', title: '💡 Ideation', color: 'border-amber-400', badgeBg: 'bg-amber-50 text-amber-700' },
  { id: 'In Progress', title: '✍️ Scripting & Prod', color: 'border-blue-400', badgeBg: 'bg-blue-50 text-blue-700' },
  { id: 'In Review', title: '🎬 Editing & Review', color: 'border-purple-400', badgeBg: 'bg-purple-50 text-purple-700' },
  { id: 'Published', title: '🚀 Ready / Published', color: 'border-emerald-400', badgeBg: 'bg-emerald-50 text-emerald-700' },
];

export default function KanbanBoard() {
  const {
    activeTasks,
    updateTaskStatus,
    deleteTask,
    setTaskModalState,
    members,
  } = useApp();

  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [openActionTaskId, setOpenActionTaskId] = useState(null);

  // Drag handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', String(taskId));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    setDragOverColumn(null);
    const id = draggedTaskId || Number(e.dataTransfer.getData('text/plain'));
    if (id) {
      updateTaskStatus(Number(id), targetColumnId);
    }
    setDraggedTaskId(null);
  };

  // Helper for platform styling
  const getPlatformBadge = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'youtube':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'tiktok':
        return 'bg-slate-900 text-white border-slate-900';
      case 'instagram':
        return 'bg-pink-50 text-pink-600 border-pink-200';
      case 'twitter':
        return 'bg-sky-50 text-sky-600 border-sky-200';
      case 'linkedin':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Helper for priority styling
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const todayStr = new Date().toISOString().substring(0, 10);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {COLUMNS.map((col) => {
        const colTasks = activeTasks.filter((t) => t.status === col.id);
        const isDragOver = dragOverColumn === col.id;

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
            className={`flex flex-col bg-slate-100/70 rounded-3xl p-4 border transition-all duration-200 min-h-[500px] ${
              isDragOver
                ? 'border-blue-500 bg-blue-50/50 shadow-lg'
                : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xs text-slate-800 tracking-wide">
                  {col.title}
                </h3>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${col.badgeBg}`}
                >
                  {colTasks.length}
                </span>
              </div>
              <button
                onClick={() =>
                  setTaskModalState({ isOpen: true, task: null, defaultStatus: col.id })
                }
                className="p-1 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-white transition-colors"
                title={`Tambah tugas di kolom ${col.title}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Task Cards Container */}
            <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
              {colTasks.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                  <span>Tarik kartu ke sini</span>
                </div>
              ) : (
                colTasks.map((task) => {
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
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200/70 hover:border-blue-300 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative"
                    >
                      {/* Top badges: Platform & Priority */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-lg border ${getPlatformBadge(
                            task.platform_distribution
                          )}`}
                        >
                          {task.platform_distribution || 'General'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg border ${getPriorityBadge(
                              task.priority
                            )}`}
                          >
                            {task.priority || 'Medium'}
                          </span>

                          {/* Quick Options Button */}
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionTaskId(
                                  openActionTaskId === task.id ? null : task.id
                                );
                              }}
                              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>

                            {openActionTaskId === task.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-6 w-44 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-30 animate-fade-in text-xs font-bold"
                              >
                                <button
                                  onClick={() => {
                                    setTaskModalState({ isOpen: true, task });
                                    setOpenActionTaskId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700"
                                >
                                  <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                                  <span>Edit Tugas</span>
                                </button>

                                <div className="border-t border-slate-100 my-1 pt-1">
                                  <div className="px-2 py-1 text-[10px] text-slate-400 uppercase tracking-wider">
                                    Pindah Status
                                  </div>
                                  {COLUMNS.map((c) => (
                                    <button
                                      key={c.id}
                                      onClick={() => {
                                        updateTaskStatus(task.id, c.id);
                                        setOpenActionTaskId(null);
                                      }}
                                      className="w-full text-left px-2.5 py-1 text-[11px] rounded-lg hover:bg-slate-50 text-slate-600 flex items-center justify-between"
                                    >
                                      <span>{c.title}</span>
                                      {task.status === c.id && (
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                      )}
                                    </button>
                                  ))}
                                </div>

                                <div className="border-t border-slate-100 my-1 pt-1">
                                  <button
                                    onClick={() => {
                                      deleteTask(task.id);
                                      setOpenActionTaskId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Hapus</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Task Title */}
                      <h4
                        onClick={() => setTaskModalState({ isOpen: true, task })}
                        className="text-xs sm:text-sm font-bold text-slate-800 leading-snug hover:text-blue-600 cursor-pointer mb-1.5 line-clamp-2"
                      >
                        {task.title}
                      </h4>

                      {/* Description preview */}
                      {task.description && (
                        <p className="text-[11px] text-slate-500 mb-3 line-clamp-2 font-normal">
                          {task.description}
                        </p>
                      )}

                      {/* Bottom Footer: Assignees & Deadline */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        {/* Assignees */}
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {assignedMembers.length > 0 ? (
                            assignedMembers.map((member) => (
                              <div
                                key={member.id}
                                title={`${member.name} (${member.role})`}
                                className={`w-5 h-5 rounded-full ${member.color || 'bg-blue-600'} text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white`}
                              >
                                {member.avatar}
                              </div>
                            ))
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">Unassigned</span>
                          )}
                        </div>

                        {/* Deadline badge */}
                        {task.deadline && (
                          <div
                            className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              isOverdue
                                ? 'bg-rose-100 text-rose-700'
                                : isDueToday
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Calendar className="w-3 h-3" />
                            <span>
                              {isOverdue
                                ? 'Terlewat'
                                : isDueToday
                                ? 'Hari Ini'
                                : task.deadline.substring(5)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
