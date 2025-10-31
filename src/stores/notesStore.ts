import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note, NoteCategory } from '../types/notes';
import { generateId } from './useStore';
import { useToastStore } from './toastStore';

interface NotesStore {
  notes: Note[];
  categories: NoteCategory[];

  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNotesByProject: (projectId: string) => Note[];

  addCategory: (category: Omit<NoteCategory, 'id' | 'noteIds'>) => void;
  deleteCategory: (id: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],
      categories: [],

      addNote: (note) => {
        const newNote: Note = {
          ...note,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ notes: [...state.notes, newNote] }));
        useToastStore.getState().addToast({ message: 'Not oluşturuldu', type: 'success' });
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date() } : n
          ),
        }));
        useToastStore.getState().addToast({ message: 'Not güncellendi', type: 'info' });
      },

      deleteNote: (id) => {
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
        useToastStore.getState().addToast({ message: 'Not silindi', type: 'warning' });
      },

      getNotesByProject: (projectId) => {
        return get().notes.filter((n) => n.projectId === projectId);
      },

      addCategory: (category) => {
        const newCategory: NoteCategory = {
          ...category,
          id: generateId(),
          noteIds: [],
        };
        set((state) => ({ categories: [...state.categories, newCategory] }));
      },

      deleteCategory: (id) => {
        set((state) => ({ categories: state.categories.filter((c) => c.id !== id) }));
      },
    }),
    {
      name: 'project-cicero-notes-store',
    }
  )
);
