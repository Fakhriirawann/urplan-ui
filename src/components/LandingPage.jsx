import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Flame,
  LayoutGrid,
  Calendar,
  Share2,
  Users2,
  ShieldCheck,
  Check,
  Zap,
  PlayCircle,
  Star,
  ChevronDown,
} from 'lucide-react';

export default function LandingPage() {
  const { setCurrentView, setIsAuthModalOpen, setAuthMode } = useApp();
  const [activeTab, setActiveTab] = useState('kanban');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Animated Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[38rem] h-[38rem] rounded-full bg-blue-400/20 blur-[120px] animate-blob"></div>
        <div
          className="absolute top-[20%] right-[-10%] w-[38rem] h-[38rem] rounded-full bg-indigo-400/20 blur-[120px] animate-blob"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-[-15%] left-[20%] w-[38rem] h-[38rem] rounded-full bg-cyan-400/15 blur-[120px] animate-blob"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-blue-100 shadow-xs mb-8 transition-transform hover:scale-105 cursor-pointer">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
          </span>
          <span className="text-blue-900 text-[11px] font-black uppercase tracking-[0.2em]">
            UrPlan • Content Creator Workspace
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.08] mb-6 tracking-tight">
          Semua Kontenmu, <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-transparent bg-clip-text">
            Satu Ruang Kerja.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg font-medium leading-relaxed mb-10">
          Lebih dari sekadar to-do list biasa. UrPlan menggabungkan Manajemen Tugas Kanban,
          Kalender Editorial multi-platform, dan Pelacak Kebiasaan khusus Konten Kreator.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setCurrentView('app')}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Coba Gratis Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setAuthMode('login');
              setIsAuthModalOpen(true);
            }}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-bold text-base border border-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5 text-blue-600" />
            <span>Masuk Akun</span>
          </button>
        </div>

        {/* Interactive App Mockup Preview */}
        <div className="mt-8 relative mx-auto max-w-5xl animate-float">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl rounded-3xl"></div>
          <div className="relative bg-white/95 backdrop-blur-xl border border-white/80 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
            {/* Window bar */}
            <div className="bg-slate-50/90 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>

              {/* Mockup Tab buttons */}
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('kanban')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'kanban'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Kanban Board
                </button>
                <button
                  onClick={() => setActiveTab('list')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'list'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'calendar'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Calendar
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Live Preview</span>
              </div>
            </div>

            {/* Mockup Content */}
            <div className="p-6 sm:p-8 min-h-[380px] text-left">
              {activeTab === 'kanban' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Col 1 */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                        💡 Ideation (3)
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-100 mb-3 hover:border-blue-300 transition-colors">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-md inline-block mb-2">
                        TikTok
                      </span>
                      <div className="text-sm font-bold text-slate-800 mb-1">
                        Tren Dance & Sound Viral 2026
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        Riset hook 3 detik awal menggunakan pattern interrupt.
                      </p>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                        ✍️ Scripting (1)
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-xs border border-blue-200 ring-2 ring-blue-50 mb-3">
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-md inline-block mb-2">
                        YouTube
                      </span>
                      <div className="text-sm font-bold text-slate-800 mb-1">
                        Review Gadget Setup AI Workspace
                      </div>
                      <div className="flex items-center justify-between mt-3 text-xs">
                        <div className="flex -space-x-1.5">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[9px]">
                            FI
                          </div>
                          <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[9px]">
                            SN
                          </div>
                        </div>
                        <span className="text-rose-500 font-bold text-[11px]">Besok</span>
                      </div>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">
                        🚀 Ready to Post (2)
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-100 mb-3 opacity-80">
                      <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-[10px] font-bold rounded-md inline-block mb-2">
                        Instagram
                      </span>
                      <div className="text-sm font-bold text-slate-800 mb-1">
                        Carousel Tips Color Grading Video
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold mt-2">
                        ✅ Siap Tayang
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'list' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-4 px-4 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <div className="col-span-6">Judul Tugas</div>
                    <div className="col-span-2">Platform</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Deadline</div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 items-center bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs hover:border-blue-200 transition-colors">
                    <div className="col-span-6 font-bold text-slate-800 text-xs sm:text-sm">
                      Review Gadget Setup AI Workspace
                    </div>
                    <div className="col-span-2">
                      <span className="bg-rose-50 text-rose-600 font-bold text-[11px] px-2 py-0.5 rounded-md">
                        YouTube
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="bg-blue-50 text-blue-600 font-bold text-[11px] px-2 py-0.5 rounded-md">
                        In Progress
                      </span>
                    </div>
                    <div className="col-span-2 text-right font-bold text-xs text-rose-500">Besok</div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 items-center bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs hover:border-blue-200 transition-colors">
                    <div className="col-span-6 font-bold text-slate-800 text-xs sm:text-sm">
                      Carousel Tips Color Grading DaVinci
                    </div>
                    <div className="col-span-2">
                      <span className="bg-pink-50 text-pink-600 font-bold text-[11px] px-2 py-0.5 rounded-md">
                        Instagram
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="bg-emerald-50 text-emerald-600 font-bold text-[11px] px-2 py-0.5 rounded-md">
                        In Review
                      </span>
                    </div>
                    <div className="col-span-2 text-right font-bold text-xs text-slate-500">
                      13 Okt
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'calendar' && (
                <div>
                  <div className="grid grid-cols-7 gap-2 mb-3 text-center text-xs font-bold text-slate-400 uppercase">
                    <div>Sen</div>
                    <div>Sel</div>
                    <div>Rab</div>
                    <div>Kam</div>
                    <div>Jum</div>
                    <div>Sab</div>
                    <div>Min</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    <div className="h-20 bg-slate-50 rounded-xl p-2 border border-slate-100/60">
                      <span className="text-xs font-bold text-slate-400">12</span>
                    </div>
                    <div className="h-20 bg-white rounded-xl p-2 border border-blue-200 ring-1 ring-blue-100">
                      <span className="text-xs font-bold text-blue-600">13</span>
                      <div className="mt-1 bg-pink-50 text-pink-700 text-[10px] font-bold rounded px-1.5 py-0.5 truncate">
                        IG: Color Grading
                      </div>
                    </div>
                    <div className="h-20 bg-white rounded-xl p-2 border border-slate-100">
                      <span className="text-xs font-bold text-slate-600">14</span>
                      <div className="mt-1 bg-purple-50 text-purple-700 text-[10px] font-bold rounded px-1.5 py-0.5 truncate">
                        TikTok: 3 Hook
                      </div>
                    </div>
                    <div className="h-20 bg-white rounded-xl p-2 border border-slate-100">
                      <span className="text-xs font-bold text-slate-600">15</span>
                      <div className="mt-1 bg-rose-50 text-rose-700 text-[10px] font-bold rounded px-1.5 py-0.5 truncate">
                        YT: Gadget AI
                      </div>
                    </div>
                    <div className="h-20 bg-slate-50 rounded-xl p-2 border border-slate-100/60">
                      <span className="text-xs font-bold text-slate-400">16</span>
                    </div>
                    <div className="h-20 bg-slate-50 rounded-xl p-2 border border-slate-100/60">
                      <span className="text-xs font-bold text-slate-400">17</span>
                    </div>
                    <div className="h-20 bg-slate-50 rounded-xl p-2 border border-slate-100/60">
                      <span className="text-xs font-bold text-slate-400">18</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-20 bg-white/60 border-t border-slate-200/60" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-widest text-blue-600 uppercase mb-3">
              Fitur Andalan
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Dibuat Khusus Mengikuti Siklus Kerja Konten Kreator
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Visual Kanban Workflow</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Pindahkan ide dari tahap riset, penulisan naskah, editing video, hingga status siap
                jadwal tayang cukup dengan sekali drag-and-drop.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Daily Creator Habits</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Konsistensi adalah kunci algoritma. Pantau streak harian membaca, menulis skrip,
                dan riset tren agar produktivitas tidak kendor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Kolaborasi Tim Kreatif</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Tugaskan scriptwriter, editor, atau desainer thumbnail langsung ke kartu tugas
                masing-masing lengkap dengan deadline yang jelas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black tracking-widest text-blue-600 uppercase mb-3">
              Paket Harga Fleksibel
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Mulai Gratis, Upgrade Kapan Saja
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            {/* Starter */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Free Solo Creator</h3>
                <p className="text-xs text-slate-400 mb-6">Untuk kreator individu yang baru memulai.</p>
                <div className="text-4xl font-black text-slate-900 mb-6">
                  Rp 0 <span className="text-xs text-slate-400 font-normal">/selamanya</span>
                </div>
                <ul className="space-y-3 text-xs font-semibold text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Hingga 2 Proyek Konten
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Kanban Board & List View
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> 3 Daily Habit Trackers
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentView('app')}
                className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                Mulai Gratis
              </button>
            </div>

            {/* Pro */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col justify-between relative scale-105">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                Paling Populer
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Pro Creator</h3>
                <p className="text-xs text-slate-400 mb-6">Untuk kreator aktif dengan multi-platform.</p>
                <div className="text-4xl font-black mb-6">
                  Rp 79rb <span className="text-xs text-slate-400 font-normal">/bulan</span>
                </div>
                <ul className="space-y-3 text-xs font-semibold text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> Unlimited Proyek & Tugas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> Kalender Editorial Lengkap
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> Kolaborasi Tim s/d 5 Anggota
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> Pengingat Deadline & Push Alerts
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentView('app')}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-600/30"
              >
                Coba Pro Gratis 14 Hari
              </button>
            </div>

            {/* Studio / Agency */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Studio & Agency</h3>
                <p className="text-xs text-slate-400 mb-6">Untuk tim produksi dan agensi konten.</p>
                <div className="text-4xl font-black text-slate-900 mb-6">
                  Rp 199rb <span className="text-xs text-slate-400 font-normal">/bulan</span>
                </div>
                <ul className="space-y-3 text-xs font-semibold text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Semua Fitur Pro
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Anggota Tim Tanpa Batas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" /> Ekspor Laporan CSV Lengkap
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentView('app')}
                className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                Hubungi Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-black tracking-widest text-blue-600 uppercase mb-3">
              FAQ
            </h2>
            <p className="text-3xl font-black text-slate-900">Pertanyaan yang Sering Diajukan</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Apakah Our Plan bisa digunakan di berbagai perangkat?',
                a: 'Ya, seluruh sistem antarmuka berbasis web responsif modern dan dapat diakses cepat melalui laptop, tablet, maupun smartphone.',
              },
              {
                q: 'Apakah data tugas dan habit saya tersimpan?',
                a: 'Ya! Seluruh manipulasi data (tambah tugas, ubah status Kanban, ceklis habit, ganti proyek) tersimpan di browser secara otomatis.',
              },
              {
                q: 'Bagaimana cara menambahkan anggota tim baru?',
                a: 'Klik tombol "Tim" di navigasi atas pada halaman workspace untuk mengundang anggota dan mengatur peran (Editor, Scriptwriter, Desainer).',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 cursor-pointer shadow-xs transition-all"
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className="font-bold text-sm text-slate-800">{item.q}</h4>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </div>
                {openFaq === idx && (
                  <p className="mt-3 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 bg-white text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo-1.png" alt="Our Plan Logo" className="h-6 w-auto" />
            <span className="font-bold text-slate-700">Our Plan</span>
          </div>
          <div>© 2026 Our Plan. All rights reserved. Dibuat khusus untuk Content Creator.</div>
        </div>
      </footer>
    </div>
  );
}
