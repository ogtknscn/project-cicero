import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TaskTemplate, ProjectTemplate } from '../types/template';
import { generateId } from './useStore';
import { useToastStore } from './toastStore';

interface TemplateStore {
  taskTemplates: TaskTemplate[];
  projectTemplates: ProjectTemplate[];

  // Task template actions
  addTaskTemplate: (template: Omit<TaskTemplate, 'id' | 'createdAt'>) => void;
  updateTaskTemplate: (id: string, updates: Partial<TaskTemplate>) => void;
  deleteTaskTemplate: (id: string) => void;

  // Project template actions
  addProjectTemplate: (template: Omit<ProjectTemplate, 'id' | 'createdAt'>) => void;
  updateProjectTemplate: (id: string, updates: Partial<ProjectTemplate>) => void;
  deleteProjectTemplate: (id: string) => void;
}

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set, get) => ({
      taskTemplates: [],
      projectTemplates: [],

      addTaskTemplate: (template) => {
        const newTemplate: TaskTemplate = {
          ...template,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({
          taskTemplates: [...state.taskTemplates, newTemplate],
        }));
        useToastStore
          .getState()
          .addToast({ message: 'Görev şablonu oluşturuldu', type: 'success' });
      },

      updateTaskTemplate: (id, updates) => {
        set((state) => ({
          taskTemplates: state.taskTemplates.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));
        useToastStore.getState().addToast({ message: 'Görev şablonu güncellendi', type: 'info' });
      },

      deleteTaskTemplate: (id) => {
        set((state) => ({
          taskTemplates: state.taskTemplates.filter((t) => t.id !== id),
        }));
        useToastStore.getState().addToast({ message: 'Görev şablonu silindi', type: 'warning' });
      },

      addProjectTemplate: (template) => {
        const newTemplate: ProjectTemplate = {
          ...template,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({
          projectTemplates: [...state.projectTemplates, newTemplate],
        }));
        useToastStore
          .getState()
          .addToast({ message: 'Proje şablonu oluşturuldu', type: 'success' });
      },

      updateProjectTemplate: (id, updates) => {
        set((state) => ({
          projectTemplates: state.projectTemplates.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
        useToastStore.getState().addToast({ message: 'Proje şablonu güncellendi', type: 'info' });
      },

      deleteProjectTemplate: (id) => {
        set((state) => ({
          projectTemplates: state.projectTemplates.filter((t) => t.id !== id),
        }));
        useToastStore.getState().addToast({ message: 'Proje şablonu silindi', type: 'warning' });
      },
    }),
    {
      name: 'project-cicero-template-store',
    }
  )
);
