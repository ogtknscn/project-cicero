import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, Task } from '../types';
import { useToastStore } from './toastStore';

interface AppStore {
  projects: Project[];
  selectedProjectId: string | null;

  // Project actions
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string | null) => void;

  // Task actions
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Utility actions
  exportData: () => string;
  importData: (data: string) => void;
  clearAll: () => void;
}

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      projects: [],
      selectedProjectId: null,

      addProject: (project) => {
        const projects = get().projects;
        set({ projects: [...projects, project] });
        useToastStore.getState().addToast({ message: 'Proje oluşturuldu', type: 'success' });
      },

      updateProject: (id, updates) => {
        const projects = get().projects;
        set({
          projects: projects.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...updates,
                  updatedAt: new Date(),
                  metadata: {
                    ...p.metadata,
                    ...(updates.tasks && {
                      totalTasks: updates.tasks.length,
                      completedTasks: updates.tasks.filter((t) => t.status === 'done').length,
                    }),
                  },
                }
              : p
          ),
        });
      },

      deleteProject: (id) => {
        const projects = get().projects;
        const filtered = projects.filter((p) => p.id !== id);
        set({ projects: filtered, selectedProjectId: null });
        useToastStore.getState().addToast({ message: 'Proje silindi', type: 'info' });
      },

      selectProject: (id) => {
        set({ selectedProjectId: id });
      },

      addTask: (task) => {
        const { projects, selectedProjectId } = get();
        const updatedProjects = projects.map((p) => {
          if (p.id === selectedProjectId) {
            const updatedTasks = [...p.tasks, task];
            return {
              ...p,
              tasks: updatedTasks,
              updatedAt: new Date(),
              metadata: {
                totalTasks: updatedTasks.length,
                completedTasks: updatedTasks.filter((t) => t.status === 'done').length,
              },
            };
          }
          return p;
        });
        set({ projects: updatedProjects });
      },

      updateTask: (id, updates) => {
        const { projects } = get();
        const updatedProjects = projects.map((p) => {
          const updatedTasks = p.tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
          );

          if (p.tasks.some((t) => t.id === id)) {
            return {
              ...p,
              tasks: updatedTasks,
              updatedAt: new Date(),
              metadata: {
                totalTasks: updatedTasks.length,
                completedTasks: updatedTasks.filter((t) => t.status === 'done').length,
              },
            };
          }
          return p;
        });
        set({ projects: updatedProjects });
        useToastStore.getState().addToast({ message: 'Görev güncellendi', type: 'info' });
      },

      deleteTask: (id) => {
        const { projects } = get();
        const updatedProjects = projects.map((p) => {
          const updatedTasks = p.tasks.filter((t) => t.id !== id);

          if (p.tasks.some((t) => t.id === id)) {
            return {
              ...p,
              tasks: updatedTasks,
              updatedAt: new Date(),
              metadata: {
                totalTasks: updatedTasks.length,
                completedTasks: updatedTasks.filter((t) => t.status === 'done').length,
              },
            };
          }
          return p;
        });
        set({ projects: updatedProjects });
        useToastStore.getState().addToast({ message: 'Görev silindi', type: 'warning' });
      },

      exportData: () => {
        const data = get().projects;
        return JSON.stringify(data, null, 2);
      },

      importData: (jsonString) => {
        try {
          const data = JSON.parse(jsonString);
          set({ projects: data });
          useToastStore.getState().addToast({ message: 'Veri içe aktarıldı', type: 'success' });
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error('Import failed:', error);
          }
          useToastStore.getState().addToast({ message: 'İçe aktarma başarısız', type: 'error' });
        }
      },

      clearAll: () => {
        set({ projects: [], selectedProjectId: null });
      },
    }),
    {
      name: 'project-cicero-storage',
    }
  )
);

export { generateId };
