import { useState } from 'react';
import { useNotesStore } from '../../stores/notesStore';
import { useStore } from '../../stores/useStore';
import { Button } from '../common/Button';
import { Plus, BookOpen } from 'lucide-react';
import { NoteEditor } from './NoteEditor';
import { NoteList } from './NoteList';

export const NotesView = () => {
  const { selectedProjectId } = useStore();
  const { getNotesByProject } = useNotesStore();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | undefined>();

  const notes = selectedProjectId ? getNotesByProject(selectedProjectId) : [];

  const handleNewNote = () => {
    setEditingNoteId(undefined);
    setIsEditorOpen(true);
  };

  const handleEditNote = (noteId: string) => {
    setEditingNoteId(noteId);
    setIsEditorOpen(true);
  };

  if (!selectedProjectId) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <BookOpen size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Notlar için bir proje seçin</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Proje Wiki & Notlar</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Dokümantasyon ve bilgi tabanı</p>
        </div>
        <Button onClick={handleNewNote}>
          <Plus size={16} className="mr-2" /> Yeni Not
        </Button>
      </div>

      <NoteList notes={notes} onEdit={handleEditNote} />

      {isEditorOpen && (
        <NoteEditor
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingNoteId(undefined);
          }}
          noteId={editingNoteId}
          projectId={selectedProjectId}
        />
      )}
    </div>
  );
};

