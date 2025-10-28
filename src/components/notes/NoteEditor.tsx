import { useState, useEffect } from 'react';
import { useNotesStore } from '../../stores/notesStore';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface NoteEditorProps {
  isOpen: boolean;
  onClose: () => void;
  noteId?: string;
  projectId: string;
}

export const NoteEditor = ({ isOpen, onClose, noteId, projectId }: NoteEditorProps) => {
  const { notes, addNote, updateNote, deleteNote } = useNotesStore();
  const existingNote = notes.find((n) => n.id === noteId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setTags(existingNote.tags?.join(', ') || '');
    } else {
      setTitle('');
      setContent('');
      setTags('');
    }
  }, [existingNote, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const noteData = {
      title: title.trim(),
      content,
      projectId,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    if (noteId) {
      updateNote(noteId, noteData);
    } else {
      addNote(noteData);
    }

    onClose();
  };

  const handleDelete = () => {
    if (noteId && confirm('Bu notu silmek istediğinize emin misiniz?')) {
      deleteNote(noteId);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={noteId ? 'Notu Düzenle' : 'Yeni Not'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Başlık"
          placeholder="Not başlığı..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            İçerik (Markdown destekli)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
            placeholder="Markdown kullanarak içerik yazın..."
          />
        </div>

        <Input
          label="Etiketler (virgülle ayırın)"
          placeholder="örn: dokümantasyon, api, design"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="flex justify-between gap-2 pt-4">
          <div>
            {noteId && (
              <Button type="button" variant="danger" onClick={handleDelete}>
                Sil
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {noteId ? 'Güncelle' : 'Oluştur'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

