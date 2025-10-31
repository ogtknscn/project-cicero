import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { useStore } from '../../stores/useStore';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Check } from 'lucide-react';

interface PortfolioEditorProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioId?: string;
}

export const PortfolioEditor = ({ isOpen, onClose, portfolioId }: PortfolioEditorProps) => {
  const { portfolios, addPortfolio, updatePortfolio, deletePortfolio } = usePortfolioStore();
  const { projects } = useStore();
  const existingPortfolio = portfolios.find((p) => p.id === portfolioId);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  useEffect(() => {
    if (existingPortfolio) {
      setName(existingPortfolio.name);
      setDescription(existingPortfolio.description || '');
      setOwner(existingPortfolio.owner || '');
      setSelectedProjectIds(existingPortfolio.projectIds);
    } else {
      setName('');
      setDescription('');
      setOwner('');
      setSelectedProjectIds([]);
    }
  }, [existingPortfolio, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    const portfolioData = {
      name: name.trim(),
      description: description.trim() || undefined,
      owner: owner.trim() || undefined,
      projectIds: selectedProjectIds,
    };

    if (portfolioId) {
      updatePortfolio(portfolioId, portfolioData);
    } else {
      addPortfolio(portfolioData);
    }

    onClose();
  };

  const handleDelete = () => {
    if (portfolioId && confirm("Bu portfolio'yu silmek istediğinize emin misiniz?")) {
      deletePortfolio(portfolioId);
      onClose();
    }
  };

  const toggleProject = (projectId: string) => {
    setSelectedProjectIds((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={portfolioId ? 'Portfolio Düzenle' : 'Yeni Portfolio'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Portfolio Adı"
          placeholder="Örn: 2025 Q1 Projeleri"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Açıklama
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Portfolio açıklaması (opsiyonel)"
          />
        </div>

        <Input
          label="Sahip"
          placeholder="Portfolio sahibi (opsiyonel)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Projeler ({selectedProjectIds.length} seçili)
          </label>
          <div className="max-h-64 overflow-y-auto space-y-2 border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
            {projects.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                Henüz proje yok
              </p>
            ) : (
              projects.map((project) => (
                <label
                  key={project.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedProjectIds.includes(project.id)}
                    onChange={() => toggleProject(project.id)}
                    className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="flex-1">
                    <div
                      className="w-3 h-3 rounded-full inline-block mr-2"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {project.name}
                    </span>
                  </div>
                  {selectedProjectIds.includes(project.id) && (
                    <Check size={16} className="text-green-600 dark:text-green-400" />
                  )}
                </label>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-between gap-2 pt-4">
          <div>
            {portfolioId && (
              <Button type="button" variant="danger" onClick={handleDelete}>
                Sil
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {portfolioId ? 'Güncelle' : 'Oluştur'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
