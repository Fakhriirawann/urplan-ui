import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Users, UserPlus, Trash2, Mail, ShieldCheck } from 'lucide-react';

export default function TeamModal() {
  const { isTeamModalOpen, setIsTeamModalOpen, members, setMembers, addToast } = useApp();

  const [name, setName] = useState('');
  const [role, setRole] = useState('Video Editor');
  const [email, setEmail] = useState('');

  if (!isTeamModalOpen) return null;

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials = name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const colors = ['bg-blue-600', 'bg-purple-600', 'bg-emerald-600', 'bg-pink-600', 'bg-amber-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newMember = {
      id: Date.now(),
      name: name.trim(),
      role,
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@urplan.app`,
      avatar: initials,
      color: randomColor,
    };

    setMembers([...members, newMember]);
    setName('');
    setEmail('');
    addToast(`${newMember.name} berhasil ditambahkan ke tim!`);
  };

  const handleRemoveMember = (id) => {
    if (members.length <= 1) {
      addToast('Minimal harus ada 1 anggota dalam tim!', 'error');
      return;
    }
    setMembers(members.filter((m) => m.id !== id));
    addToast('Anggota tim telah dihapus', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800">Kelola Tim & Anggota</h3>
              <p className="text-xs text-slate-400">Kolaborasi dalam pembuatan konten</p>
            </div>
          </div>
          <button
            onClick={() => setIsTeamModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Members List */}
        <div className="space-y-2.5 mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Anggota Aktif ({members.length})
          </div>
          <div className="space-y-2 max-h-52 overflow-y-auto no-scrollbar">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${
                      member.color || 'bg-blue-600'
                    } text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs`}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-800">{member.name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>{member.role}</span>
                      <span>•</span>
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg transition-colors"
                  title="Hapus dari Tim"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Invite / Add Member Form */}
        <div className="border-t border-slate-100 pt-4">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-blue-600" />
            <span>Undang Anggota Baru</span>
          </div>

          <form onSubmit={handleAddMember} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                required
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Video Editor">Video Editor</option>
                <option value="Scriptwriter">Scriptwriter</option>
                <option value="Thumbnail Designer">Thumbnail Designer</option>
                <option value="Content Strategist">Content Strategist</option>
                <option value="Voice Over / Host">Voice Over / Host</option>
              </select>
            </div>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Anggota (opsional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30 shrink-0"
              >
                + Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
