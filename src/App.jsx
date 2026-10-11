import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import StatsCards from './components/StatsCards';
import FiltersBar from './components/FiltersBar';
import KanbanBoard from './components/KanbanBoard';
import ListView from './components/ListView';
import CalendarView from './components/CalendarView';
import HabitTracker from './components/HabitTracker';
import AdminDashboard from './components/AdminDashboard';
import TaskModal from './components/TaskModal';
import ProjectModal from './components/ProjectModal';
import TeamModal from './components/TeamModal';
import AuthModal from './components/AuthModal';
import ToastContainer from './components/Toast';
import { Bell, Check, Sparkles, X, AlertCircle } from 'lucide-react';

export default function App() {
  const {
    currentView,
    currentUser,
    workspaceTab,
    notifications,
    markNotificationAsRead,
    addToast,
  } = useApp();

  const [pushNotifDismissed, setPushNotifDismissed] = useState(false);

  // Time-based greeting in Indonesian
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const unreadBroadcast = notifications.find((n) => !n.read && n.type === 'broadcast');

  const handleEnablePush = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('🎉 Notifikasi Our Plan Aktif!', {
            body: 'Pengingat deadline konten akan muncul secara otomatis di desktop.',
            icon: '/images/logo-1.png',
          });
          addToast('Notifikasi desktop browser berhasil diaktifkan!');
        } else {
          addToast('Izin notifikasi tidak diberikan atau diblokir browser', 'info');
        }
      });
    } else {
      addToast('Notifikasi diaktifkan!', 'info');
    }
    setPushNotifDismissed(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body */}
      {currentView === 'landing' ? (
        <main className="flex-1">
          <LandingPage />
        </main>
      ) : currentView === 'admin' ? (
        <main className="flex-1">
          <AdminDashboard />
        </main>
      ) : (
        /* Creator Workspace / Dashboard */
        <main className="flex-1 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Push Notification Banner simulation (from original Blade) */}
            {!pushNotifDismissed && (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl shrink-0">
                    🔔
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm">
                      Aktifkan Notifikasi Desktop & Background
                    </h4>
                    <p className="text-[11px] sm:text-xs text-blue-100 mt-0.5">
                      Dapatkan pengingat deadline konten dan penugasan anggota tim langsung di layar
                      perangkat Anda.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleEnablePush}
                    className="bg-white hover:bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Aktifkan Sekarang</span>
                    <span>⚡</span>
                  </button>
                  <button
                    onClick={() => setPushNotifDismissed(true)}
                    className="text-blue-200 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Unread Broadcast Announcement from Admin */}
            {unreadBroadcast && (
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-[1px] rounded-3xl shadow-sm animate-fade-in">
                <div className="bg-white rounded-[23px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 font-bold text-lg">
                      📢
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider">
                          Pengumuman Admin
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {unreadBroadcast.time}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 mt-1">
                        {unreadBroadcast.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {unreadBroadcast.message}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => markNotificationAsRead(unreadBroadcast.id)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Tandai Dibaca</span>
                  </button>
                </div>
              </div>
            )}

            {/* Welcome Banner & Daily Habit Tracker */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Welcome Card */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xs border border-slate-100 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-4">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-[11px] font-black tracking-wider uppercase">
                      Minggu, 11 Oktober 2026
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-slate-800 leading-tight">
                    {getGreeting()},{' '}
                    <span className="text-blue-600">{currentUser.name}</span>
                  </h2>

                  <p className="text-slate-500 mt-2 font-medium max-w-lg text-xs sm:text-sm leading-relaxed">
                    Ayo wujudkan ide kontenmu hari ini. Rencanakan dengan rapi, eksekusi dengan
                    fokus, dan bangun konsistensi berkarya! 🚀
                  </p>
                </div>
              </div>

              {/* Habit Tracker */}
              <HabitTracker />
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Filters Bar & Actions */}
            <FiltersBar />

            {/* Workspace View (Kanban / List / Calendar) */}
            <div className="pt-2">
              {workspaceTab === 'kanban' && <KanbanBoard />}
              {workspaceTab === 'list' && <ListView />}
              {workspaceTab === 'calendar' && <CalendarView />}
            </div>
          </div>
        </main>
      )}

      {/* Global Modals */}
      <TaskModal />
      <ProjectModal />
      <TeamModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}
