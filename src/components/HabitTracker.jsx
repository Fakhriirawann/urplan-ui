import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Flame, CheckCircle, Plus, Trash2, Sparkles, X } from 'lucide-react';

export default function HabitTracker() {
  const { habits, toggleHabit, deleteHabit, addHabit } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('✨');

  const iconsList = ['✨', '💡', '✍️', '🎬', '📊', '🏃‍♂️', '📚', '☕', '🎯', '🔥'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit(newHabitName.trim(), newHabitIcon);
    setNewHabitName('');
    setIsModalOpen(false);
  };

  const totalStreak = habits.reduce((acc, h) => acc + (h.streak || 0), 0);
  const completedCount = habits.filter((h) => h.completedToday).length;

  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-50 text-amber-600">
              <Flame className="w-4 h-4 fill-amber-500" />
            </span>
            <div>
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Daily Habit Tracker
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {completedCount} dari {habits.length} selesai hari ini
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Habit</span>
          </button>
        </div>

        {/* Habit items */}
        <div className="space-y-2.5 my-2 max-h-56 overflow-y-auto no-scrollbar">
          {habits.map((habit) => (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                habit.completedToday
                  ? 'bg-emerald-50/60 border-emerald-200/80'
                  : 'bg-slate-50/70 border-slate-200/60 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className="text-base shrink-0">{habit.icon || '✨'}</span>
                <span
                  className={`text-xs font-bold truncate ${
                    habit.completedToday
                      ? 'text-emerald-800 line-through opacity-70'
                      : 'text-slate-700'
                  }`}
                >
                  {habit.name}
                </span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div
                  className={`flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                    habit.completedToday
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <Flame className="w-3 h-3 fill-current" />
                  <span>{habit.streak}d</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHabit(habit.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-1"
                  title="Hapus Habit"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 text-[11px] font-medium text-slate-400 text-center flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Klik item untuk check-in habit harian & pertahankan streak!</span>
        </div>
      </div>

      {/* Add Habit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-base text-slate-800">Tambah Habit Baru</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Kebiasaan / Habit
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Baca Tren Algoritma 15 mnt"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Pilih Ikon</label>
                <div className="flex flex-wrap gap-2">
                  {iconsList.map((icon) => (
                    <button
                      type="button"
                      key={icon}
                      onClick={() => setNewHabitIcon(icon)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base border transition-all ${
                        newHabitIcon === icon
                          ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-100'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30"
                >
                  Simpan Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
