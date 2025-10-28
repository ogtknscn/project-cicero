import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AutomationRule, AutomationLog } from '../types/automation';
import { generateId } from './useStore';
import { useToastStore } from './toastStore';

interface AutomationStore {
  rules: AutomationRule[];
  logs: AutomationLog[];
  maxLogs: number;

  // Rule actions
  addRule: (rule: Omit<AutomationRule, 'id' | 'createdAt' | 'updatedAt' | 'executionCount'>) => void;
  updateRule: (id: string, updates: Partial<AutomationRule>) => void;
  deleteRule: (id: string) => void;
  toggleRule: (id: string) => void;

  // Log actions
  addLog: (log: Omit<AutomationLog, 'id' | 'executedAt'>) => void;
  clearLogs: () => void;
  getLogsByRule: (ruleId: string) => AutomationLog[];

  // Execution tracking
  incrementExecutionCount: (ruleId: string) => void;
}

export const useAutomationStore = create<AutomationStore>()(
  persist(
    (set, get) => ({
      rules: [],
      logs: [],
      maxLogs: 100, // Keep last 100 logs

      addRule: (rule) => {
        const newRule: AutomationRule = {
          ...rule,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          executionCount: 0,
        };
        set((state) => ({
          rules: [...state.rules, newRule],
        }));
        useToastStore.getState().addToast({ message: `Otomasyon "${rule.name}" oluşturuldu`, type: 'success' });
      },

      updateRule: (id, updates) => {
        set((state) => ({
          rules: state.rules.map((r) =>
            r.id === id ? { ...r, ...updates, updatedAt: new Date() } : r
          ),
        }));
        useToastStore.getState().addToast({ message: 'Otomasyon güncellendi', type: 'info' });
      },

      deleteRule: (id) => {
        const rule = get().rules.find((r) => r.id === id);
        set((state) => ({
          rules: state.rules.filter((r) => r.id !== id),
          logs: state.logs.filter((l) => l.ruleId !== id),
        }));
        useToastStore.getState().addToast({ message: `"${rule?.name}" silindi`, type: 'warning' });
      },

      toggleRule: (id) => {
        set((state) => ({
          rules: state.rules.map((r) =>
            r.id === id ? { ...r, enabled: !r.enabled, updatedAt: new Date() } : r
          ),
        }));
        const rule = get().rules.find((r) => r.id === id);
        useToastStore.getState().addToast({
          message: `"${rule?.name}" ${rule?.enabled ? 'aktif' : 'devre dışı'}`,
          type: 'info',
        });
      },

      addLog: (log) => {
        const newLog: AutomationLog = {
          ...log,
          id: generateId(),
          executedAt: new Date(),
        };

        set((state) => {
          const logs = [newLog, ...state.logs];
          // Keep only maxLogs
          return {
            logs: logs.slice(0, state.maxLogs),
          };
        });
      },

      clearLogs: () => {
        set({ logs: [] });
        useToastStore.getState().addToast({ message: 'Loglar temizlendi', type: 'info' });
      },

      getLogsByRule: (ruleId) => {
        return get().logs.filter((l) => l.ruleId === ruleId);
      },

      incrementExecutionCount: (ruleId) => {
        set((state) => ({
          rules: state.rules.map((r) =>
            r.id === ruleId
              ? { ...r, executionCount: r.executionCount + 1, lastExecuted: new Date() }
              : r
          ),
        }));
      },
    }),
    {
      name: 'project-cicero-automation-store',
    }
  )
);

