import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Document, DocumentVersion, DocumentFolder } from '../types/document';
import { generateId } from './useStore';
import { useToastStore } from './toastStore';

interface DocumentStore {
  documents: Document[];
  versions: DocumentVersion[];
  folders: DocumentFolder[];

  // Document actions
  addDocument: (doc: Omit<Document, 'id' | 'uploadedAt' | 'updatedAt' | 'version'>) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  getDocumentsByProject: (projectId: string) => Document[];
  getDocumentsByTask: (taskId: string) => Document[];

  // Version actions
  addVersion: (documentId: string, content: string, comment?: string, uploadedBy?: string) => void;
  getVersions: (documentId: string) => DocumentVersion[];

  // Folder actions
  addFolder: (folder: Omit<DocumentFolder, 'id' | 'createdAt'>) => void;
  updateFolder: (id: string, updates: Partial<DocumentFolder>) => void;
  deleteFolder: (id: string) => void;
  getFoldersByProject: (projectId: string) => DocumentFolder[];
}

export const useDocumentStore = create<DocumentStore>()(
  persist(
    (set, get) => ({
      documents: [],
      versions: [],
      folders: [],

      addDocument: (doc) => {
        const newDocument: Document = {
          ...doc,
          id: generateId(),
          uploadedAt: new Date(),
          updatedAt: new Date(),
          version: 1,
        };

        // Create initial version
        const initialVersion: DocumentVersion = {
          id: generateId(),
          documentId: newDocument.id,
          version: 1,
          content: doc.content,
          uploadedBy: doc.uploadedBy,
          uploadedAt: new Date(),
          size: doc.size,
        };

        set((state) => ({
          documents: [...state.documents, newDocument],
          versions: [...state.versions, initialVersion],
        }));

        useToastStore
          .getState()
          .addToast({ message: `Doküman "${doc.name}" yüklendi`, type: 'success' });
      },

      updateDocument: (id, updates) => {
        set((state) => ({
          documents: state.documents.map((d) =>
            d.id === id ? { ...d, ...updates, updatedAt: new Date() } : d
          ),
        }));
        useToastStore.getState().addToast({ message: 'Doküman güncellendi', type: 'info' });
      },

      deleteDocument: (id) => {
        const doc = get().documents.find((d) => d.id === id);
        set((state) => ({
          documents: state.documents.filter((d) => d.id !== id),
          versions: state.versions.filter((v) => v.documentId !== id),
        }));
        useToastStore.getState().addToast({ message: `"${doc?.name}" silindi`, type: 'warning' });
      },

      getDocumentsByProject: (projectId) => {
        return get().documents.filter((d) => d.projectId === projectId);
      },

      getDocumentsByTask: (taskId) => {
        return get().documents.filter((d) => d.taskId === taskId);
      },

      addVersion: (documentId, content, comment, uploadedBy) => {
        const document = get().documents.find((d) => d.id === documentId);
        if (!document) return;

        const newVersion = document.version + 1;
        const contentSize = new Blob([content]).size;

        const version: DocumentVersion = {
          id: generateId(),
          documentId,
          version: newVersion,
          content,
          uploadedBy,
          uploadedAt: new Date(),
          comment,
          size: contentSize,
        };

        set((state) => ({
          versions: [...state.versions, version],
          documents: state.documents.map((d) =>
            d.id === documentId
              ? { ...d, version: newVersion, content, updatedAt: new Date(), size: contentSize }
              : d
          ),
        }));

        useToastStore
          .getState()
          .addToast({ message: `Yeni versiyon oluşturuldu (v${newVersion})`, type: 'success' });
      },

      getVersions: (documentId) => {
        return get()
          .versions.filter((v) => v.documentId === documentId)
          .sort((a, b) => b.version - a.version);
      },

      addFolder: (folder) => {
        const newFolder: DocumentFolder = {
          ...folder,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({
          folders: [...state.folders, newFolder],
        }));
        useToastStore
          .getState()
          .addToast({ message: `Klasör "${folder.name}" oluşturuldu`, type: 'success' });
      },

      updateFolder: (id, updates) => {
        set((state) => ({
          folders: state.folders.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        }));
      },

      deleteFolder: (id) => {
        const folder = get().folders.find((f) => f.id === id);
        set((state) => ({
          folders: state.folders.filter((f) => f.id !== id),
        }));
        useToastStore
          .getState()
          .addToast({ message: `Klasör "${folder?.name}" silindi`, type: 'warning' });
      },

      getFoldersByProject: (projectId) => {
        return get().folders.filter((f) => f.projectId === projectId);
      },
    }),
    {
      name: 'project-cicero-document-store',
    }
  )
);
