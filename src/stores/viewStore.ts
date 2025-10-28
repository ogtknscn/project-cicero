import { create } from 'zustand';

export type ViewType = 'dashboard' | 'board' | 'list' | 'calendar' | 'timeline' | 'workload' | 'portfolio' | 'documents' | 'automation' | 'agile';

interface ViewStore {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  currentView: 'board',
  setView: (view) => set({ currentView: view }),
}));

