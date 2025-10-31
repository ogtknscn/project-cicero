import { Note } from '../../types/notes';
import { Button } from '../common/Button';
import { Edit2, BookOpen } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  onEdit: (noteId: string) => void;
}

export const NoteList = ({ notes, onEdit }: NoteListProps) => {
  if (notes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <BookOpen size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Henüz not oluşturulmadı</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onEdit(note.id)}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
              {note.title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note.id);
              }}
            >
              <Edit2 size={14} />
            </Button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
            {note.content.substring(0, 150)}...
          </p>

          {note.tags && note.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            {new Date(note.updatedAt).toLocaleDateString('tr-TR')}
          </div>
        </div>
      ))}
    </div>
  );
};
