import { useState } from 'react';
import { useDocumentStore } from '../../stores/documentStore';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Folder, Trash2, Edit2 } from 'lucide-react';

interface FolderManagerProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export const FolderManager = ({ isOpen, onClose, projectId }: FolderManagerProps) => {
  const { getFoldersByProject, addFolder, deleteFolder } = useDocumentStore();
  const folders = getFoldersByProject(projectId);

  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#3b82f6');

  const handleAddFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    addFolder({
      name: newFolderName.trim(),
      projectId,
      color: newFolderColor,
    });

    setNewFolderName('');
    setNewFolderColor('#3b82f6');
  };

  const handleDeleteFolder = (folderId: string) => {
    if (confirm('Bu klasörü silmek istediğinize emin misiniz?')) {
      deleteFolder(folderId);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Klasör Yönetimi">
      <div className="space-y-6">
        {/* Add New Folder */}
        <form onSubmit={handleAddFolder} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni Klasör</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Klasör adı"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="flex-1"
            />
            <input
              type="color"
              value={newFolderColor}
              onChange={(e) => setNewFolderColor(e.target.value)}
              className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
              title="Klasör rengi"
            />
            <Button type="submit" disabled={!newFolderName.trim()}>
              Ekle
            </Button>
          </div>
        </form>

        {/* Existing Folders */}
        {folders.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Mevcut Klasörler
            </h3>
            <div className="space-y-2">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={20} style={{ color: folder.color }} />
                    <span className="font-medium text-gray-900 dark:text-white">{folder.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteFolder(folder.id)}>
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {folders.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Henüz klasör oluşturulmadı
          </p>
        )}
      </div>
    </Modal>
  );
};
