import { useState } from 'react';
import { useFilterStore } from '../../stores/filterStore';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { Save, Trash2 } from 'lucide-react';

interface FilterPresetManagerProps {
  currentFilters: {
    status?: ('todo' | 'in-progress' | 'done')[];
    priority?: ('low' | 'medium' | 'high')[];
    tags?: string[];
    search?: string;
  };
}

export const FilterPresetManager = ({ currentFilters }: FilterPresetManagerProps) => {
  const {
    filterPresets,
    activeFilterPresetId,
    addFilterPreset,
    deleteFilterPreset,
    setActiveFilterPreset,
  } = useFilterStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presetName, setPresetName] = useState('');

  const handleSavePreset = () => {
    if (!presetName.trim()) return;

    addFilterPreset({
      name: presetName.trim(),
      filters: currentFilters,
    });

    setPresetName('');
    setIsModalOpen(false);
  };

  const handleLoadPreset = (presetId: string) => {
    setActiveFilterPreset(presetId);
    // The parent component should listen to activeFilterPresetId changes
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        title="Mevcut filtreyi kaydet"
      >
        <Save size={16} />
        <span className="hidden sm:inline ml-2">Filtreyi Kaydet</span>
      </Button>

      {filterPresets.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            value={activeFilterPresetId || ''}
            onChange={(e) => handleLoadPreset(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Kaydedilmiş Filtreler</option>
            {filterPresets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>

          {activeFilterPresetId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Bu filtreyi silmek istediğinize emin misiniz?')) {
                  deleteFilterPreset(activeFilterPresetId);
                }
              }}
              title="Aktif filtreyi sil"
            >
              <Trash2 size={16} className="text-red-500" />
            </Button>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPresetName('');
        }}
        title="Filtreyi Kaydet"
      >
        <div className="space-y-4">
          <Input
            label="Filtre Adı"
            placeholder="Örn: Yüksek Öncelikli Görevler"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            required
          />

          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kaydedilecek Filtreler:
            </h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              {currentFilters.status && <li>• Durum: {currentFilters.status.join(', ')}</li>}
              {currentFilters.priority && <li>• Öncelik: {currentFilters.priority.join(', ')}</li>}
              {currentFilters.tags && currentFilters.tags.length > 0 && (
                <li>• Etiketler: {currentFilters.tags.join(', ')}</li>
              )}
              {currentFilters.search && <li>• Arama: "{currentFilters.search}"</li>}
              {!currentFilters.status &&
                !currentFilters.priority &&
                (!currentFilters.tags || currentFilters.tags.length === 0) &&
                !currentFilters.search && <li className="text-gray-400">Filtre yok</li>}
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setPresetName('');
              }}
            >
              İptal
            </Button>
            <Button onClick={handleSavePreset} disabled={!presetName.trim()}>
              <Save size={16} className="mr-2" />
              Kaydet
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
