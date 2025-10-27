import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TimeEntry, TimeTrackingSettings, TimeSummary } from '../types/time';

interface TimeStore {
  entries: TimeEntry[];
  settings: Record<string, TimeTrackingSettings>;
  activeEntry: string | null; // currently running entry ID

  // Actions
  startTracking: (taskId: string, userId: string, description?: string) => string;
  stopTracking: () => void;
  createEntry: (entry: Omit<TimeEntry, 'id'>) => void;
  updateEntry: (id: string, updates: Partial<TimeEntry>) => void;
  deleteEntry: (id: string) => void;
  
  // Settings
  updateSettings: (taskId: string, settings: Partial<TimeTrackingSettings>) => void;
  
  // Utils
  getTaskTimeSummary: (taskId: string) => TimeSummary;
  getProjectTimeSummary: (projectId: string, taskIds: string[]) => TimeSummary;
}

const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const useTimeStore = create<TimeStore>()(
  persist(
    (set, get) => ({
      entries: [],
      settings: {},
      activeEntry: null,

      startTracking: (taskId, userId, description) => {
        const { entries, activeEntry } = get();
        
        // Stop any active entry first
        if (activeEntry) {
          const active = entries.find((e) => e.id === activeEntry);
          if (active && !active.endTime) {
            set({
              entries: entries.map((e) =>
                e.id === activeEntry
                  ? { ...e, endTime: new Date(), duration: get().getTaskTimeSummary(taskId).totalMinutes + (Date.now() - active.startTime.getTime()) / 60000 }
                  : e
              ),
            });
          }
        }

        // Start new entry
        const id = generateId();
        const newEntry: TimeEntry = {
          id,
          taskId,
          userId,
          startTime: new Date(),
          duration: 0,
          description,
          billed: false,
        };

        set({
          entries: [...entries, newEntry],
          activeEntry: id,
        });

        return id;
      },

      stopTracking: () => {
        const { entries, activeEntry } = get();
        if (!activeEntry) return;

        const active = entries.find((e) => e.id === activeEntry);
        if (active && !active.endTime) {
          const endTime = new Date();
          const duration = (endTime.getTime() - active.startTime.getTime()) / 60000; // minutes

          set({
            entries: entries.map((e) =>
              e.id === activeEntry
                ? { ...e, endTime, duration }
                : e
            ),
            activeEntry: null,
          });
        }
      },

      createEntry: (entry) => {
        const newEntry: TimeEntry = {
          ...entry,
          id: generateId(),
        };
        set((state) => ({
          entries: [...state.entries, newEntry],
        }));
      },

      updateEntry: (id, updates) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        }));
      },

      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
          activeEntry: state.activeEntry === id ? null : state.activeEntry,
        }));
      },

      updateSettings: (taskId, settings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            [taskId]: {
              ...state.settings[taskId],
              ...settings,
            },
          },
        }));
      },

      getTaskTimeSummary: (taskId) => {
        const { entries } = get();
        const taskEntries = entries.filter((e) => e.taskId === taskId);

        const totalMinutes = taskEntries.reduce((sum, e) => sum + e.duration, 0);
        const billedMinutes = taskEntries
          .filter((e) => e.billed)
          .reduce((sum, e) => sum + e.duration, 0);

        return {
          taskId,
          totalMinutes,
          totalHours: totalMinutes / 60,
          entriesCount: taskEntries.length,
          billedMinutes,
          unbilledMinutes: totalMinutes - billedMinutes,
        };
      },

      getProjectTimeSummary: (projectId, taskIds) => {
        const { entries } = get();
        const projectEntries = entries.filter((e) => taskIds.includes(e.taskId));

        const totalMinutes = projectEntries.reduce((sum, e) => sum + e.duration, 0);
        const billedMinutes = projectEntries
          .filter((e) => e.billed)
          .reduce((sum, e) => sum + e.duration, 0);

        return {
          taskId: projectId,
          totalMinutes,
          totalHours: totalMinutes / 60,
          entriesCount: projectEntries.length,
          billedMinutes,
          unbilledMinutes: totalMinutes - billedMinutes,
        };
      },
    }),
    {
      name: 'project-cicero-time-store',
    }
  )
);

