import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Check,
  ChevronDown,
  Download,
  FolderPlus,
  Layout,
  LogOut,
  Plus,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Users,
  ExternalLink,
} from 'lucide-react';

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    projects,
    activeProjectId,
    setActiveProjectId,
    activeProject,
    setIsProjectModalOpen,
    setEditingProject,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setIsTeamModalOpen,
    setIsAuthModalOpen,
    setAuthMode,
    currentUser,
    setCurrentUser,
    resetDemoData,
    exportTasksCSV,
    workspaceTab,
    setWorkspaceTab,
  } = useApp();

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notifRef = useRef(null);
  const projectRef = useRef(null);
  const userRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (projectRef.current && !projectRef.current.contains(e.target)) {
        setIsProjectDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Brand Logo & View Selector */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <img
                src="/images/logo-1.png"
                alt="Our Plan"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-[#1F7FD1] to-[#0B4FB3] text-transparent bg-clip-text">
                Our Plan
              </span>
            </button>

            {/* Navigation Tabs (if inside App) */}
            {currentView === 'app' && (
              <div className="hidden lg:flex items-center bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 text-xs font-bold">
                <button
                  onClick={() => setWorkspaceTab('kanban')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    workspaceTab === 'kanban'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Kanban Board
                </button>
                <button
                  onClick={() => setWorkspaceTab('list')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    workspaceTab === 'list'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Daftar List
                </button>
                <button
                  onClick={() => setWorkspaceTab('calendar')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    workspaceTab === 'calendar'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Kalender
                </button>
              </div>
            )}
          </div>

          {/* Center / Project Switcher (in app mode) */}
          {currentView === 'app' && (
            <div className="relative" ref={projectRef}>
              <button
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all border border-slate-200"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="max-w-[150px] sm:max-w-[200px] truncate">
                  {activeProject ? activeProject.name : 'Pilih Proyek'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isProjectDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Proyek Konten Anda
                  </div>
                  <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          setActiveProjectId(proj.id);
                          setIsProjectDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs font-bold transition-colors ${
                          proj.id === activeProjectId
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="truncate">{proj.name}</div>
                          <div className="text-[10px] font-medium text-slate-400 truncate">
                            {proj.platform}
                          </div>
                        </div>
                        {proj.id === activeProjectId && (
                          <Check className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setIsProjectModalOpen(true);
                        setIsProjectDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 py-2 rounded-xl transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Buat Proyek Baru</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right side navigation buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentView === 'landing' ? (
              <>
                <button
                  onClick={() => {
                    setCurrentView('app');
                  }}
                  className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-blue-600/25 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Buka Workspace</span>
                </button>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-2xl transition-colors"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 px-3 py-2 transition-colors"
                >
                  Log In
                </button>
              </>
            ) : currentView === 'admin' ? (
              <>
                <button
                  onClick={() => setCurrentView('app')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold text-xs transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span>Kembali ke Workspace</span>
                </button>
                <button
                  onClick={() => setCurrentView('landing')}
                  className="text-slate-600 hover:text-slate-900 font-bold text-xs px-3 py-2"
                >
                  Landing Page
                </button>
              </>
            ) : (
              /* Inside App View */
              <>
                {/* Team Modal Button */}
                <button
                  onClick={() => setIsTeamModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
                  title="Kelola Tim & Anggota"
                >
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Tim</span>
                </button>

                {/* Export CSV Button */}
                <button
                  onClick={exportTasksCSV}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
                  title="Ekspor daftar tugas ke file CSV"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden md:inline">Export</span>
                </button>

                {/* Notifications Bell */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="relative p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    title="Notifikasi"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {isNotifOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-fade-in">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-800">Notifikasi</span>
                          {unreadCount > 0 && (
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {unreadCount} Baru
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-[11px] font-bold text-blue-600 hover:underline"
                          >
                            Tandai semua dibaca
                          </button>
                        )}
                      </div>

                      <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
                        {notifications.length === 0 ? (
                          <div className="text-center py-6 text-xs text-slate-400">
                            Tidak ada notifikasi baru
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => markNotificationAsRead(notif.id)}
                              className={`p-3 rounded-xl transition-colors cursor-pointer border ${
                                notif.read
                                  ? 'bg-slate-50/60 border-slate-100 opacity-70'
                                  : 'bg-blue-50/50 border-blue-100 font-semibold'
                              }`}
                            >
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="text-xs font-bold text-slate-800">{notif.title}</h4>
                                <span className="text-[10px] text-slate-400 shrink-0 font-normal">
                                  {notif.time}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                {notif.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile & Demo Switcher */}
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {currentUser.avatar || 'FI'}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-fade-in">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <div className="text-xs font-bold text-slate-800">{currentUser.name}</div>
                        <div className="text-[11px] text-slate-400">{currentUser.email}</div>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setCurrentView('admin');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <ShieldAlert className="w-4 h-4 text-amber-500" />
                          <span>Panel Admin</span>
                        </button>
                        <button
                          onClick={() => {
                            setCurrentView('landing');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-500" />
                          <span>Lihat Landing Page</span>
                        </button>
                        <button
                          onClick={() => {
                            resetDemoData();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4 text-indigo-500" />
                          <span>Reset Data</span>
                        </button>
                      </div>
                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            setCurrentView('landing');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Keluar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
