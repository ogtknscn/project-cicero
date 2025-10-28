import { useState } from 'react';
import { useDocumentStore } from '../../stores/documentStore';
import { useStore } from '../../stores/useStore';
import { Button } from '../common/Button';
import { Upload, FolderPlus, File, Folder } from 'lucide-react';
import { DocumentList } from './DocumentList';
import { DocumentUpload } from './DocumentUpload';
import { FolderManager } from './FolderManager';

interface DocumentManagerProps {
  projectId?: string;
  taskId?: string;
}

export const DocumentManager = ({ projectId, taskId }: DocumentManagerProps) => {
  const { getDocumentsByProject, getDocumentsByTask, getFoldersByProject } = useDocumentStore();
  const { selectedProjectId } = useStore();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFolderManagerOpen, setIsFolderManagerOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>();

  const activeProjectId = projectId || selectedProjectId;
  const documents = taskId
    ? getDocumentsByTask(taskId)
    : activeProjectId
    ? getDocumentsByProject(activeProjectId)
    : [];
  const folders = activeProjectId ? getFoldersByProject(activeProjectId) : [];

  if (!activeProjectId) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
        <File size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Dokümanları görüntülemek için bir proje seçin
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {taskId ? 'Görev Dokümanları' : 'Proje Dokümanları'}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsFolderManagerOpen(true)}
          >
            <FolderPlus size={16} className="mr-2" />
            Klasör
          </Button>
          <Button size="sm" onClick={() => setIsUploadOpen(true)}>
            <Upload size={16} className="mr-2" />
            Yükle
          </Button>
        </div>
      </div>

      {/* Folders */}
      {folders.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFolderId(undefined)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              !selectedFolderId
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Folder size={16} />
            Tümü
          </button>
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolderId(folder.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedFolderId === folder.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Folder size={16} style={{ color: folder.color }} />
              {folder.name}
            </button>
          ))}
        </div>
      )}

      {/* Documents */}
      <DocumentList documents={documents} folderId={selectedFolderId} />

      {/* Upload Modal */}
      {isUploadOpen && (
        <DocumentUpload
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          projectId={activeProjectId}
          taskId={taskId}
        />
      )}

      {/* Folder Manager */}
      {isFolderManagerOpen && (
        <FolderManager
          isOpen={isFolderManagerOpen}
          onClose={() => setIsFolderManagerOpen(false)}
          projectId={activeProjectId}
        />
      )}
    </div>
  );
};

