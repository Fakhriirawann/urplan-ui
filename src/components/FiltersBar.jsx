import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
  Calendar as CalendarIcon,
  Settings,
  X,
} from 'lucide-react';

export default function FiltersBar() {
  const {
    searchQuery,
    setSearchQuery,
    filterPlatform,
    setFilterPlatform,
    filterPriority,
    setFilterPriority,
    filterDeadline,
    setFilterDeadline,
    workspaceTab,
    setWorkspaceTab,
    setTaskModalState,
    activeProject,
    setIsProjectModalOpen,
    setEditingProject,
  } = useApp();

  const platforms = ['all', 'YouTube', 'TikTok', 'Instagram', 'Twitter', 'LinkedIn'];
  const priorities = ['all', 'High', 'Medium', 'Low'];

  const hasActiveFilters =
    searchQuery !== '' ||
    filterPlatform !== 'all' ||
    filterPriority !== 'all' ||
    filterDeadline !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setFilterPlatform('all');
    setFilterPriority('all');
    setFilterDeadline('all');
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xs space-y-4">
      {/* Row 1: Search & Main Actions */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari ide, judul konten, atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* View Mode Toggle (Mobile / Desktop) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setWorkspaceTab('kanban')}
              className={`p-2 rounded-xl transition-all ${
                workspaceTab === 'kanban'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Kanban Board"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setWorkspaceTab('list')}
              className={`p-2 rounded-xl transition-all ${
                workspaceTab === 'list'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setWorkspaceTab('calendar')}
              className={`p-2 rounded-xl transition-all ${
                workspaceTab === 'calendar'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Calendar View"
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Edit Project Button */}
          {activeProject && (
            <button
              onClick={() => {
                setEditingProject(activeProject);
                setIsProjectModalOpen(true);
              }}
              className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
              title="Pengaturan Proyek Ini"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* New Task Button */}
          <button
            onClick={() => setTaskModalState({ isOpen: true, task: null, defaultStatus: 'Idea' })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Tugas</span>
          </button>
        </div>
      </div>

      {/* Row 2: Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Platform:
          </span>
          {platforms.map((plat) => (
            <button
              key={plat}
              onClick={() => setFilterPlatform(plat)}
              className={`px-3 py-1 rounded-xl font-bold text-[11px] transition-all ${
                filterPlatform.toLowerCase() === plat.toLowerCase()
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {plat === 'all' ? 'Semua' : plat}
            </button>
          ))}
        </div>

        {/* Priority & Deadline selectors */}
        <div className="flex items-center gap-2">
          {/* Priority */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200 border-none text-[11px] font-bold text-slate-700 rounded-xl px-2.5 py-1 focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Semua Prioritas</option>
            <option value="High">Prioritas Tinggi</option>
            <option value="Medium">Prioritas Sedang</option>
            <option value="Low">Prioritas Rendah</option>
          </select>

          {/* Deadline */}
          <select
            value={filterDeadline}
            onChange={(e) => setFilterDeadline(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200 border-none text-[11px] font-bold text-slate-700 rounded-xl px-2.5 py-1 focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Semua Deadline</option>
            <option value="today">Hari Ini</option>
            <option value="upcoming">Mendatang</option>
            <option value="overdue">Terlewat</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-rose-500 hover:text-rose-700 px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
