import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Check, Trash2 } from 'lucide-react';

export default function TaskModal() {
  const {
    taskModalState,
    setTaskModalState,
    saveTask,
    deleteTask,
    members,
    activeProjectId,
  } = useApp();

  const { isOpen, task, defaultStatus, defaultDeadline } = taskModalState;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Idea');
  const [deadline, setDeadline] = useState('');
  const [assigneeIds, setAssigneeIds] = useState([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPlatform(task.platform_distribution || 'YouTube');
      setPriority(task.priority || 'Medium');
      setStatus(task.status || 'Idea');
      setDeadline(task.deadline ? task.deadline.substring(0, 10) : '');
      setAssigneeIds(task.assignee_ids || []);
    } else {
      setTitle('');
      setDescription('');
      setPlatform('YouTube');
      setPriority('Medium');
      setStatus(defaultStatus || 'Idea');
      setDeadline(defaultDeadline || '');
      setAssigneeIds([]);
    }
  }, [task, defaultStatus, defaultDeadline, isOpen]);

  if (!isOpen) return null;

  const toggleAssignee = (memberId) => {
    setAssigneeIds((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    saveTask({
      id: task ? task.id : null,
      title: title.trim(),
      description: description.trim(),
      platform_distribution: platform,
      priority,
      status,
      deadline,
      assignee_ids: assigneeIds,
      projectId: task ? task.projectId : activeProjectId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-lg text-slate-800">
              {task ? 'Edit Tugas Konten' : 'Buat Tugas / Ide Baru'}
            </h3>
            <p className="text-xs text-slate-400">
              {task
                ? 'Perbarui detail rencana konten'
                : 'Catat ide atau jadwalkan produksi konten'}
            </p>
          </div>
          <button
            onClick={() => setTaskModalState({ isOpen: false, task: null })}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Judul Konten <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Review Kamera Sony A7IV untuk Vlogging"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Platform & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter / X</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Blog">Blog / Website</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="High">Tinggi (High 🔥)</option>
                <option value="Medium">Sedang (Medium)</option>
                <option value="Low">Rendah (Low)</option>
              </select>
            </div>
          </div>

          {/* Status & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Status Kanban</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Idea">💡 Idea</option>
                <option value="In Progress">✍️ In Progress</option>
                <option value="In Review">🎬 In Review</option>
                <option value="Published">🚀 Published</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Batas Waktu (Deadline)</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Assignees (Team Members) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Penugasan Anggota Tim
            </label>
            <div className="grid grid-cols-2 gap-2">
              {members.map((member) => {
                const isSelected = assigneeIds.includes(member.id);
                return (
                  <div
                    key={member.id}
                    onClick={() => toggleAssignee(member.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-400'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div
                        className={`w-6 h-6 rounded-full ${
                          member.color || 'bg-blue-600'
                        } text-white text-[9px] font-black flex items-center justify-center shrink-0`}
                      >
                        {member.avatar}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {member.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{member.role}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Catatan / Outline Naskah
            </label>
            <textarea
              rows={3}
              placeholder="Tuliskan hook pembuka, poin-poin naskah, link referensi riset..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {task ? (
              <button
                type="button"
                onClick={() => {
                  deleteTask(task.id);
                  setTaskModalState({ isOpen: false, task: null });
                }}
                className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTaskModalState({ isOpen: false, task: null })}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30"
              >
                {task ? 'Simpan Perubahan' : 'Buat Tugas'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
