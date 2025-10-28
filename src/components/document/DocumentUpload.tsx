import { useState } from 'react';
import { useDocumentStore } from '../../stores/documentStore';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Upload, X } from 'lucide-react';

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  taskId?: string;
}

export const DocumentUpload = ({ isOpen, onClose, projectId, taskId }: DocumentUploadProps) => {
  const { addDocument } = useDocumentStore();
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file size (max 10MB for demo)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('Dosya boyutu 10MB\'den küçük olmalıdır');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;

        addDocument({
          name: file.name,
          type: file.type,
          size: file.size,
          projectId,
          taskId,
          content,
          uploadedBy: uploadedBy.trim() || undefined,
          description: description.trim() || undefined,
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        });

        onClose();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Dosya yüklenirken hata oluştu');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Doküman Yükle">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dosya Seç
          </label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              required
            />
            <label
              htmlFor="file-upload"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              <Upload size={16} />
              {file ? file.name : 'Dosya Seç'}
            </label>
            {file && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
              >
                <X size={16} />
              </Button>
            )}
          </div>
          {file && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Boyut: {(file.size / 1024).toFixed(2)} KB
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Açıklama (Opsiyonel)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Doküman açıklaması"
          />
        </div>

        <Input
          label="Etiketler (virgülle ayırın)"
          placeholder="örn: tasarım, mockup, v1"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <Input
          label="Yükleyen (Opsiyonel)"
          placeholder="Adınız"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            İptal
          </Button>
          <Button type="submit" disabled={!file}>
            <Upload size={16} className="mr-2" />
            Yükle
          </Button>
        </div>
      </form>
    </Modal>
  );
};

