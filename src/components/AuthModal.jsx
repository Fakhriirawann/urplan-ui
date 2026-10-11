import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Shield, User, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    setCurrentUser,
    setCurrentView,
    addToast,
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleQuickLogin = (role) => {
    if (role === 'creator') {
      setCurrentUser({
        id: 1,
        name: 'Fakhri Irawan',
        email: 'fakhri@urplan.app',
        role: 'creator',
        avatar: 'FI',
      });
      addToast('Berhasil masuk sebagai Fakhri Irawan (Creator Lead)!');
      setCurrentView('app');
    } else if (role === 'admin') {
      setCurrentUser({
        id: 99,
        name: 'Administrator',
        email: 'admin@urplan.app',
        role: 'admin',
        avatar: 'AD',
      });
      addToast('Berhasil masuk sebagai Administrator!');
      setCurrentView('admin');
    }
    setIsAuthModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = name.trim() || 'Kreator Baru';
    const userEmail = email.trim() || 'creator@urplan.app';
    const initials = userName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    setCurrentUser({
      id: Date.now(),
      name: userName,
      email: userEmail,
      role: 'creator',
      avatar: initials || 'KB',
    });

    addToast(
      authMode === 'login'
        ? `Selamat datang kembali, ${userName}!`
        : `Akun ${userName} berhasil didaftarkan!`
    );
    setIsAuthModalOpen(false);
    setCurrentView('app');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <img
            src="/images/logo-1.png"
            alt="Our Plan Logo"
            className="h-12 w-auto mx-auto mb-2 object-contain"
          />
          <h3 className="font-black text-xl text-slate-800">
            {authMode === 'login' ? 'Masuk ke UrPlan' : 'Daftar Akun Kreator'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {authMode === 'login'
              ? 'Kelola alur kerja dan ide kontenmu sekarang'
              : 'Gabung bersama ribuan kreator produktif lainnya'}
          </p>
        </div>

        {/* Quick Login Preset Buttons */}
        <div className="space-y-2 mb-6">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 text-center mb-2">
            Akses Cepat
          </div>
          <button
            onClick={() => handleQuickLogin('creator')}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 text-blue-700 transition-all text-xs font-bold"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Masuk sebagai Fakhri Irawan (Creator Lead)</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleQuickLogin('admin')}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 text-amber-800 transition-all text-xs font-bold"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>Masuk sebagai Administrator</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="shrink mx-4 text-[10px] uppercase font-bold text-slate-400">
            Atau gunakan form
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 mt-3">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Kamu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors shadow-md mt-2"
          >
            {authMode === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}
          </button>
        </form>

        {/* Switch tab */}
        <div className="text-center mt-5 text-xs text-slate-500">
          {authMode === 'login' ? (
            <>
              Belum punya akun?{' '}
              <button
                onClick={() => setAuthMode('register')}
                className="text-blue-600 font-bold hover:underline"
              >
                Daftar sekarang
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{' '}
              <button
                onClick={() => setAuthMode('login')}
                className="text-blue-600 font-bold hover:underline"
              >
                Masuk di sini
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
