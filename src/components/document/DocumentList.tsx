import { useState } from 'react';
import { Document } from '../../types/document';
import { useDocumentStore } from '../../stores/documentStore';
import { Button } from '../common/Button';
import { Download, Eye, Trash2, History, FileText } from 'lucide-react';
import { getFileIcon, formatFileSize } from '../../types/document';
import { DocumentPreview } from './DocumentPreview';
import { DocumentHistory } from './DocumentHistory';

interface DocumentListProps {
  documents: Document[];
  folderId?: string;
}

export const DocumentList = ({ documents, folderId }: DocumentListProps) => {
  const { deleteDocument } = useDocumentStore();
  const [previewDocId, setPreviewDocId] = useState<string | null>(null);
  const [historyDocId, setHistoryDocId] = useState<string | null>(null);

  // Filter by folder if selected
  const filteredDocs = folderId
    ? documents.filter((d) => d.taskId === folderId) // Using taskId as folderId for simplicity
    : documents;

  const handleDownload = (doc: Document) => {
    const link = document.createElement('a');
    link.href = doc.content;
    link.download = doc.name;
    link.click();
  };

  const handleDelete = (doc: Document) => {
    if (confirm(`"${doc.name}" dosyasını silmek istediğinize emin misiniz?`)) {
      deleteDocument(doc.id);
    }
  };

  if (filteredDocs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <FileText size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Henüz doküman yok</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Dosya
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Boyut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Yüklenme
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Versiyon
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getFileIcon(doc.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                      {doc.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {doc.description}
                        </p>
                      )}
                      {doc.tags && doc.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {doc.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {formatFileSize(doc.size)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <p>{new Date(doc.uploadedAt).toLocaleDateString('tr-TR')}</p>
                    {doc.uploadedBy && <p className="text-xs">{doc.uploadedBy}</p>}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  v{doc.version}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewDocId(doc.id)}
                      title="Önizle"
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setHistoryDocId(doc.id)}
                      title="Geçmiş"
                    >
                      <History size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(doc)}
                      title="İndir"
                    >
                      <Download size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(doc)} title="Sil">
                      <Trash2 size={14} className="text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewDocId && (
        <DocumentPreview
          documentId={previewDocId}
          isOpen={!!previewDocId}
          onClose={() => setPreviewDocId(null)}
        />
      )}

      {/* History Modal */}
      {historyDocId && (
        <DocumentHistory
          documentId={historyDocId}
          isOpen={!!historyDocId}
          onClose={() => setHistoryDocId(null)}
        />
      )}
    </>
  );
};
