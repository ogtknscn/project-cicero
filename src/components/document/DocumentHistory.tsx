import { useDocumentStore } from '../../stores/documentStore';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Download, Clock } from 'lucide-react';
import { formatFileSize } from '../../types/document';

interface DocumentHistoryProps {
  documentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentHistory = ({ documentId, isOpen, onClose }: DocumentHistoryProps) => {
  const { getVersions, documents } = useDocumentStore();
  const document = documents.find((d) => d.id === documentId);
  const versions = getVersions(documentId);

  if (!document) {
    return null;
  }

  const handleDownloadVersion = (version: any) => {
    const link = document.createElement('a');
    link.href = version.content;
    link.download = `${document.name.replace(/\.[^/.]+$/, '')}_v${version.version}${document.name.match(/\.[^/.]+$/)?.[0] || ''}`;
    link.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Geçmiş - ${document.name}`}>
      <div className="space-y-4">
        {versions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Henüz versiyon geçmişi yok
          </p>
        ) : (
          <div className="space-y-3">
            {versions.map((version) => (
              <div
                key={version.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Versiyon {version.version}
                      </span>
                      {version.version === document.version && (
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                          Güncel
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock size={14} />
                      <span>{new Date(version.uploadedAt).toLocaleString('tr-TR')}</span>
                      {version.uploadedBy && (
                        <>
                          <span>•</span>
                          <span>{version.uploadedBy}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{formatFileSize(version.size)}</span>
                    </div>
                    {version.comment && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {version.comment}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownloadVersion(version)}
                    title="İndir"
                  >
                    <Download size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

