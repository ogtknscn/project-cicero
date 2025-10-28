import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Portfolio, BudgetEntry } from '../types/portfolio';
import { generateId } from './useStore';
import { useToastStore } from './toastStore';

interface PortfolioStore {
  portfolios: Portfolio[];
  budgets: BudgetEntry[];
  activePortfolioId: string | null;

  // Portfolio actions
  addPortfolio: (portfolio: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt' | 'metadata'>) => void;
  updatePortfolio: (id: string, updates: Partial<Portfolio>) => void;
  deletePortfolio: (id: string) => void;
  setActivePortfolio: (id: string | null) => void;

  // Budget actions
  setBudget: (projectId: string, allocated: number, currency: string) => void;
  updateSpent: (projectId: string, spent: number) => void;
  getBudget: (projectId: string) => BudgetEntry | undefined;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      portfolios: [],
      budgets: [],
      activePortfolioId: null,

      addPortfolio: (portfolio) => {
        const newPortfolio: Portfolio = {
          ...portfolio,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          metadata: {
            totalProjects: portfolio.projectIds.length,
            activeProjects: portfolio.projectIds.length,
            completedProjects: 0,
            totalBudget: 0,
            spentBudget: 0,
            healthScore: 100,
          },
        };
        set((state) => ({
          portfolios: [...state.portfolios, newPortfolio],
        }));
        useToastStore.getState().addToast({ message: 'Portfolio oluşturuldu', type: 'success' });
      },

      updatePortfolio: (id, updates) => {
        set((state) => ({
          portfolios: state.portfolios.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
          ),
        }));
        useToastStore.getState().addToast({ message: 'Portfolio güncellendi', type: 'info' });
      },

      deletePortfolio: (id) => {
        set((state) => ({
          portfolios: state.portfolios.filter((p) => p.id !== id),
          activePortfolioId: state.activePortfolioId === id ? null : state.activePortfolioId,
        }));
        useToastStore.getState().addToast({ message: 'Portfolio silindi', type: 'warning' });
      },

      setActivePortfolio: (id) => {
        set({ activePortfolioId: id });
      },

      setBudget: (projectId, allocated, currency) => {
        const { budgets } = get();
        const existingBudget = budgets.find((b) => b.projectId === projectId);

        if (existingBudget) {
          set((state) => ({
            budgets: state.budgets.map((b) =>
              b.projectId === projectId
                ? { ...b, allocated, currency, lastUpdated: new Date() }
                : b
            ),
          }));
        } else {
          set((state) => ({
            budgets: [
              ...state.budgets,
              {
                projectId,
                allocated,
                spent: 0,
                currency,
                lastUpdated: new Date(),
              },
            ],
          }));
        }
      },

      updateSpent: (projectId, spent) => {
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.projectId === projectId
              ? { ...b, spent, lastUpdated: new Date() }
              : b
          ),
        }));
      },

      getBudget: (projectId) => {
        return get().budgets.find((b) => b.projectId === projectId);
      },
    }),
    {
      name: 'project-cicero-portfolio-store',
    }
  )
);

