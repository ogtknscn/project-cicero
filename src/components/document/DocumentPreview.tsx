import { useDocumentStore } from '../../stores/documentStore';
import { Modal } from '../common/Modal';
import { PREVIEWABLE_TYPES } from '../../types/document';

interface DocumentPreviewProps {
  documentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentPreview = ({ documentId, isOpen, onClose }: DocumentPreviewProps) => {
  const { documents } = useDocumentStore();
  const document = documents.find((d) => d.id === documentId);

  if (!document) {
    return null;
  }

  const renderPreview = () => {
    // Images
    if (PREVIEWABLE_TYPES.images.includes(document.type)) {
      return (
        <img
          src={document.content}
          alt={document.name}
          className="max-w-full max-h-[70vh] mx-auto rounded"
        />
      );
    }

    // PDF
    if (PREVIEWABLE_TYPES.pdf.includes(document.type)) {
      return (
        <iframe
          src={document.content}
          className="w-full h-[70vh] rounded border border-gray-300 dark:border-gray-600"
          title={document.name}
        />
      );
    }

    // Text files
    if (PREVIEWABLE_TYPES.text.includes(document.type)) {
      // Decode base64 text content
      try {
        const base64Content = document.content.split(',')[1];
        const textContent = atob(base64Content);
        return (
          <pre className="w-full max-h-[70vh] overflow-auto p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-white">
            {textContent}
          </pre>
        );
      } catch {
        return (
          <p className="text-center text-gray-500 dark:text-gray-400">Metin dosyası okunamadı</p>
        );
      }
    }

    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Bu dosya türü için önizleme desteklenmiyor
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Dosyayı indirerek görüntüleyebilirsiniz
        </p>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={document.name}>
      <div className="space-y-4">
        {document.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">{document.description}</p>
        )}
        {renderPreview()}
      </div>
    </Modal>
  );
};
