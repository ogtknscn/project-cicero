import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FilterPreset, ViewPreset } from '../types/filter';
import { generateId } from './useStore';

interface FilterStore {
  filterPresets: FilterPreset[];
  viewPresets: ViewPreset[];
  activeFilterPresetId: string | null;
  activeViewPresetId: string | null;

  // Filter preset actions
  addFilterPreset: (preset: Omit<FilterPreset, 'id' | 'createdAt'>) => void;
  updateFilterPreset: (id: string, updates: Partial<FilterPreset>) => void;
  deleteFilterPreset: (id: string) => void;
  setActiveFilterPreset: (id: string | null) => void;

  // View preset actions
  addViewPreset: (preset: Omit<ViewPreset, 'id' | 'createdAt'>) => void;
  updateViewPreset: (id: string, updates: Partial<ViewPreset>) => void;
  deleteViewPreset: (id: string) => void;
  setActiveViewPreset: (id: string | null) => void;
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      filterPresets: [],
      viewPresets: [],
      activeFilterPresetId: null,
      activeViewPresetId: null,

      addFilterPreset: (preset) => {
        const newPreset: FilterPreset = {
          ...preset,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({
          filterPresets: [...state.filterPresets, newPreset],
        }));
      },

      updateFilterPreset: (id, updates) => {
        set((state) => ({
          filterPresets: state.filterPresets.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deleteFilterPreset: (id) => {
        set((state) => ({
          filterPresets: state.filterPresets.filter((p) => p.id !== id),
          activeFilterPresetId:
            state.activeFilterPresetId === id ? null : state.activeFilterPresetId,
        }));
      },

      setActiveFilterPreset: (id) => {
        set({ activeFilterPresetId: id });
      },

      addViewPreset: (preset) => {
        const newPreset: ViewPreset = {
          ...preset,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({
          viewPresets: [...state.viewPresets, newPreset],
        }));
      },

      updateViewPreset: (id, updates) => {
        set((state) => ({
          viewPresets: state.viewPresets.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deleteViewPreset: (id) => {
        set((state) => ({
          viewPresets: state.viewPresets.filter((p) => p.id !== id),
          activeViewPresetId: state.activeViewPresetId === id ? null : state.activeViewPresetId,
        }));
      },

      setActiveViewPreset: (id) => {
        set({ activeViewPresetId: id });
      },
    }),
    {
      name: 'project-cicero-filter-store',
    }
  )
);
