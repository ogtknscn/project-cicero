import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sprint, Epic, StoryPoints } from '../types/agile';
import { generateId } from './useStore';
import { useToastStore } from './toastStore';

interface AgileStore {
  sprints: Sprint[];
  epics: Epic[];
  storyPoints: StoryPoints[];

  // Sprint actions
  addSprint: (sprint: Omit<Sprint, 'id' | 'createdAt' | 'updatedAt' | 'taskIds'>) => void;
  updateSprint: (id: string, updates: Partial<Sprint>) => void;
  deleteSprint: (id: string) => void;
  addTaskToSprint: (sprintId: string, taskId: string) => void;
  removeTaskFromSprint: (sprintId: string, taskId: string) => void;
  getSprintsByProject: (projectId: string) => Sprint[];

  // Epic actions
  addEpic: (epic: Omit<Epic, 'id' | 'createdAt' | 'updatedAt' | 'taskIds'>) => void;
  updateEpic: (id: string, updates: Partial<Epic>) => void;
  deleteEpic: (id: string) => void;
  addTaskToEpic: (epicId: string, taskId: string) => void;
  removeTaskFromEpic: (epicId: string, taskId: string) => void;
  getEpicsByProject: (projectId: string) => Epic[];

  // Story Points actions
  setStoryPoints: (taskId: string, points: number) => void;
  getStoryPoints: (taskId: string) => number;
}

export const useAgileStore = create<AgileStore>()(
  persist(
    (set, get) => ({
      sprints: [],
      epics: [],
      storyPoints: [],

      // Sprint actions
      addSprint: (sprint) => {
        const newSprint: Sprint = {
          ...sprint,
          id: generateId(),
          taskIds: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          sprints: [...state.sprints, newSprint],
        }));
        useToastStore
          .getState()
          .addToast({ message: `Sprint "${sprint.name}" oluşturuldu`, type: 'success' });
      },

      updateSprint: (id, updates) => {
        set((state) => ({
          sprints: state.sprints.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s
          ),
        }));
        useToastStore.getState().addToast({ message: 'Sprint güncellendi', type: 'info' });
      },

      deleteSprint: (id) => {
        const sprint = get().sprints.find((s) => s.id === id);
        set((state) => ({
          sprints: state.sprints.filter((s) => s.id !== id),
        }));
        useToastStore
          .getState()
          .addToast({ message: `"${sprint?.name}" silindi`, type: 'warning' });
      },

      addTaskToSprint: (sprintId, taskId) => {
        set((state) => ({
          sprints: state.sprints.map((s) =>
            s.id === sprintId && !s.taskIds.includes(taskId)
              ? { ...s, taskIds: [...s.taskIds, taskId], updatedAt: new Date() }
              : s
          ),
        }));
      },

      removeTaskFromSprint: (sprintId, taskId) => {
        set((state) => ({
          sprints: state.sprints.map((s) =>
            s.id === sprintId
              ? { ...s, taskIds: s.taskIds.filter((id) => id !== taskId), updatedAt: new Date() }
              : s
          ),
        }));
      },

      getSprintsByProject: (projectId) => {
        return get().sprints.filter((s) => s.projectId === projectId);
      },

      // Epic actions
      addEpic: (epic) => {
        const newEpic: Epic = {
          ...epic,
          id: generateId(),
          taskIds: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          epics: [...state.epics, newEpic],
        }));
        useToastStore
          .getState()
          .addToast({ message: `Epic "${epic.name}" oluşturuldu`, type: 'success' });
      },

      updateEpic: (id, updates) => {
        set((state) => ({
          epics: state.epics.map((e) =>
            e.id === id ? { ...e, ...updates, updatedAt: new Date() } : e
          ),
        }));
        useToastStore.getState().addToast({ message: 'Epic güncellendi', type: 'info' });
      },

      deleteEpic: (id) => {
        const epic = get().epics.find((e) => e.id === id);
        set((state) => ({
          epics: state.epics.filter((e) => e.id !== id),
        }));
        useToastStore.getState().addToast({ message: `"${epic?.name}" silindi`, type: 'warning' });
      },

      addTaskToEpic: (epicId, taskId) => {
        set((state) => ({
          epics: state.epics.map((e) =>
            e.id === epicId && !e.taskIds.includes(taskId)
              ? { ...e, taskIds: [...e.taskIds, taskId], updatedAt: new Date() }
              : e
          ),
        }));
      },

      removeTaskFromEpic: (epicId, taskId) => {
        set((state) => ({
          epics: state.epics.map((e) =>
            e.id === epicId
              ? { ...e, taskIds: e.taskIds.filter((id) => id !== taskId), updatedAt: new Date() }
              : e
          ),
        }));
      },

      getEpicsByProject: (projectId) => {
        return get().epics.filter((e) => e.projectId === projectId);
      },

      // Story Points actions
      setStoryPoints: (taskId, points) => {
        const { storyPoints } = get();
        const existing = storyPoints.find((sp) => sp.taskId === taskId);

        if (existing) {
          set((state) => ({
            storyPoints: state.storyPoints.map((sp) =>
              sp.taskId === taskId ? { ...sp, points } : sp
            ),
          }));
        } else {
          set((state) => ({
            storyPoints: [...state.storyPoints, { taskId, points }],
          }));
        }
      },

      getStoryPoints: (taskId) => {
        const sp = get().storyPoints.find((sp) => sp.taskId === taskId);
        return sp?.points || 0;
      },
    }),
    {
      name: 'project-cicero-agile-store',
    }
  )
);
