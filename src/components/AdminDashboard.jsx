import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Send,
  Users,
  Layers,
  CheckCircle,
  AlertTriangle,
  Search,
  Sparkles,
  ArrowLeft,
  X,
  Trash2,
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    setCurrentView,
    users,
    setUsers,
    projects,
    tasks,
    isMaintenance,
    setIsMaintenance,
    broadcastNotification,
    addToast,
  } = useApp();

  const [searchUser, setSearchUser] = useState('');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;
    broadcastNotification(broadcastTitle.trim(), broadcastMessage.trim());
    setBroadcastTitle('');
    setBroadcastMessage('');
    setIsBroadcastModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    if (users.length <= 1) {
      addToast('Tidak bisa menghapus user admin utama!', 'error');
      return;
    }
    setUsers(users.filter((u) => u.id !== userId));
    addToast('Pengguna telah dihapus dari sistem', 'info');
  };

  const filteredUsers = users.filter((u) => {
    if (!searchUser) return true;
    const q = searchUser.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="py-8 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top bar with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('app')}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Workspace Kreator</span>
          </button>

          <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
            Administrator
          </span>
        </div>

        {/* Hero Banner (Mirroring admin/dashboard.blade.php) */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 shadow-xl shadow-slate-900/10 border border-slate-800 flex flex-col justify-center relative overflow-hidden text-white">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-20"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm text-slate-300 px-4 py-1.5 rounded-full mb-6 border border-slate-700">
              {isMaintenance ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="text-[10px] font-black tracking-widest uppercase text-amber-300">
                    Maintenance Mode Aktif
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] font-black tracking-widest uppercase">
                    System Online • 2026
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Admin Command Center
                </h1>
                <p className="text-slate-400 text-sm mt-2 max-w-xl leading-relaxed">
                  Pantau performa platform, siarkan pengumuman server, dan kelola akun pengguna
                  UrPlan dalam satu panel kendali.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsBroadcastModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Siarkan Broadcast</span>
                </button>

                <button
                  onClick={() => {
                    setIsMaintenance(!isMaintenance);
                    addToast(
                      !isMaintenance
                        ? 'Mode Pemeliharaan (Maintenance) Diaktifkan'
                        : 'Sistem Kembali Online',
                      'info'
                    );
                  }}
                  className={`px-4 py-3 rounded-2xl font-bold text-xs border transition-all ${
                    isMaintenance
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  {isMaintenance ? 'Matikan Maintenance' : 'Mode Maintenance'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
              Total Pengguna
            </div>
            <div className="text-3xl font-black text-slate-800">{users.length}</div>
            <div className="text-xs text-slate-400 mt-1">Kreator terdaftar</div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
              Total Proyek
            </div>
            <div className="text-3xl font-black text-slate-800">{projects.length}</div>
            <div className="text-xs text-slate-400 mt-1">Ruang kerja aktif</div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
              Tugas & Konten
            </div>
            <div className="text-3xl font-black text-slate-800">{tasks.length}</div>
            <div className="text-xs text-slate-400 mt-1">Kartu Kanban dibuat</div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 mb-1">
              Status Server
            </div>
            <div className="text-3xl font-black text-emerald-600">99.9%</div>
            <div className="text-xs text-emerald-600 mt-1">Vercel Cloud Edge</div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-lg text-slate-800">Manajemen Pengguna</h3>
              <p className="text-xs text-slate-400">Daftar kreator terdaftar dalam database</p>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Pengguna</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Proyek</th>
                  <th className="py-3 px-4">Konten</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      <div>{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-bold text-[11px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">{u.projectsCount}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">{u.tasksCount}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Pengguna"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Broadcast Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  📢
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-800">Siarkan Pengumuman</h3>
                  <p className="text-xs text-slate-400">Kirim notifikasi banner ke semua kreator</p>
                </div>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Judul Pengumuman
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Maintenance Server Malam Ini pk 23.00"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Isi Pesan</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan pesan lengkap pengumuman..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
