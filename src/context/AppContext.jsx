import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initialProjects,
  initialTasks,
  initialHabits,
  initialNotifications,
  teamMembers,
  initialUsers,
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation: 'landing', 'app', 'admin'
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('urplan_view') || 'landing';
  });

  // Auth User
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('urplan_user');
    return saved ? JSON.parse(saved) : {
      id: 1,
      name: 'Fakhri Irawan',
      email: 'fakhri@urplan.app',
      role: 'creator', // 'creator' or 'admin'
      avatar: 'FI'
    };
  });

  // Projects
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('urplan_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    const saved = localStorage.getItem('urplan_active_project_id');
    return saved ? Number(saved) : 1;
  });

  // Tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('urplan_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  // Habits
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('urplan_habits');
    return saved ? JSON.parse(saved) : initialHabits;
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('urplan_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Members
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('urplan_members');
    return saved ? JSON.parse(saved) : teamMembers;
  });

  // Users (for Admin)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('urplan_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Maintenance mode (admin)
  const [isMaintenance, setIsMaintenance] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDeadline, setFilterDeadline] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');

  // App workspace view: 'kanban' | 'list' | 'calendar'
  const [workspaceTab, setWorkspaceTab] = useState('kanban');

  // Modals state
  const [taskModalState, setTaskModalState] = useState({ isOpen: false, task: null, defaultStatus: 'Idea' });
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('urplan_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('urplan_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('urplan_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('urplan_active_project_id', String(activeProjectId));
  }, [activeProjectId]);

  useEffect(() => {
    localStorage.setItem('urplan_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('urplan_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('urplan_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('urplan_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('urplan_users', JSON.stringify(users));
  }, [users]);

  // Active Project object
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0] || null;

  // Filtered Tasks for Active Project
  const activeTasks = tasks.filter((t) => {
    if (activeProjectId && t.projectId !== activeProjectId) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = t.description?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    if (filterPlatform !== 'all' && t.platform_distribution.toLowerCase() !== filterPlatform.toLowerCase()) {
      return false;
    }

    if (filterPriority !== 'all' && t.priority.toLowerCase() !== filterPriority.toLowerCase()) {
      return false;
    }

    if (filterAssignee !== 'all') {
      if (filterAssignee === 'my') {
        if (!t.assignee_ids?.includes(currentUser.id)) return false;
      } else {
        if (!t.assignee_ids?.includes(Number(filterAssignee))) return false;
      }
    }

    if (filterDeadline !== 'all' && t.deadline) {
      const todayStr = new Date().toISOString().substring(0, 10);
      const taskDate = t.deadline.substring(0, 10);
      if (filterDeadline === 'overdue' && (taskDate >= todayStr || t.status === 'Published')) {
        return false;
      }
      if (filterDeadline === 'today' && taskDate !== todayStr) {
        return false;
      }
      if (filterDeadline === 'upcoming' && taskDate <= todayStr) {
        return false;
      }
    }

    return true;
  });

  // Task actions
  const saveTask = (taskData) => {
    if (taskData.id) {
      // Edit
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
      addToast('Tugas berhasil diperbarui!');
    } else {
      // Create
      const newTask = {
        ...taskData,
        id: Date.now(),
        projectId: activeProjectId || 1,
      };
      setTasks((prev) => [newTask, ...prev]);
      addToast('Tugas baru berhasil ditambahkan!');
    }
    setTaskModalState({ isOpen: false, task: null, defaultStatus: 'Idea' });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    if (newStatus === 'Published') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      addToast('🎉 Konten berhasil di-publish!');
    } else {
      addToast(`Status tugas diubah ke "${newStatus}"`, 'info');
    }
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    addToast('Tugas telah dihapus', 'info');
  };

  // Project actions
  const saveProject = (projData) => {
    if (projData.id) {
      setProjects((prev) =>
        prev.map((p) => (p.id === projData.id ? { ...p, ...projData } : p))
      );
      addToast('Proyek berhasil diperbarui!');
    } else {
      const newProj = {
        ...projData,
        id: Date.now(),
        color: 'from-blue-600 to-indigo-600',
      };
      setProjects((prev) => [...prev, newProj]);
      setActiveProjectId(newProj.id);
      addToast('Proyek baru berhasil dibuat!');
    }
    setIsProjectModalOpen(false);
    setEditingProject(null);
  };

  const deleteProject = (projId) => {
    if (projects.length <= 1) {
      addToast('Minimal harus ada 1 proyek aktif!', 'error');
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== projId));
    setTasks((prev) => prev.filter((t) => t.projectId !== projId));
    const remaining = projects.filter((p) => p.id !== projId);
    if (remaining.length > 0) {
      setActiveProjectId(remaining[0].id);
    }
    addToast('Proyek berhasil dihapus', 'info');
  };

  // Habits actions
  const toggleHabit = (habitId) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextCompleted = !h.completedToday;
          const nextStreak = nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1);
          if (nextCompleted) {
            confetti({
              particleCount: 40,
              spread: 50,
              origin: { y: 0.6 },
            });
            addToast(`🔥 Mantap! Streak ${h.name} bertambah jadi ${nextStreak} hari!`);
          }
          return {
            ...h,
            completedToday: nextCompleted,
            streak: nextStreak,
          };
        }
        return h;
      })
    );
  };

  const addHabit = (name, icon = '✨') => {
    const newHabit = {
      id: Date.now(),
      name,
      icon,
      streak: 1,
      completedToday: true,
    };
    setHabits((prev) => [...prev, newHabit]);
    confetti({ particleCount: 35, spread: 45 });
    addToast('Habit baru ditambahkan!');
    setIsHabitModalOpen(false);
  };

  const deleteHabit = (habitId) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
    addToast('Habit dihapus', 'info');
  };

  // Notifications
  const markNotificationAsRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Semua notifikasi ditandai dibaca');
  };

  const broadcastNotification = (title, message) => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: 'Baru saja',
      read: false,
      type: 'broadcast',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    addToast('Pengumuman berhasil disiarkan ke seluruh pengguna!');
  };

  // Reset to default prototype
  const resetDemoData = () => {
    setProjects(initialProjects);
    setActiveProjectId(1);
    setTasks(initialTasks);
    setHabits(initialHabits);
    setNotifications(initialNotifications);
    setMembers(teamMembers);
    setUsers(initialUsers);
    addToast('Data workspace berhasil di-reset!');
  };

  // Export tasks as CSV helper
  const exportTasksCSV = () => {
    const headers = ['ID', 'Judul', 'Platform', 'Prioritas', 'Status', 'Deadline', 'Deskripsi'];
    const rows = activeTasks.map((t) => [
      t.id,
      `"${(t.title || '').replace(/"/g, '""')}"`,
      t.platform_distribution,
      t.priority,
      t.status,
      t.deadline || '-',
      `"${(t.description || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UrPlan_${activeProject?.name || 'Tasks'}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Data tugas berhasil diexport ke CSV!');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        projects,
        activeProjectId,
        setActiveProjectId,
        activeProject,
        saveProject,
        deleteProject,
        isProjectModalOpen,
        setIsProjectModalOpen,
        editingProject,
        setEditingProject,
        tasks,
        activeTasks,
        saveTask,
        updateTaskStatus,
        deleteTask,
        taskModalState,
        setTaskModalState,
        habits,
        toggleHabit,
        addHabit,
        deleteHabit,
        isHabitModalOpen,
        setIsHabitModalOpen,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        broadcastNotification,
        members,
        setMembers,
        isTeamModalOpen,
        setIsTeamModalOpen,
        users,
        setUsers,
        isMaintenance,
        setIsMaintenance,
        workspaceTab,
        setWorkspaceTab,
        searchQuery,
        setSearchQuery,
        filterPlatform,
        setFilterPlatform,
        filterPriority,
        setFilterPriority,
        filterDeadline,
        setFilterDeadline,
        filterAssignee,
        setFilterAssignee,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        toasts,
        addToast,
        removeToast,
        resetDemoData,
        exportTasksCSV,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
