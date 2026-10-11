import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, FolderPlus } from 'lucide-react';

export default function ProjectModal() {
  const {
    isProjectModalOpen,
    setIsProjectModalOpen,
    editingProject,
    setEditingProject,
    saveProject,
    deleteProject,
  } = useApp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('Multi-Platform');

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name || '');
      setDescription(editingProject.description || '');
      setPlatform(editingProject.platform || 'Multi-Platform');
    } else {
      setName('');
      setDescription('');
      setPlatform('Multi-Platform');
    }
  }, [editingProject, isProjectModalOpen]);

  if (!isProjectModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    saveProject({
      id: editingProject ? editingProject.id : null,
      name: name.trim(),
      description: description.trim(),
      platform,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800">
                {editingProject ? 'Pengaturan Proyek' : 'Buat Proyek Baru'}
              </h3>
              <p className="text-xs text-slate-400">
                {editingProject ? 'Ubah informasi ruang kerja' : 'Kelompokkan konten dalam satu workspace'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsProjectModalOpen(false);
              setEditingProject(null);
            }}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Nama Proyek <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Podcast Series 2026 / TikTok Food"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Fokus Platform Utama
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Multi-Platform">Multi-Platform (Semua)</option>
              <option value="YouTube">YouTube</option>
              <option value="TikTok & Reels">TikTok & IG Reels</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter / X">Twitter / X</option>
              <option value="Blog & Newsletter">Blog & Newsletter</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Proyek</label>
            <textarea
              rows={3}
              placeholder="Jelaskan tujuan channel, target audience, atau jadwal tayang..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {editingProject ? (
              <button
                type="button"
                onClick={() => {
                  deleteProject(editingProject.id);
                  setIsProjectModalOpen(false);
                  setEditingProject(null);
                }}
                className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Proyek</span>
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setEditingProject(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30"
              >
                {editingProject ? 'Simpan' : 'Buat Proyek'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
