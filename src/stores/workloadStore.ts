import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserCapacity, WorkloadEntry, WorkloadAlert } from '../types/workload';
import { generateId } from './useStore';
import { useToastStore } from './toastStore';

interface WorkloadStore {
  userCapacities: UserCapacity[];
  workloadEntries: WorkloadEntry[];
  alerts: WorkloadAlert[];

  // Capacity actions
  addUserCapacity: (capacity: Omit<UserCapacity, 'userId'> & { userId?: string }) => void;
  updateUserCapacity: (userId: string, updates: Partial<UserCapacity>) => void;
  deleteUserCapacity: (userId: string) => void;

  // Workload actions
  addWorkloadEntry: (entry: Omit<WorkloadEntry, 'date'>) => void;
  updateWorkloadEntry: (taskId: string, week: string, updates: Partial<WorkloadEntry>) => void;
  deleteWorkloadEntry: (taskId: string, week: string) => void;

  // Alert actions
  addAlert: (alert: Omit<WorkloadAlert, 'id' | 'createdAt'>) => void;
  dismissAlert: (id: string) => void;
  checkWorkloadAlerts: () => void;
}

export const useWorkloadStore = create<WorkloadStore>()(
  persist(
    (set, get) => ({
      userCapacities: [],
      workloadEntries: [],
      alerts: [],

      addUserCapacity: (capacity) => {
        const userId = capacity.userId || generateId();
        const newCapacity: UserCapacity = {
          ...capacity,
          userId,
        };
        set((state) => ({
          userCapacities: [...state.userCapacities, newCapacity],
        }));
        useToastStore.getState().addToast({ message: 'Kullanıcı kapasitesi eklendi', type: 'success' });
      },

      updateUserCapacity: (userId, updates) => {
        set((state) => ({
          userCapacities: state.userCapacities.map((c) =>
            c.userId === userId ? { ...c, ...updates } : c
          ),
        }));
        useToastStore.getState().addToast({ message: 'Kapasite güncellendi', type: 'info' });
      },

      deleteUserCapacity: (userId) => {
        set((state) => ({
          userCapacities: state.userCapacities.filter((c) => c.userId !== userId),
        }));
        useToastStore.getState().addToast({ message: 'Kullanıcı kapasitesi silindi', type: 'warning' });
      },

      addWorkloadEntry: (entry) => {
        const newEntry: WorkloadEntry = {
          ...entry,
          date: new Date(),
        };
        set((state) => ({
          workloadEntries: [...state.workloadEntries, newEntry],
        }));
        get().checkWorkloadAlerts();
      },

      updateWorkloadEntry: (taskId, week, updates) => {
        set((state) => ({
          workloadEntries: state.workloadEntries.map((e) =>
            e.taskId === taskId && e.week === week ? { ...e, ...updates } : e
          ),
        }));
        get().checkWorkloadAlerts();
      },

      deleteWorkloadEntry: (taskId, week) => {
        set((state) => ({
          workloadEntries: state.workloadEntries.filter(
            (e) => !(e.taskId === taskId && e.week === week)
          ),
        }));
      },

      addAlert: (alert) => {
        const newAlert: WorkloadAlert = {
          ...alert,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({
          alerts: [...state.alerts, newAlert],
        }));
      },

      dismissAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== id),
        }));
      },

      checkWorkloadAlerts: () => {
        const { userCapacities, workloadEntries } = get();
        const newAlerts: Omit<WorkloadAlert, 'id' | 'createdAt'>[] = [];

        // Group entries by user and week
        const workloadByUserWeek: Record<string, Record<string, WorkloadEntry[]>> = {};
        workloadEntries.forEach((entry) => {
          if (!workloadByUserWeek[entry.userId]) {
            workloadByUserWeek[entry.userId] = {};
          }
          if (!workloadByUserWeek[entry.userId][entry.week]) {
            workloadByUserWeek[entry.userId][entry.week] = [];
          }
          workloadByUserWeek[entry.userId][entry.week].push(entry);
        });

        // Check for overloads
        Object.entries(workloadByUserWeek).forEach(([userId, weeks]) => {
          const capacity = userCapacities.find((c) => c.userId === userId);
          if (!capacity) return;

          Object.entries(weeks).forEach(([week, entries]) => {
            const totalHours = entries.reduce((sum, e) => sum + e.estimatedHours, 0);
            const utilization = (totalHours / capacity.weeklyHours) * 100;

            if (utilization > 110) {
              newAlerts.push({
                userId,
                week,
                type: 'overload',
                severity: 'high',
                message: `${capacity.userName} bu hafta %${utilization.toFixed(0)} yükle çalışıyor (${totalHours}/${capacity.weeklyHours} saat)`,
              });
            } else if (utilization > 100) {
              newAlerts.push({
                userId,
                week,
                type: 'overload',
                severity: 'medium',
                message: `${capacity.userName} bu hafta hafif aşırı yüklü (%${utilization.toFixed(0)})`,
              });
            }
          });
        });

        // Add new alerts
        newAlerts.forEach((alert) => {
          get().addAlert(alert);
        });
      },
    }),
    {
      name: 'project-cicero-workload-store',
    }
  )
);

